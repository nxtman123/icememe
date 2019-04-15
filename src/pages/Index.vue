<template>
  <q-page class="column justify-center page-frame">
    <meme-collection
      :memes="memes"
      @load="loadMoreMemes"
    />
  </q-page>
</template>

<script>
import _ from 'underscore';
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageIndex',
  components: {
    'meme-collection': MemeCollection,
  },
  data() {
    return {
      memes: [],
      earliestMeme: 0,
    };
  },
  methods: {
    loadMoreMemes(done) {
      setTimeout(() => {
        if (this.memes) {
          this.$socket.emit('getMemes', '', this.earliestMeme);
        }
        done();
      }, 1500);
    },
  },
  sockets: {
    getMemes(reply) {
      if (reply.value.length > 0) {
        reply.value.forEach((item) => {
          const upvotes = _.isUndefined(item.up_votes) ? 0 : item.up_votes;
          const downvotes = _.isUndefined(item.down_votes) ? 0 : item.down_votes;

          this.memes.push({
            memeId: item.meme_id,
            authorUsername: item.username,
            title: item.title,
            cloudinaryUrl: item.cloudinary_url,
            dateCreated: item.date_created,
            voteTotal: upvotes + downvotes,
            userVote: 'up',
            commentCount: item.comment_count,
          });
        });
        this.earliestMeme = reply.value[reply.value.length - 1].meme_id;
      }
    },
  },
};
</script>

<style>
</style>
