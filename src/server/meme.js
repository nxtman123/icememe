const COMMENT_PAGE_SIZE = 10;

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

  getMeme: async (memeId) => {
    try {
      const meme = await psql('memes')
        .select(['memes.meme_id', 'memes.user_id', 'memes.title', 'memes.cloudinary_url', 'memes.date_created'])
        .where({ 'memes.meme_id': memeId })
        .innerJoin('comments', 'memes.meme_id', 'comments.meme_id')
        .groupBy('memes.meme_id')
        .count('memes.meme_id as comment_count')
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
});
