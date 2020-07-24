<template>
  <div class="flex content-center justify-center flex-wrap h-64">
    <div class="w-100 text-center">
      <img :src="avatar" class="rounded-full h-40 mx-auto" />
      <h2 class="text-4xl font-hairline">Hi, {{ displayName }}</h2>
    </div>
    <my-playlists />
  </div>
</template>

<script>
import { getAccessToken, logout } from '../services/authService'
import SpotifyClient from '../services/spotifyClient';
import MyPlaylists from '../components/MyPlaylists.vue';

export default {
  components: {
    MyPlaylists,
  },
  data: () => ({
    spotifyClient: null,
    me: null,
  }),
  async created() {
    this.spotifyClient = new SpotifyClient();
    this.me = await this.spotifyClient.me();
    console.log(this.me)
  },
  computed: {
    displayName() {
      if (this.me) {
        return this.me.display_name;
      }
      return '';
    },
    avatar() {
      if (this.me) {
        return this.me.images[0].url;
      }
      return '';
    }
  },

};
</script>
