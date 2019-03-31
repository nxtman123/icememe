const argon2 = require('argon2');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = psql => ({

  /*
      first checks if username/email already exist
      returns true if successful
     */
  register: async (user) => {
    const { username } = user;
    const { email } = user;
    const { password } = user;
    let checkUsers;
    let hash;

    if (!validator.isEmail(email)) {
      return false;
    }

    try {
      checkUsers = await psql('users')
        .where('username', username)
        .orWhere('email', email)
        .returning('user_id');

      if (checkUsers.length > 0) {
        return 'username or email already taken';
      }

      hash = await argon2.hash(password);
      await psql('users').insert({
        username,
        email,
        password: hash,
        date_created: new Date(),
      }).returning('username');

      return true;
    } catch (e) {
      console.log(e);
      return 'failed to create user';
    }
  },

  /*
      returns JWT if successful
     */
  login: async (user) => {
    const { username } = user;
    const { password } = user;
    let findUser;
    let verification;

    try {
      findUser = await psql('users')
        .where('username', username);

      if (findUser.length < 1) {
        return 'incorrect credentials';
      }

      verification = await argon2.verify(findUser[0].password, password);
      if (verification) {
        const payload = {
          user_id: findUser[0].user_id,
          username: findUser[0].username,
        };

        const options = {
          issuer: process.env.ISSUER,
          subject: process.env.SUBJECT,
          audience: process.env.AUDIENCE,
          expiresIn: process.env.EXPIRES_IN,
          algorithm: process.env.ALGORITHM,
        };

        const token = jwt.sign(payload, process.env.PRIVATE_KEY, options);

        return { token };
      }
      return 'incorrect credentials';
    } catch (e) {
      console.log(e);
      return 'failed to login';
    }
  },

  /*
      returns contents of JWT if successful
     */
  verifyToken: (token) => {
    const options = {
      issuer: process.env.ISSUER,
      subject: process.env.SUBJECT,
      audience: process.env.AUDIENCE,
      expiresIn: process.env.EXPIRES_IN,
      algorithm: [process.env.ALGORITHM],
    };

    try {
      return jwt.verify(token, process.env.PUBLIC_KEY, options);
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  /*
      decodes the JWT
    */
  decodeToken: token => jwt.decode(token, { complete: true }),
});
