const argon2 = require('argon2');

exports.register = async (psql, userInfo) => {
  let hashedPassword = await argon2.hash(userInfo.password);
  try {
    let insertResult = await psql('users').insert({
        username: userInfo.username,
        password: hashedPassword,
        email: userInfo.email,
        created_on: new Date()
      });

      return true;

  } catch (e) {
    console.log(e);
    return false;
  }
}
