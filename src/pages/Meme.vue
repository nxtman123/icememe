<template>
  <q-page class="list-page">
    <div class="row justify-center q-col-gutter-sm">
      <div class="col-12 col-sm-6 column justify-start">
        <div class="text-h6 q-py-md">
          {{ title }}
        </div>
        <q-img
          spinner-color="primary"
          :src="cloudinaryUrl"
          :alt="title"
          class="q-mb-sm"
        />
        <meme-metadata
          :author-username="authorUsername"
          :date-created="dateCreated"
        />
        <div class="row justify-between">
          <vote-buttons
            class="q-mb-sm q-mr-sm"
            :vote-total="voteTotal"
            :user-vote="userVote"
          />
          <div class="row items-center self-stretch q-mb-sm">
            <q-icon
              name="comment"
              left
              size="24px"
            />
            <div class="text-subtitle2">
              {{ commentCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import slugify from 'slugify';

import VoteButtons from '../components/VoteButtons';
import MemeMetadata from '../components/MemeMetadata';

export default {
  name: 'PageMeme',
  components: {
    'vote-buttons': VoteButtons,
    'meme-metadata': MemeMetadata,
  },
  data() {
    return {
      memeId: 0,
      authorUsername: 'icedoge',
      title: 'Mr. Fish, I don\'t feel so good',
      cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
      dateCreated: 1554145159,
      voteTotal: 543,
      userVote: 'up',
      commentCount: 17,
    };
  },
  computed: {
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
  },
};
</script>

<style>
</style>
