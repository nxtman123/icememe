<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
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
          flat
          stretch
          :to="{ name: 'register' }"
        >
          Sign Up / Log In
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
          [USERNAME]
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
        <q-item
          clickable
          tag="a"
          :to="{ name: 'user', params: { userId: 456, slug: 'john-cena' }}"
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
              Profile Settings
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'MyLayout',
  data() {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
    logout() {
      alert('TODO: LOGOUT');
    },
  },
};
</script>

<style>
</style>
