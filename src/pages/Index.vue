<template>
  <q-page class="column justify-center page-frame">
    <q-infinite-scroll
      :offset="250"
      @load="loadMoreMemes"
    >
      <div class="row justify-center q-col-gutter-sm q-pt-md">
        <meme-card
          v-for="meme in memes"
          :key="meme.id"
          v-bind="meme"
        />
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import MemeCard from '../components/MemeCard';

export default {
  name: 'PageIndex',
  components: {
    'meme-card': MemeCard,
  },
  data() {
    return {
      memes: [
        {
          memeId: 0,
          authorUsername: 'icedoge',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 1,
          authorUsername: 'icedoge',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 2,
          authorUsername: 'icedoge',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: -543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 3,
          authorUsername: 'icedoge',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 4,
          authorUsername: 'icedoge',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 5,
          authorUsername: 'icedoge',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 6,
          authorUsername: 'icedoge',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 7,
          authorUsername: 'icedoge',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
      ],
    };
  },
  methods: {
    loadMoreMemes(index, done) {
      setTimeout(() => {
        if (this.memes) {
          const nextId = this.memes.length;
          this.memes.push(
            {
              memeId: nextId,
              authorUsername: 'icedoge',
              title: 'Mr. Fish, I don\'t feel so good',
              cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
              dateCreated: 1554145159,
              voteTotal: 543,
              userVote: 'down',
              commentCount: 17,
            },
            {
              memeId: nextId + 1,
              authorUsername: 'icedoge',
              title: 'I can\'t do that while you\'re watching',
              cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
              dateCreated: 1554145159,
              voteTotal: 54323,
              userVote: 'up',
              commentCount: 3123,
            },
          );
        }
        done();
      }, 2000);
    },
  },
};
</script>

<style>
</style>
