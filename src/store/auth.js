import { LocalStorage } from 'quasar';

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
    socket_updateUserData(/* state */) {
      console.log('socket_updateUserData');
    },
    socket_login(/* state */) {
      console.log('socket_login');
    },
    socket_logout(state) {
      console.log('socket_logout');
      state.user = null;
      LocalStorage.remove('token');
    },
  },
};
