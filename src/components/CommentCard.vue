<template>
  <div class="q-mb-sm">
    <q-card>
      <q-card-section>
        <meme-metadata
          class="comment-metadata"
          :author-username="username"
          :date-created="dateCreated"
        />
        <div class="text-body1">
          {{ text }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import MemeMetadata from './MemeMetadata';

export default {
  name: 'CommentCard',
  components: {
    'meme-metadata': MemeMetadata,
  },
  props: {
    commentId: {
      type: Number,
      default: -1,
    },
    username: {
      type: String,
      default: '',
    },
    dateCreated: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
@import '~quasar-variables'

.comment-metadata
  color: $grey-7

</style>
