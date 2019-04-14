<template>
  <q-page style="padding: 80px">
    <div
      class="text-h6 q-py-md"
      style="text-align: center"
    >
      Settings
    </div>

    <q-btn
      color="primary"
      style="margin: 5px"
      class="full-width"
      label="Change Username"
      @click="usernameDialog = true"
    />
    <q-btn
      color="primary"
      style="margin: 5px"
      class="full-width"
      label="Change Email"
      @click="emailDialog = true"
    />
    <q-btn
      color="primary"
      style="margin: 5px"
      class="full-width"
      label="Change Password"
      @click="passwordDialog = true"
    />

    <!-- Username change dialog -->
    <q-dialog
      v-model="usernameDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Username
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="username"
            label="Username"
            lazy-rules
            maxlength="20"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="confirmUsername"
            label="Confirm Username"
            lazy-rules
            maxlength="20"
            :rules="[ val => val && val.length > 0 && username === confirmUsername ||
              'Confirmation does not match']"
          />

          <div>
            <q-btn
              :disable="username !== confirmUsername"
              label="Submit"
              type="button"
              color="primary"
              @click="usernameSubmit"
            />
            <q-btn
              v-close-popup
              label="Cancel"
              type="button"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- Email change dialog -->
    <q-dialog
      v-model="emailDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Email
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="email"
            label="Email"
            type="email"
            lazy-rules
            maxlength="50"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="confirmEmail"
            label="Confirm Email"
            type="email"
            lazy-rules
            maxlength="50"
            :rules="[ val => val && val.length > 0 && email === confirmEmail ||
              'Confirmation does not match']"
          />

          <div>
            <q-btn
              :disable="email !== confirmEmail"
              label="Submit"
              type="button"
              color="primary"
              @click="emailSubmit"
            />
            <q-btn
              v-close-popup
              label="Cancel"
              type="button"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- Password change dialog -->
    <q-dialog
      v-model="passwordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Password
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="password"
            label="New Password"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length > 0 && password === confirmPassword ||
              'Confirmation does not match']"
          />

          <div>
            <q-btn
              :disable="password !== confirmPassword"
              label="Submit"
              type="button"
              color="primary"
              @click="passwordSubmit"
            />
            <q-btn
              v-close-popup
              label="Cancel"
              type="button"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const validator = require('validator');

export default {
  name: 'Settings',
  data() {
    return {
      usernameDialog: false,
      username: '',
      confirmUsername: '',

      emailDialog: false,
      email: '',
      confirmEmail: '',

      passwordDialog: false,
      password: '',
      confirmPassword: '',
    };
  },
  computed: {

  },
  methods: {
    usernameSubmit() {
      const newUsername = {
        username: this.username,
        confirm_username: this.confirmUsername,
      };

      this.username = '';
      this.confirmUsername = '';
      this.usernameDialog = false;
      this.$socket.emit('updateUserData', newUsername);
    },

    emailSubmit() {
      if (!validator.isEmail(this.email)
          || !validator.isEmail(this.confirmEmail)) {
        return;
      }

      const newEmail = {
        email: this.email,
        confirm_email: this.confirmEmail,
      };

      this.email = '';
      this.confirmEmail = '';
      this.emailDialog = false;
      this.$socket.emit('updateUserData', newEmail);
    },

    passwordSubmit() {
      const newPassword = {
        username: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.password = '';
      this.confirmPassword = '';
      this.passwordDialog = false;
      this.$socket.emit('updateUserData', newPassword);

      // TODO: remove user token and kick user back to home page
    },
  },
  sockets: {
    updateUserData(reply) {
      this.$q.notify(reply.value);
    },
  },
};
</script>

<style>
</style>
