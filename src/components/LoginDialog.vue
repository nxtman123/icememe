<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">
        Login
      </div>
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        v-model="username"
        stack-label="Stack Label"
        placeholder="Username"
        autofocus @keyup.enter="prompt=false"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        v-model="password"
        stack-label="Stack Label"
        placeholder="Password"
        autofocus @keyup.enter="prompt=false"
      />
    </q-card-section>
    <q-card-actions align="right" class="text-primary row justify-around">
      <q-btn v-close-popup flat label="Login"/>
      <q-btn v-close-popup flat label="Cancel"/>
    </q-card-actions>
    <q-card-section>
      <div>
        New to IceMeme?
        <router-link
          :to="{ name: 'register' }">
          Register an account.
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
};
</script>

<style>
</style>
