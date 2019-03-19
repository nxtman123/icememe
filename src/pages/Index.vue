<template>
  <q-page class="column flex-center justify-center">
    <img
      alt="Quasar logo"
      src="~assets/ice-doge.png"
      style="width:60vw;max-width:400px"
    >
    <p>Send a message to the server. Choose an adjective.</p>
    <template v-if="serverMessage">
      <p
        class="text-bold"
        style="white-space: pre-line;"
      >
        {{ serverMessage }}
      </p>
      <q-btn @click="inputMessage = serverMessage = ''">
        clear
      </q-btn>
    </template>
    <form
      v-else
      @submit.prevent="onSubmit"
    >
      <q-input
        v-model="inputMessage"
        outlined
        label="adjective"
      />
    </form>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      inputMessage: '',
      serverMessage: '',
    };
  },
  methods: {
    onSubmit() {
      this.$socket.emit('hello', this.inputMessage);
    },
  },
  sockets: {
    hello(reply) {
      this.serverMessage = reply;
    },
  },
};
</script>
