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
        comment: newComment
      };
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to add comment';
    }
  },

  getMemeComments: async (data) => {
    try {
      const comments = await psql('comments')
        .where({ meme_id: data.meme_id })
        .orderBy('date_created')
        .limit(data.limit)
        .offset(data.offset);

      return comments;
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to retrieve comments';
    }
  },

  getMeme: async (memeId) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: parseInt(memeId) })
        .first();

      return meme;
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to retrieve meme';
    }
  }
});
