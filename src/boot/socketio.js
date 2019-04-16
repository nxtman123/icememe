import VueSocketIO from 'vue-socket.io';
import { LocalStorage } from 'quasar';

export default async ({ Vue, store }) => {
  const url = process.env.NODE_ENV === 'production' ? '' : ':5000';
  const options = {};
  if (LocalStorage.has('token')) {
    options.query = { token: LocalStorage.getItem('token') };
  }

  Vue.use(new VueSocketIO({
    connection: url,
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_',
    },
    options,
  }));
};
