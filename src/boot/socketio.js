import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export default async ({ Vue }) => {
  const url = process.env.NODE_ENV === 'production' ? '' : ':5000';
  const socket = io(url);

  Vue.use(new VueSocketIO({
    connection: socket,
  }));
};
