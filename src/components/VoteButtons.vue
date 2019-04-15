<template>
  <div class="row rounded-borders vote-buttons items-center">
    <q-btn
      icon="arrow_upward"
      :color="userVote === 'up' ? 'primary' : undefined"
      flat
    />
    <div class="text-subtitle2 q-px-sm">
      {{ voteTotal }}
    </div>
    <q-btn
      icon="arrow_downward"
      :color="userVote === 'down' ? 'primary' : undefined"
      flat
    />
  </div>
</template>

<script>
export default {
  name: 'VoteButtons',
  props: {
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    userVote: {
      type: String,
      default: null,
      validator: v => ['up', 'down', null].includes(v),
    },
  },
  data() {
    return {};
  },
  computed: {
    voteTotal() {
      return this.upVotes - this.downVotes;
    },
  },
};
</script>

<style lang="stylus">

.vote-buttons
  border: 1px solid black
  & *
    margin: -1px

</style>
