<template>
  <q-page padding>
    <h1>Registration</h1>
    <q-field
      label="Email"
      :error="mailHasError"
      error-label="We need a valid email"
      >
      <q-input v-model="text" stack-label="Stack Label" placeholder="Enter Email"/>
    </q-field>
    <q-field
      label="username"
      helper="Helper"
      :error="userNameHasError"
      error-label="We need a valid username"
      :count="10"
      >
      <q-input v-model="text" stack-label="Stack Label" placeholder="Enter Username"/>
    </q-field>

    <q-field
      label="Password"
      helper="Helper"
      :error="pwdHasError"
      error-label="We need a valid password"
      :count="10"
      >
      <q-input
        v-model="text"
        type="password"
        stack-label="Stack Label"
        placeholder="Enter Password"
      />
    </q-field>
    <q-field
      label="confirmPassword"
      helper="Helper"
      :error="cPwdHasError"
      error-label="Password's do not match"
      :count="10"
      >
      <q-input
        v-model="text"
        type="password"
        stack-label="Stack Label"
        placeholder="Confirm Password"
      />
    </q-field>
    <div class="row justify-center full-height full-width text-center" style="margin: 30px">
      <q-btn color="primary" label="Create Account" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageSignUp',
};
</script>

<style>
  h1 {
    font-size:2em;
    text-Align: center;
  }
</style>
