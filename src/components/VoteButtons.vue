<template>
  <div class="row rounded-borders vote-buttons items-center">
    <q-btn
      icon="arrow_upward"
      :color="userVote === 'up' ? 'primary' : none"
      flat
    />
    <div class="text-subtitle2 q-px-sm">
      {{ voteTotal }}
    </div>
    <q-btn
      icon="arrow_downward"
      :color="userVote === 'down' ? 'primary' : none"
      flat
    />
  </div>
</template>

<script>
export default {
  name: 'VoteButtons',
  props: {
    voteTotal: {
      type: Number,
      default: 0,
    },
    userVote: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">

.vote-buttons
  border: 1px solid black
  & *
    margin: -1px

</style>
