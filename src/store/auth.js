import { LocalStorage, Notify } from 'quasar';

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
      if (verifyResult.isSuccessful) {
        state.user = verifyResult.value;
      } else {
        LocalStorage.remove('token');
        state.user = null;
      }
    },
    socket_login(state, loginResult) {
      if (loginResult.isSuccessful) {
        LocalStorage.set('token', loginResult.value);
        Notify.create('Logged in successfully');
      } else {
        Notify.create(loginResult.value);
        state.user = null;
      }
    },
    socket_register(state, registrationResult) {
      Notify.create(registrationResult.value);
      if (!registrationResult.isSuccessful) {
        LocalStorage.remove('token');
        state.user = null;
      }
    },
    socket_logout(state) {
      Notify.create('Logged out');
      console.log('socket_logout');
      state.user = null;
      LocalStorage.remove('token');
    },
    socket_updateUsername(state, updateResult) {
      if (updateResult.isSuccessful) {
        state.user.username = updateResult.value;
        Notify.create({
          icon: 'done',
          color: 'positive',
          message: `Changed username to ${updateResult.value}`,
        });
      } else {
        Notify.create({
          icon: 'error',
          color: 'negative',
          message: updateResult.value,
        });
      }
    },
    socket_updateEmail(state, updateResult) {
      if (updateResult.isSuccessful) {
        Notify.create({
          icon: 'done',
          color: 'positive',
          message: `Changed email to ${updateResult.value}`,
        });
      } else {
        Notify.create({
          icon: 'error',
          color: 'negative',
          message: updateResult.value,
        });
      }
    },
  },
};
