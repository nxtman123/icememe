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

  getMemes: async (username) => {
    try {
      // get all memes if username not provided
      if (username === '' || username === undefined || username === null) {
        return await psql('memes');
      }
      // else get memes belonging to the provided user
      return await psql('memes')
        .innerJoin('users', 'memes.user_id', 'users.user_id')
        .where('users.username', username);
    } catch (e) {
      console.log(e);
      return 'unexpected error when trying to retrieve memes';
    }
  },
});
