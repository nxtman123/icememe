<template>
  <q-page class="page-frame">
    <div class="text-h6 q-py-md">
      Settings
    </div>

    <template v-if="loggedIn">
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
    </template>
    <template v-else>
      <div class="text-body1">
        You must be logged in to adjust settings.
      </div>
    </template>

    <!-- Username change dialog -->
    <q-dialog
      v-model="usernameDialog"
      transition-show="scale"
      transition-hide="scale"
      @hide="clearUsernameForm"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Username
          </div>
        </q-card-section>
        <form @submit.prevent="usernameSubmit">
          <q-card-section>
            <q-input
              v-model="username"
              autofocus
              label="Username"
              lazy-rules
              maxlength="20"
              :rules="[ val => val.length || 'Username cannot be blank']"
            />
            <q-input
              v-model="confirmUsername"
              label="Confirm Username"
              lazy-rules
              maxlength="20"
              :rules="[
                val => val.length || 'Username cannot be blank',
                () => username === confirmUsername || 'Usernames do not match',
              ]"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :disable="!usernameReady"
              label="submit"
              type="submit"
              color="primary"
            />
            <q-btn
              v-close-popup
              label="cancel"
              type="button"
              color="primary"
              flat
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>


    <!-- Email change dialog -->
    <q-dialog
      v-model="emailDialog"
      transition-show="scale"
      transition-hide="scale"
      @hide="clearEmailForm"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Email
          </div>
        </q-card-section>
        <form @submit.prevent="emailSubmit">
          <q-card-section>
            <q-input
              v-model="email"
              autofocus
              label="Email"
              type="email"
              lazy-rules
              maxlength="50"
              :rules="[
                val => val.length || 'Email cannot be blank',
                () => emailIsEmail || 'Email is invalid',
              ]"
            />
            <q-input
              v-model="confirmEmail"
              label="Confirm Email"
              type="email"
              lazy-rules
              maxlength="50"
              :rules="[
                val => val.length || 'Email cannot be blank',
                () => email === confirmEmail || 'Emails do not match',
                () => emailIsEmail || 'Email is invalid',
              ]"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :disable="!emailReady"
              label="submit"
              type="submit"
              color="primary"
            />
            <q-btn
              v-close-popup
              label="cancel"
              type="button"
              color="primary"
              flat
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>


    <!-- Password change dialog -->
    <q-dialog
      v-model="passwordDialog"
      transition-show="scale"
      transition-hide="scale"
      @hide="clearPasswordForm"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Change Password
          </div>
        </q-card-section>
        <form @submit.prevent="emailSubmit">
          <q-card-section>
            <q-input
              v-model="password"
              autofocus
              label="New Password"
              type="password"
              lazy-rules
              :rules="[ val => val.length || 'Password cannot be blank']"
            />
            <q-input
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              lazy-rules
              :rules="[
                val => val.length || 'Password cannot be blank',
                () => password === confirmPassword || 'Passwords do not match',
              ]"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :disable="!passwordReady"
              label="submit"
              type="submit"
              color="primary"
            />
            <q-btn
              v-close-popup
              label="cancel"
              type="button"
              color="primary"
              flat
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters([
      'loggedIn',
    ]),

    usernameReady() {
      return this.username.length && this.username === this.confirmUsername;
    },

    emailIsEmail() {
      return validator.isEmail(this.email);
    },
    emailReady() {
      return this.email.length && this.emailIsEmail && this.email === this.confirmEmail;
    },

    passwordReady() {
      return this.password.length && this.password === this.confirmPassword;
    },
  },
  methods: {
    clearUsernameForm() {
      this.username = '';
      this.confirmUsername = '';
    },
    usernameSubmit() {
      if (this.usernameReady) {
        const newUsername = {
          username: this.username,
          confirmUsername: this.confirmUsername,
        };
        this.$socket.emit('updateUserData', newUsername);

        this.username = '';
        this.confirmUsername = '';
        this.usernameDialog = false;
      }
    },

    clearEmailForm() {
      this.email = '';
      this.confirmEmail = '';
    },
    emailSubmit() {
      if (this.emailReady) {
        const newEmail = {
          email: this.email,
          confirmEmail: this.confirmEmail,
        };
        this.$socket.emit('updateUserData', newEmail);

        this.email = '';
        this.confirmEmail = '';
        this.emailDialog = false;
      }
    },

    clearPasswordForm() {
      this.password = '';
      this.confirmPassword = '';
    },
    passwordSubmit() {
      if (this.passwordReady) {
        const newPassword = {
          username: this.password,
          confirmPassword: this.confirmPassword,
        };
        this.$socket.emit('updateUserData', newPassword);
        // TODO: replace user token and store object

        this.password = '';
        this.confirmPassword = '';
        this.passwordDialog = false;
      }
    },
  },
};
</script>

<style>
input:invalid {
    box-shadow: none;
}
</style>
