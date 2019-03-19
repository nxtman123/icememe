<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/asdf-movie-guy.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <h4 class="text-bold">
      FOUR OH FOOOOOUUUUUR
    </h4>
    <p class="text-bold">
      There's no page there!
    </p>
    <q-btn
      color="primary"
      style="width:150px;"
      @click="$router.push('/')"
    >
      Go back
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
