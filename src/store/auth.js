import { LocalStorage, Notify } from 'quasar';

const jwt = require('jsonwebtoken');

export default {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    username(state) {
      if (state.user) {
        return state.user.username;
      }
      return null;
    },
    userId(state) {
      if (state.user) {
        return state.user.user_id;
      }
      return null;
    },
    loggedIn(state) {
      return state.user !== null;
    },
  },
  mutations: {
    socket_verify(state, verifyResult) {
      console.log('socket_verify', verifyResult.isSuccessful);
      if (verifyResult.isSuccessful) {
        state.user = verifyResult.value;
      } else {
        LocalStorage.remove('token');
      }
    },
    socket_register(/* state */) {
      console.log('socket_register');
    },
    socket_updateUserData(state, updateResult) {
      if (updateResult.isSuccessful) {
        state.user.username = updateResult.username;
        Notify.create(updateResult.value);
      } else {
        Notify.create(updateResult.value);
      }
    },
    socket_login(state, loginResult) {
      try {
        if (loginResult.isSuccessful) {
          LocalStorage.set('token', loginResult.value);
          state.user = jwt.decode(loginResult.value, { complete: true }).payload;
          Notify.create('Logged in successfully');
        } else {
          Notify.create(loginResult.value);
          state.user = null;
        }
      } catch (e) {
        Notify.create(loginResult.value);
        state.user = null;
      }
    },
    socket_logout(state) {
      console.log('socket_logout');
      state.user = null;
      LocalStorage.remove('token');
    },
  },
};
