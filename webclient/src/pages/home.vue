<template>
  <div class="flex flex-wrap">
    <div class="grid-cols-6">
      <button
        class="action-button"
        @click="logout"
      >
        Logout
      </button>
      <p>{{ token.slice(7) }}</p>
    </div>
  </div>
</template>

<script>
import { getAccessToken, logout } from '../services/authService'
import SpotifyClient from '../services/spotifyClient';

export default {
  data: () => ({
    spotifyClient: null,
  }),
  created() {
    this.spotifyClient = new SpotifyClient(this.token);
  },
  async mounted() {
    console.log(await this.spotifyClient.getAllLikedTracksByUserToken());
  },
  computed: {
    token() {
      return getAccessToken();
    },
  },
  methods: {
    logout() {
      logout(this);
    },
  },
};
</script>
