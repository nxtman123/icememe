const argon2 = require('argon2');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const JWT_OPTIONS = {
  issuer: process.env.ISSUER,
  subject: process.env.SUBJECT,
  audience: process.env.AUDIENCE,
  expiresIn: process.env.EXPIRES_IN,
  algorithm: process.env.ALGORITHM,
};

module.exports = psql => ({

  // returns { isSuccessful, value }
  register: async ({ username, email, password }) => {
    if (!validator.isEmail(email)) {
      return {
        isSuccessful: false,
        value: 'the email address used is invalid',
      };
    }

    try {
      const checkUsers = await psql('users')
        .where('username', username)
        .orWhere('email', email);

      if (checkUsers.length > 0) {
        return {
          isSuccessful: false,
          value: 'username or email already taken',
        };
      }

      const hash = await argon2.hash(password);
      await psql('users').insert({
        username,
        email,
        password: hash,
      });

      return {
        isSuccessful: true,
        value: 'successfully registered',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error during registration',
      };
    }
  },

  // returns { isSuccessful, value }
  login: async ({ username, password }) => {
    try {
      const findUser = await psql('users')
        .where('username', username);

      if (findUser.length >= 1) {
        const verification = await argon2.verify(findUser[0].password, password);
        if (verification) {
          const payload = {
            user_id: findUser[0].user_id,
            username: findUser[0].username,
          };

          return {
            isSuccessful: true,
            value: jwt.sign(payload, process.env.PRIVATE_KEY, JWT_OPTIONS),
          };
        }
      }

      return {
        isSuccessful: false,
        value: 'incorrect credentials',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error during login attempt',
      };
    }
  },

  // returns { isSuccessful, value }
  verifyToken: (token) => {
    try {
      return {
        isSuccessful: true,
        value: jwt.verify(token, process.env.PUBLIC_KEY, JWT_OPTIONS),
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'cannot verify token',
      };
    }
  },

  // decodes the JWT
  decodeToken: token => jwt.decode(token, { complete: true }),
});
