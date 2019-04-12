<template>
  <q-card style="min-width: 25%">
    <q-card-section>
      <div class="text-h6">
        Log in
      </div>
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="username"
        outlined
        dense
        stack-label="Stack Label"
        placeholder="Username"
        @keyup.enter="prompt=false"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="password"
        outlined
        dense
        stack-label="Stack Label"
        placeholder="Password"
        @keyup.enter="prompt=false"
      />
    </q-card-section>
    <q-card-actions
      align="right"
      class="text-primary row justify-around"
    >
      <q-btn
        v-close-popup
        flat
        label="Log in"
      />
      <q-btn
        v-close-popup
        flat
        label="Cancel"
      />
    </q-card-actions>
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
};
</script>

<style>
</style>
