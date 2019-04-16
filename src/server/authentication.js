const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const USERNAME_MAX = 20;
const EMAIL_MAX = 50;

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

      const hash = await bcrypt.hash(password, 10);
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
        value: 'Unexpected error during registration',
      };
    }
  },

  // returns { isSuccessful, value }
  login: async ({ username, password }) => {
    try {
      const findUser = await psql('users')
        .select(['user_id as userId', 'username', 'password'])
        .where('username', username);

      if (findUser.length >= 1) {
        const verification = await bcrypt.compare(password, findUser[0].password);
        if (verification) {
          const payload = {
            userId: findUser[0].userId,
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
        value: 'Unexpected error during login attempt',
      };
    }
  },

  // user = { userId, username }
  // returns { isSuccessful, value }
  updateUsername: async (newUsername, user) => {
    if (newUsername.length > USERNAME_MAX) {
      return {
        isSuccessful: false,
        value: 'username length exceeds maximum length',
      };
    }
    const update = await psql('users')
      .where('user_id', '=', user.userId)
      .update({ username: newUsername })
      .returning(['username']);
    return {
      isSuccessful: true,
      value: update[0].username,
    };
  },

  // user = { userId, username }
  // returns { isSuccessful, value }
  updateEmail: async (newEmail, user) => {
    if (newEmail.length > EMAIL_MAX) {
      return {
        isSuccessful: false,
        value: 'Email length exceeds maximum length',
      };
    }
    const update = await psql('users')
      .where('user_id', '=', user.userId)
      .update({ email: newEmail })
      .returning(['email']);
    return {
      isSuccessful: true,
      value: update[0].email,
    };
  },

  // user = { userId, username }
  // returns { isSuccessful, value }
  updatePassword: async (newPassword, user) => {
    try {
      const hash = await bcrypt.hash(newPassword, 10);
      await psql('users')
        .where('user_id', '=', user.userId)
        .update({ password: hash });
      return {
        isSuccessful: true,
        value: 'Changed password successfully',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'Unexpected error while changing password',
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
