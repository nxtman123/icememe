const argon2 = require('argon2');
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const privateKey = fs.readFileSync(__dirname + '/config/private.key', 'utf8');
const publicKey = fs.readFileSync(__dirname + '/config/public.key', 'utf8');

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

exports.login = async (psql, userInfo) => {
  let userEmail = userInfo.email;
  let userUsername = userInfo.username;
  let userPassword = userInfo.password;

  try {
    let user = await psql('users').where('email', userEmail).orWhere('username', userUsername);

    if (!user[0]) {
      return false;
    }

    let verifyResult = await argon2.verify(user[0].password, userPassword);
    if (verifyResult) {
      return createToken(user[0]);
    } else {
      return false;
    }

  } catch (e) {
    console.log(e);
    return false;
  }
}

exports.verifyToken = (token) => {
  let i = 'IceMeme';
  let s = 'icememe@icememe.com';
  let a = 'https://icememe.com';

  var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '12h',
    algorithm: 'RS256'
  };

   try{
     return jwt.verify(token, publicKey, verifyOptions);
   }catch (err){
     return false;
   }
}

createToken = (user) => {

  let payload = {
    user_id: user.user_id,
    username: user.username
  };

  let i = 'IceMeme';
  let s = 'icememe@icememe.com';
  let a = 'https://icememe.com';

  let signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '12h',
    algorithm: 'RS256'
  };

  return jwt.sign(payload, privateKey, signOptions);
}

exports.decodeToken = (token) => {
  let decoded = jwt.decode(token, { complete: true });
  console.log(decoded);

  return decoded;
}
