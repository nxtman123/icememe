<template>
  <q-page padding>
    <h1>Registration</h1>
    <form >
        <q-input style="padding: 10px" v-model="inputMessage" outlined label="Email" />
        <q-input style="padding: 10px" v-model="inputMessage" outlined label="UserName" />
        <q-input style="padding: 10px" v-model="inputMessage" outlined label="Password"
          type="password"/>
          <q-input style="padding: 10px" v-model="inputMessage" outlined label="Confirm Password"
            type="password"/>
    </form>
    <div class="row justify-center full-height full-width text-center" style="margin: 30px">
      <q-btn color="primary" label="Create Account"  />
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
