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
      @click="usernamePrompt = true"
    />
    <q-btn
      color="primary"
      style="margin: 5px"
      class="full-width"
      label="Change Email"
      @click="emailPrompt = true"
    />
    <q-btn
      color="primary"
      style="margin: 5px"
      class="full-width"
      label="Change Password"
      @click="pwdPrompt = true"
    />
    <q-dialog
      v-model="usernamePrompt"
      persistent
    >
      <q-card style="padding: 20px; margin: 20px; width: 100%; max-width: 500px;">
        <q-card-section>
          <div class="text-h6">
            Change Username
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newUsername"
            autofocus
            hint="Enter a new username"
            :error="newUsernameError"
            @keyup.enter="prompt = false"
          >
            <template v-slot:error>
              Username is in use!
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Cancel"
            @click="usernamePrompt = false, newUsername = '', newUsernameError = false"
          />
          <q-btn
            flat
            label="Confirm"
            @click="changeUsername"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="emailPrompt"
      persistent
    >
      <q-card style="padding: 20px; margin: 20px; width: 100%; max-width: 500px;">
        <q-card-section>
          <div class="text-h6">
            Change Email
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newEmail"
            autofocus
            hint="Enter a new Email"
            :error="newEmailError"
            @blur="isValidEmail"
          >
            <template v-slot:error>
              Not a valid email!
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Cancel"
            @click="emailPrompt = false, newEmail = '', newEmailError = false"
          />
          <q-btn
            flat
            label="Confirm"
            @click="changeEmail"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="pwdPrompt"
      persistent
    >
      <q-card style="padding: 20px; margin: 20px; width: 100%; max-width: 500px;">
        <q-card-section>
          <div class="text-h6">
            Change Password
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="oldPassword"
            autofocus
            hint="Enter your current Password."
            error="oldPasswordError"
            type="password"
            @blur="isCorrectPassword"
          >
            <template v-slot:error>
              Incorrect Password!
            </template>
          </q-input>
          <q-input
            v-model="newPassword"
            hint="Enter a new password of at least 8 characters."
            :error="newPasswordError"
            type="password"
            @blur="isValidPassword"
          >
            <template v-slot:error>
              Password must be at least 8 characters!
            </template>
          </q-input>
          <q-input
            v-model="confirmPassword"
            hint="Confirm your new password"
            :error="confirmPasswordError"
            type="password"
            @blur="isPasswordMatch"
          >
            <template v-slot:error>
              Password's do not match!
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Cancel"
            @click="pwdPrompt = false, oldPassword = '', oldPasswordError = false,
              newPassword = '', newPasswordError = false,
              confirmPassword = '', confirmPasswordError = false"
          />
          <q-btn
            flat
            label="Confirm"
            @click="changePassword"
          />
        </q-card-actions>
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
      usernamePrompt: false,
      newUsername: '',
      newUsernameError: false,
      emailPrompt: false,
      newEmail: '',
      newEmailError: false,
      pwdPrompt: false,
      oldPassword: '',
      oldPasswordError: false,
      newPassword: '',
      newPasswordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
    };
  },
  computed: {

  },
  methods: {
    isValidUsername() {
      // TODO Check database if this.newUsername is in use
      // If it is, set this.newUsernameError to true and return
      this.newUsernameError = false;
    },
    changeUsername() {
      if (!this.newUserNameError) {
        // TODO update username with this.newUsername in database
        this.newUsername = '';
        this.usernamePrompt = false;
      }
    },
    isValidEmail() {
      if (!validator.isEmail(this.newEmail)) {
        this.newEmailError = true;
        return;
      }
      // TODO Check database if this.newEmail is in use.
      // If it is, set this.newEmailError to true and return
      this.newEmailError = false;
    },
    changeEmail() {
      if (!this.newEmailError) {
        // TODO update email with this.newEmail in database
        this.newEmail = '';
        this.emailPrompt = false;
      }
    },
    isCorrectPassword() {
      // TODO check database if this.oldPassword matches users current password.
      // If it is, set oldPasswordError = false. Else oldPasswordError = true,
      this.oldPasswordError = false;
    },
    isValidPassword() {
      if (this.newPassword.length >= 8) {
        this.newPasswordError = false;
        return;
      }
      this.newPasswordError = true;
    },
    isPasswordMatch() {
      if (this.newPassword === this.confirmPassword) {
        this.confirmPasswordError = false;
        return;
      }
      this.confirmPasswordError = true;
    },
    changePassword() {
      if (this.oldPassword !== ''
          && this.newPassword !== ''
          && this.newPassword !== '') {
        if (!this.oldPasswordError
            && !this.newPasswordError
            && !this.confirmPasswordError) {
          // TODO update database with this.newPassword
          this.oldPassword = '';
          this.oldPasswordError = false;
          this.newPassword = '';
          this.newPasswordError = false;
          this.confirmPassword = '';
          this.confirmPasswordError = false;
          this.pwdPrompt = false;
        }
      }
    },
  },
};
</script>

<style>
</style>
