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

      await psql('comments')
        .insert({
          user_id: user.user_id,
          meme_id: comment.meme_id,
          text: comment.text,
          date_created: new Date(),
        });

      return true;
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
});
