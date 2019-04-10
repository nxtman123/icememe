<template>
  <q-page style="padding: 30px">
    <h1>Settings</h1>
    <q-btn @click="usernameMethod" color="primary" style="margin: 5px" class="full-width"
      label="Change Username"/>
    <q-btn @click="emailMethod" color="primary" style="margin: 5px" class="full-width"
      label="Change Email"/>
    <q-btn @click="pwdMethod" color="primary" style="margin: 5px" class="full-width"
      label="Change Password"/>
    <q-dialog v-model="customDialogModel">
     <span slot="title">Test</span>
     <span slot="message">Test code</span>
     <div slot="body">
       <p> Will it show up, or not? </p>
     </div>
   </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageSignUp',
  data() {
    return {
      // model for Dialog example
      customDialogModel: false,
      name: '',
    };
  },
  methods: {
    usernameMethod() {
      this.customDialogModel = true;
    },
    emailMethod() {

    },
    pwdMethod() {

    },
    // when props.ok() gets called
    onOk(data) {
      return data;
    },

    // when props.cancel() gets called
    onCancel() {},

    // when we show it to the user
    onShow() {},

    // when it gets hidden
    onHide() {},

  },
};

</script>

<style>
  h1 {
    font-size:2em;
    text-Align: center;
  }
</style>
