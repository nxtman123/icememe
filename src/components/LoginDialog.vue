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
          :rules="[val => val.length<=15 || 'Usernames should not be over 15 characters']"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="password"
          dense
          outlined
          placeholder="Password"
          stack-label="Stack Label"
          :rules="[val => val.length<=15 || 'Passwords should not be over 15 characters']"
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
      if (this.username && this.password) {
        // TODO: replace alert with call to server to authenticate
        // eslint-disable-next-line no-alert
        alert(`TODO: call server to log in ${this.username}`);
      }
    },
  },
};
</script>

<style>
</style>
