const argon2 = require('argon2');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = (psql) => {
  return {

    /*
      first checks if username/email already exist
      returns true if successful
     */
    register: async (user) => {
      let username = user.username;
      let email = user.email;
      let password = user.password;
      let checkUsers;
      let hash;
      let inserted;

      if (!validator.isEmail(email)) {
        return false;
      }

      try {
        checkUsers =
          await psql('users')
                .where('username', username)
                .orWhere('email', email)
                .returning('user_id');

        if (checkUsers.length > 0) {
          return 'username or email already taken';
        }

        hash = await argon2.hash(password);
        inserted = await psql('users').insert({
          'username': username,
          'email': email,
          'password': hash,
          'date_created': new Date()
        }).returning('username');

        return true;

      } catch (e) {
        return 'failed to create user';
      }
    },

    /*
      returns JWT if successful
     */
    login: async (user) => {
      let username = user.username;
      let password = user.password;
      let findUser;
      let verification;

      try {
        findUser =
          await psql('users')
                .where('username', username);

        if (findUser.length < 1){
          return 'incorrect credentials';
        }

        verification = await argon2.verify(findUser[0].password, password);
        if (verification) {

          let payload = {
            'user_id': findUser[0].user_id,
            'username': findUser[0].username
          };

          let options = {
            issuer: process.env.ISSUER,
            subject: process.env.SUBJECT,
            audience: process.env.AUDIENCE,
            expiresIn: process.env.EXPIRES_IN,
            algorithm: process.env.ALGORITHM
          };

          let token = jwt.sign(payload, process.env.PRIVATE_KEY, options);

          return { 'token': token };

        } else {
          return 'incorrect credentials';
        }
      } catch (e) {
        return 'failed to login';
      }
    },

    /*
      returns contents of JWT if successful
     */
    verifyToken: (token) => {
      let options = {
        issuer: process.env.ISSUER,
        subject: process.env.SUBJECT,
        audience: process.env.AUDIENCE,
        expiresIn: process.env.EXPIRES_IN,
        algorithm: [process.env.ALGORITHM]
      };

      try {
        return jwt.verify(token, process.env.PUBLIC_KEY, options);
      } catch (e) {
        return false;
      }
    },

    /*
      decodes the JWT
    */
    decodeToken: (token) => {
      return jwt.decode(token, { complete: true });
    }
  }
};
