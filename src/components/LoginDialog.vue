<template>
  <q-card style="min-width: 25%">
    <q-card-section>
      <div class="text-h6">
        Log in
      </div>
    </q-card-section>
    <form @submit.prevent="onSubmit">
      <q-card-section>
        <q-input
          v-model="username"
          dense
          outlined
          placeholder="Username"
          stack-label="Stack Label"
          :rules="[val => val.length<=20 || 'Usernames are limited to 20 characters']"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="password"
          type="password"
          dense
          outlined
          placeholder="Password"
          stack-label="Stack Label"
          :rules="[val => val.length<=20 || 'Passwords are limited to 20 characters']"
        />
      </q-card-section>
      <q-card-section
        align="right"
        class="text-primary row justify-around"
      >
        <q-btn
          v-close-popup
          flat
          label="Log in"
          type="submit"
          :disable="!(username && password)"
        />
        <q-btn
          v-close-popup
          flat
          label="Cancel"
        />
      </q-card-section>
    </form>
    <q-card-section>
      <div>
        New to IceMeme?
        <router-link
          v-close-popup
          :to="{ name: 'register' }"
        >
          Sign up.
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'LoginDialog',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.readyToSubmit()) {
        // TODO: replace alert with call to server to authenticate
        // eslint-disable-next-line no-alert
        alert(`TODO: call server to log in ${this.username}`);
      } else {
        // eslint-disable-next-line no-alert
        alert('Your username or password is invalid.');
      }
    },
    readyToSubmit() {
      const isValid = this.username && this.password
        && this.username.length <= 20 && this.password.length <= 20;
      return isValid;
    },
  },
};
</script>

<style>
</style>
