<template>
  <q-page padding>
    <div class="text-h6 q-py-md">
      Sign Up
    </div>
    <form @submit.prevent="submit">
        <q-input style="padding: 10px" v-model="email" outlined label="Email"
          @blur="emailCheck" :error="$v.email.$error"/>
        <q-input style="padding: 10px" v-model="username" outlined label="UserName"
          @blur="usernameCheck" :error="usernameError"/>
        <q-input style="padding: 10px" v-model="pwd" outlined label="Password"
          @blur="passwordCheck" type="password" :error="pwdError"/>
        <q-input style="padding: 10px" v-model="cPwd" outlined label="Confirm Password"
          @blur="passwordMatchCheck" :error="cPwdError" type="password"/>
    </form>
    <div class="row justify-center" style="margin: 30px">
      <q-btn type="submit" color="primary" label="Create Account"  />
    </div>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PageSignUp',
  data() {
    return {
      email: '',
      username: '',
      pwd: '',
      cPwd: '',
      pwdError: false,
      cPwdError: false,
      usernameError: false,
    };
  },
  validations: {
    email: { required, email },
  },
  methods: {
    emailCheck() {
      // TODO check database if email is in use
      if (this.email !== '') {
        this.$v.$touch();
        if (this.$v.email.$error) {
          this.$q.notify('Email isn\'t formatted properly');
        }
      }
    },
    usernameCheck() {
      // TODO check database if username is in use
      if (this.username !== '') {
        this.usernameError = false;
      }
    },
    passwordCheck() {
      // In future, check for specific password requirements
      if (this.pwd !== '') {
        this.pwdError = false;
      }
    },
    passwordMatchCheck() {
      if (this.cPwd !== this.pwd) {
        this.cPwdError = true;
        this.$q.notify('Password\'s don\'t match yo');
      } else {
        this.cPwdError = false;
      }
    },
    submit() {
      let emptyFields = false;
      this.$v.email.$touch();
      if (this.username === '') {
        this.usernameError = true;
        emptyFields = true;
      }
      if (this.pwd === '') {
        this.pwdError = true;
        emptyFields = true;
      }
      if (this.cPwd === '') {
        this.cPwdError = true;
        emptyFields = true;
      }
      if (emptyFields) {
        this.$q.notify('You left some fields blank');
      } else if (this.pwdError || this.cPwdError || this.usernameError) {
        this.$q.notify('Please recheck some of your fields.');
      }
    },
  },
};
</script>

<style>
  h1 {
    font-size:2em;
    text-Align: center;
  }
</style>
