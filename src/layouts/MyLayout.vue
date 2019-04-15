<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      elevated
      :reveal="!this.$q.platform.is.desktop"
    >
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            id="title"
            :to="{ name: 'main' }"
          >
            ICEMEME
          </router-link>
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          flat
          stretch
          @click="prompt=true"
        >
          Log In
        </q-btn>

        <q-dialog v-model="prompt">
          <login-dialog />
        </q-dialog>

        <q-btn
          v-if="!loggedIn"
          flat
          stretch
          :to="{ name: 'register' }"
        >
          Sign Up
        </q-btn>

        <q-btn
          v-if="loggedIn"
          flat
          stretch
          no-caps
          :to="{ name: 'user', params: { username: username }}"
        >
          {{ username }}
        </q-btn>
        <q-btn
          v-if="loggedIn"
          flat
          stretch
          @click="logout"
        >
          Log Out
        </q-btn>

        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>
          {{ username }}
        </q-item-label>
        <q-item
          clickable
          tag="a"
          exact
          :to="{ name: 'main' }"
        >
          <q-item-section avatar>
            <q-icon name="whatshot" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Latest</q-item-label>
            <q-item-label caption>
              Main Page
            </q-item-label>
          </q-item-section>
        </q-item>
        <template v-if="loggedIn">
          <q-item
            clickable
            tag="a"
            :to="{ name: 'user', params: { username: username }}"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>My Page</q-item-label>
              <q-item-label caption>
                User Profile
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            tag="a"
            :to="{ name: 'new' }"
          >
            <q-item-section avatar>
              <q-icon name="cloud_upload" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Upload</q-item-label>
              <q-item-label caption>
                New Meme
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            tag="a"
            :to="{ name: 'settings' }"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
              <q-item-label caption>
                Account Settings
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            tag="a"
            @click="logout"
          >
            <q-item-section avatar>
              <q-icon name="exit_to_app" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Log out</q-item-label>
              <q-item-label caption>
                Sign out
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item
          clickable
          tag="a"
          onclick="location.href='mailto:icememe.moderator@gmail.com'"
        >
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Contact the administrator</q-item-label>
            <q-item-label caption>
              Email
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from 'vuex';

import LoginDialog from '../components/LoginDialog';

export default {
  name: 'MyLayout',
  components: {
    'login-dialog': LoginDialog,
  },
  data() {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      prompt: false,
    };
  },
  computed: {
    ...mapGetters([
      'username',
      'loggedIn',
    ]),
  },
  watch: {
    loggedIn(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        this.prompt = false;
      }
    },
  },
  methods: {
    openURL,
    logout() {
      this.$socket.emit('logout');
      this.$router.push({ name: 'main' });
    },
  },
};
</script>

<style>
</style>
