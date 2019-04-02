<template>
  <q-page class="row justify-center q-col-gutter-sm list-page">
    <div class="col-12 col-sm-6 column justify-start">
      <div class="text-h6 q-py-md">
        {{ title }}
      </div>
      <q-img
        spinner-color="primary"
        :src="cloudinaryUrl"
        :alt="title"
      />
      <div class="row justify-between">
        <router-link
          :to="{ name: 'user', params: { username: authorUsername } }"
          class="author-link"
        >
          <div class="text-subtitle2 q-py-sm">
            {{ authorUsername }}
          </div>
        </router-link>
        <div class="text-caption q-py-sm">
          {{ displayDate }}
        </div>
      </div>
      <div class="row justify-between">
        <q-btn-toggle
          outline
          class="q-mb-sm"
          :value="userVote"
          :options="[
            { icon: 'arrow_upward', label: upVotes, value: 'up'},
            { icon: 'arrow_downward', label: downVotes, value: 'down'},
          ]"
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
  </q-page>
</template>

<script>
import moment from 'moment';
import slugify from 'slugify';

export default {
  name: 'PageMeme',
  data() {
    return {
      memeId: 0,
      authorUsername: 'icedoge',
      title: 'Mr. Fish, I don\'t feel so good',
      cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
      dateCreated: 1554145159,
      upVotes: 543,
      downVotes: 73,
      userVote: 'up',
      commentCount: 17,
    };
  },
  computed: {
    displayDate() {
      return moment.unix(this.dateCreated).calendar(null, { sameElse: 'YYYY-MM-DD' });
    },
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
  },
};
</script>

<style>
</style>
