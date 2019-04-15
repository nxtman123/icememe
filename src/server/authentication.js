const argon2 = require('argon2');
const validator = require('validator');
const _ = require('underscore');
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

  /*
    updateData = {
      (optional)email, (optional) confirm_email,
      (optional)username, (optional) confirm_username,
      (optional)password,  (optional) confirm_password
    }
  */
  // user = { decoded token }
  updateUserData: async (updateData, user) => {
    try {
      const toUpdate = {};
      const userInDatabase = await psql('users')
        .where('user_id', '=', user.user_id).first();

      if (updateData.email) {
        if (updateData.email.length > EMAIL_MAX) {
          return {
            isSuccessful: false,
            value: 'email length exceeds maximum length',
          };
        }

        // check if the email aleady in the database is not the same as the new one
        // confirm confirmation email is correct
        if (userInDatabase.email !== updateData.email) {
          if (updateData.email !== updateData.confirm_email) {
            return {
              isSuccessful: false,
              value: 'email and confirmation email do not match',
            };
          }

          const checkEmail = await psql('users')
            .where('email', updateData.email);

          if (checkEmail.length > 0) {
            return {
              isSuccessful: false,
              value: 'email already taken',
            };
          }

          toUpdate.email = updateData.email;
        }
      }

      if (updateData.username) {
        if (updateData.username.length > USERNAME_MAX) {
          return {
            isSuccessful: false,
            value: 'username length exceeds maximum length',
          };
        }

        // check if the username already in the database is not the same as the new one
        // confirm confirmation username is correct
        if (userInDatabase.username !== updateData.username) {
          if (updateData.username !== updateData.confirm_username) {
            return {
              isSuccessful: false,
              value: 'username and confirmation username do not match',
            };
          }
          const checkUsername = await psql('users')
            .where('username', updateData.username);

          if (checkUsername.length > 0) {
            return {
              isSuccessful: false,
              value: 'username already taken',
            };
          }

          toUpdate.username = updateData.username;
        }
      }

      // check if password already in the databse is not the same as the new one
      if (updateData.password) {
        const hash = await argon2.hash(updateData.password);
        if (userInDatabase.password !== hash) {
          if (updateData.password !== updateData.confirm_password) {
            return {
              isSuccessful: false,
              value: 'password and confirmation password to not match',
            };
          }

          toUpdate.password = hash;
        }
      }


      if (!_.isEmpty(toUpdate)) {
        const update = await psql('users')
          .where('user_id', '=', user.user_id)
          .update(toUpdate)
          .returning(['username', 'email']);

        return {
          isSuccessful: true,
          value: 'successfully updated user data',
          username: update[0].username,
          email: update[0].email,
        };
      }

      return {
        isSuccessful: true,
        value: 'successfully updated user data',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when attempting to update user data',
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
