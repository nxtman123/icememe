<template>
  <q-layout>
    <q-page class="column justify-center page-frame">
      <span style="height: 40px" />
      <meme-collection
        :memes="memes"
        @load="loadMoreMemes"
      />
    </q-page>
    <q-page-sticky
      position="top-left"
      :offset="[0, 50]"
    >
      <div style="background-color: rgba(2, 123, 227, 0.42);">
        <p style="padding: 10px; color: white;">
          Posted by: john-cena
        </p>
      </div>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageUser',
  components: {
    'meme-collection': MemeCollection,
  },
  data() {
    return {
      memes: [
        {
          memeId: 0,
          authorUsername: 'john-cena',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 1,
          authorUsername: 'john-cena',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 2,
          authorUsername: 'john-cena',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: -79,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 3,
          authorUsername: 'john-cena',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 4,
          authorUsername: 'john-cena',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 5,
          authorUsername: 'john-cena',
          title: 'I can\'t do that while you\'re watching',
          cloudinaryUrl: 'https://i.redd.it/0snws7y219b11.png',
          dateCreated: 1554145159,
          voteTotal: 54323,
          userVote: 'up',
          commentCount: 3123,
        },
        {
          memeId: 6,
          authorUsername: 'john-cena',
          title: 'Mr. Fish, I don\'t feel so good',
          cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
          dateCreated: 1554145159,
          voteTotal: 543,
          userVote: 'down',
          commentCount: 17,
        },
        {
          memeId: 7,
          authorUsername: 'john-cena',
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
    loadMoreMemes(done) {
      setTimeout(() => {
        if (this.memes) {
          const nextId = this.memes.length;
          this.memes.push(
            {
              memeId: nextId,
              authorUsername: 'john-cena',
              title: 'Mr. Fish, I don\'t feel so good',
              cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
              dateCreated: 1554145159,
              voteTotal: 543,
              userVote: 'down',
              commentCount: 17,
            },
            {
              memeId: nextId + 1,
              authorUsername: 'john-cena',
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
      }, 1500);
    },
  },
};
</script>

<style>
</style>
