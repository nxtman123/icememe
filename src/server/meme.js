const COMMENT_PAGE_SIZE = 10;
const MEME_PAGE_SIZE = 15;

const baseMemeQuery = (psql, user) => {
  let query = psql('memes')
    .select(['memes.meme_id', 'memes.user_id', 'users.username', 'memes.title', 'memes.cloudinary_url', 'memes.date_created'])
    .groupBy('memes.meme_id', 'users.username')
    .leftJoin('users', 'memes.user_id', 'users.user_id')
    .leftJoin('comments', 'memes.meme_id', 'comments.meme_id')
    .count('comments.meme_id as comment_count')
    .leftJoin('votes as uvotes', function joinUpVotes() {
      this.on('memes.meme_id', '=', 'uvotes.meme_id').andOn('uvotes.type', '=', psql.raw('?', ['up']));
    })
    .count('uvotes.meme_id as up_votes')
    .leftJoin('votes as dvotes', function joinDownVotes() {
      this.on('memes.meme_id', '=', 'dvotes.meme_id').andOn('dvotes.type', '=', psql.raw('?', ['down']));
    })
    .count('dvotes.meme_id as down_votes')
    .clone();
  if (user) {
    query = query.leftJoin('votes as ivote', function joinDownVotes() {
      this.on('memes.meme_id', '=', 'ivote.meme_id').andOn('ivote.user_id', '=', psql.raw('?', [user.user_id]));
    })
      .groupBy('ivote.type')
      .select('ivote.type as user_vote')
      .clone();
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
