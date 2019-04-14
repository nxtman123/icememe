<template>
  <q-page padding>
    <div class="text-h4 q-py-md">
      Sign Up
    </div>
    <form @submit.prevent="onSubmit">
      <q-input
        ref="email"
        v-model="email"
        style="padding: 10px"
        filled
        placeholder="Email"
        lazy-rules
        :rules="[val => validEmail || 'Invalid email format.']"
      />
      <q-input
        ref="username"
        v-model="username"
        style="padding: 10px"
        filled
        placeholder="Username"
        :rules="[val => val.length<=20 || 'Please limit your username to 20 characters.']"
      />
      <q-input
        ref="password"
        v-model="password"
        style="padding: 10px"
        filled
        placeholder="Password"
        type="password"
        :rules="[val => val.length<=100 || 'Please limit your password to 100 characters.']"
      />
      <q-input
        ref="confirmedPassword"
        v-model="confirmedPassword"
        style="padding: 10px"
        filled
        placeholder="Confirm Password"
        type="password"
        lazy-rules
        :rules="[val => matchingPasswords || 'Password doesn\'t match.']"
      />
      <div
        class="row justify-around"
        style="margin: 30px"
      >
        <q-btn
          type="submit"
          color="primary"
          label="Create Account"
          :disable="!readyToSubmit"
        />
        <q-btn
          color="primary"
          label="Reset"
          @click="onReset"
        />
      </div>
    </form>
  </q-page>
</template>

<script>
const validator = require('validator');

export default {
  name: 'PageSignUp',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmedPassword: '',
    };
  },
  computed: {
    validEmail: {
      cache: false,
      get() {
        return validator.isEmail(this.email) && this.email.length <= 50;
      },
    },
    matchingPasswords: {
      cache: false,
      get() {
        return this.password === this.confirmedPassword;
      },
    },
    readyToSubmit: {
      cache: false,
      get() {
        return this.email && this.username && this.password && this.confirmedPassword
          && this.username.length <= 20 && this.password.length <= 100
          && this.validEmail && this.matchingPasswords;
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.readyToSubmit) {
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        this.$socket.emit('register', userData);
      }
    },
    onReset() {
      this.email = null;
      this.username = null;
      this.password = null;
      this.confirmedPassword = null;
      this.$refs.email.resetValidation();
      this.$refs.username.resetValidation();
      this.$refs.password.resetValidation();
      this.$refs.confirmedPassword.resetValidation();
    },
  },
  sockets: {
    register(reply) {
      if (reply.isSuccessful) {
        this.$q.notify('Successfully created account');
        this.$router.push({ name: 'main' });
      }
    },
  },
};
</script>

<style>
</style>
