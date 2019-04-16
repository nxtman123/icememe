<template>
  <div class="row rounded-borders vote-buttons items-center">
    <q-btn
      icon="arrow_upward"
      :color="displayUserVote === 'up' ? 'primary' : undefined"
      flat
      :ripple="loggedIn"
      @click="voteUp"
    />
    <div class="text-subtitle2 q-px-sm">
      {{ voteTotal }}
    </div>
    <q-btn
      icon="arrow_downward"
      :color="displayUserVote === 'down' ? 'primary' : undefined"
      flat
      :ripple="loggedIn"
      @click="voteDown"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VoteButtons',
  props: {
    memeId: {
      type: Number,
      default: -1,
    },
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
    return {
      localVote: this.userVote,
    };
  },
  computed: {
    ...mapGetters([
      'loggedIn',
    ]),
    localAdjustment() {
      return this.userVote !== this.localVote;
    },
    voteTotal() {
      let adjust = 0;
      if (this.localAdjustment) {
        if (this.localVote === 'up') {
          if (this.userVote === 'down') {
            adjust = 2;
          } else {
            adjust = 1;
          }
        } else if (this.localVote === 'down') {
          if (this.userVote === 'up') {
            adjust = -2;
          } else {
            adjust = -1;
          }
        } else if (this.localVote === null) {
          if (this.userVote === 'up') {
            adjust = -1;
          } else {
            adjust = 1;
          }
        }
      }
      return this.upVotes - this.downVotes + adjust;
    },
    displayUserVote() {
      if (!this.loggedIn) {
        return null;
      }
      if (this.localAdjustment) {
        return this.localVote;
      }
      return this.userVote;
    },
  },
  watch: {
    userVote() {
      this.localVote = this.userVote;
    },
  },
  methods: {
    voteUp() {
      if (this.displayUserVote !== 'up') {
        this.vote('up');
      } else {
        this.vote(null);
      }
    },
    voteDown() {
      if (this.displayUserVote !== 'down') {
        this.vote('down');
      } else {
        this.vote(null);
      }
    },
    vote(voteType) {
      if (this.loggedIn) {
        this.$socket.emit('addVote', {
          memeId: this.memeId,
          voteType,
        }, (voteResult) => {
          if (voteResult.isSuccessful) {
            this.localVote = voteType;
          } else {
            this.$q.notify(voteResult.value);
          }
        });
      }
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
