const COMMENT_PAGE_SIZE = 10;
const MEME_PAGE_SIZE = 15;

const baseMemeQuery = (psql, user) => {
  let query = psql('memes')
    .select()
    .leftJoin(
      psql('users')
        .select(['user_id', 'username'])
        .as('author'),
      'memes.user_id', '=', 'author.user_id',
    ).leftJoin(
      psql('comments')
        .select(['meme_id'])
        .groupBy('meme_id')
        .count('meme_id as comment_count')
        .as('counted_comments'),
      'memes.meme_id', '=', 'counted_comments.meme_id',
    )
    .leftJoin(
      psql('votes')
        .select(['meme_id'])
        .where({ type: 'up' })
        .groupBy('meme_id')
        .count('meme_id as up_votes')
        .as('counted_up_votes'),
      'memes.meme_id', '=', 'counted_up_votes.meme_id',
    )
    .leftJoin(
      psql('votes')
        .select(['meme_id'])
        .where({ type: 'down' })
        .groupBy('meme_id')
        .count('meme_id as down_votes')
        .as('counted_down_votes'),
      'memes.meme_id', '=', 'counted_down_votes.meme_id',
    )
    .clone();

  if (user) {
    query = query.leftJoin(
      psql('votes')
        .select(['meme_id', 'type as user_vote'])
        .where({ user_id: user.user_id })
        .as('viewer_vote'),
      'memes.meme_id', '=', 'viewer_vote.meme_id',
    ).clone();
  }

  return query;
};

module.exports = psql => ({

  // memeData = { title, cloudinary_url }
  // user = { user_id, username }
  // returns { isSuccessful, value }
  saveMeme: async (memeData, user) => {
    try {
      const newMeme = await psql('memes')
        .insert({
          user_id: user.user_id,
          title: memeData.title,
          cloudinary_url: memeData.cloudinary_url,
        }).returning(['meme_id', 'user_id', 'title', 'cloudinary_url', 'date_created']);

      return {
        isSuccessful: true,
        value: newMeme,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to save meme data',
      };
    }
  },

  // voteData = { meme_id, vote_type }
  // user = { user_id, username }
  // returns { isSuccessful, value }
  addVote: async (voteData, user) => {
    try {
      let newVote;

      const meme = await psql('memes')
        .where({ meme_id: voteData.meme_id });

      if (meme.length <= 0) {
        return {
          isSuccessful: false,
          value: 'meme with that id does not exist',
        };
      }

      const previousVote = await psql('votes')
        .where('user_id', user.user_id)
        .andWhere('meme_id', voteData.meme_id)
        .first();

      // if user voted same type on this meme before, do nothing
      if (previousVote) {
        if (previousVote.type === voteData.vote_type) {
          return {
            isSuccessful: false,
            value: 'already voted '.concat(voteData.vote_type, ' on this meme.'),
          };
        }
        // else change vote
        newVote = await psql('votes')
          .where('user_id', user.user_id)
          .andWhere('meme_id', voteData.meme_id)
          .update({
            type: voteData.vote_type,
            date_created: psql.fn.now(),
          })
          .returning(['vote_id', 'user_id', 'meme_id', 'type', 'date_created']);
      } else {
        newVote = await psql('votes')
          .insert({
            user_id: user.user_id,
            meme_id: voteData.meme_id,
            type: voteData.vote_type,
          })
          .returning(['vote_id', 'user_id', 'meme_id', 'type', 'date_created']);
      }

      return {
        isSuccessful: true,
        value: newVote,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to add vote',
      };
    }
  },

  // commentData = { meme_id, text }
  // user = { user_id, username }
  // returns { isSuccessful, value }
  addComment: async (commentData, user) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: commentData.meme_id });

      if (meme.length <= 0) {
        return {
          isSuccessful: false,
          value: 'meme with that id does not exist',
        };
      }

      const newComment = await psql('comments')
        .insert({
          user_id: user.user_id,
          meme_id: commentData.meme_id,
          text: commentData.text,
        }).returning(['comment_id', 'meme_id', 'user_id', 'text', 'date_created']);

      return {
        isSuccessful: true,
        value: newComment,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to add comment',
      };
    }
  },

  getMeme: async (memeId, user) => {
    try {
      const meme = await baseMemeQuery(psql, user)
        .where({ 'memes.meme_id': memeId })
        .first();

      return {
        isSuccessful: true,
        value: meme,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve meme',
      };
    }
  },

  getMemeComments: async (memeId, earliestId) => {
    try {
      let comments;

      /*
        For pagination, on initial load, it will retrieve the latest comments
        after each subsequent call, expects the id of the earliest comment
        received in order retrieve the next set of comments.
       */
      if (earliestId) {
        comments = await psql('comments')
          .where({ meme_id: memeId })
          .andWhere('comment_id', '<', earliestId)
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_PAGE_SIZE);
      } else {
        comments = await psql('comments')
          .where({ meme_id: memeId })
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_PAGE_SIZE);
      }

      return {
        isSuccessful: true,
        value: comments,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve comments',
      };
    }
  },

  getMemes: async (username, earliestId, user) => {
    try {
      let memes;

      /*
        Get all memes if username not provided. Pagination of memes identical to
        meme comments above.
      */
      if (!username) {
        if (earliestId) {
          memes = await baseMemeQuery(psql, user)
            .andWhere('memes.meme_id', '<', earliestId)
            .orderBy('memes.meme_id', 'desc')
            .limit(MEME_PAGE_SIZE);
        } else {
          memes = await baseMemeQuery(psql, user)
            .orderBy('memes.meme_id', 'desc')
            .limit(MEME_PAGE_SIZE);
        }
        return {
          isSuccessful: true,
          value: memes,
        };
      }
      // else get memes belonging to the provided user
      if (earliestId) {
        memes = await baseMemeQuery(psql, user)
          .andWhere('users.username', username)
          .andWhere('memes.meme_id', '<', earliestId)
          .orderBy('memes.meme_id', 'desc')
          .limit(MEME_PAGE_SIZE);
      } else {
        memes = await baseMemeQuery(psql, user)
          .andWhere('users.username', username)
          .orderBy('memes.meme_id', 'desc')
          .limit(MEME_PAGE_SIZE);
      }
      return {
        isSuccessful: true,
        value: memes,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve memes',
      };
    }
  },
});
