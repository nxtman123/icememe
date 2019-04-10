const COMMENT_LIMIT = 5;

module.exports = psql => ({
  saveMeme: async (meme, user) => {
    try {
      await psql('memes')
        .insert({
          user_id: user.user_id,
          title: meme.title,
          cloudinary_url: meme.cloudinary_url,
          date_created: new Date(),
        })
        .where({
          user_id: user.user_id,
        });

      return true;
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to save meme data';
    }
  },

  addComment: async (comment, user) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: comment.meme_id });

      if (meme.length <= 0) {
        return 'meme with that id does not exist';
      }

      const newComment = await psql('comments')
        .insert({
          user_id: user.user_id,
          meme_id: comment.meme_id,
          text: comment.text,
          date_created: new Date(),
        }).returning('*');

      return {
        status: true,
        comment: newComment,
      };
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to add comment';
    }
  },

  getMemeComments: async (data) => {
    try {
      let comments;

      /*
        for lazy loading, on initial load, it will retrieve the latest comments
        after each subsequent call, expects the id of the earliest comment received
         in order retrieve the next set of comments
       */
      if (data.earliest_id) {
        comments = await psql('comments')
          .where({ meme_id: data.meme_id })
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_LIMIT)
          .offset(data.offset)
          .andWhere('comment_id', '<', data.earliest_id);
      } else {
        comments = await psql('comments')
          .where({ meme_id: data.meme_id })
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_LIMIT)
          .offset(data.offset);
      }

      return comments;
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to retrieve comments';
    }
  },

  getMemeById: async (memeId) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: parseInt(memeId, 10) })
        .first();

      return meme;
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to retrieve meme';
    }
  },
});
