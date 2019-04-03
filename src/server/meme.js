module.exports = psql => ({
  saveMeme: async (meme, user) => {
    try {
      await psql('memes')
      .insert({
        user_id: user.user_id,
        title: meme.title,
        cloudinary_url: meme.cloudinary_url,
        date_created: new Date()
      })
      .where({
        user_id: user.user_id
      });
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to save meme data';
    }
  }
});
