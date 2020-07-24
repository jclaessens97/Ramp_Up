<template>
  <header class="grid grid-cols-3 h-32 mb-8 grid-flow-row">
    <div class="col-start-2 text-center h-48 mx-auto">
      <h1 class="text-6xl text-spotify-green">
        Ramp_Up
      </h1>
    </div>
    <div class="mt-8 ml-auto">
        <button
          v-if="isAuthenticated"
          class="action-button h-8"
          @click="logout"
        >
          Logout
        </button>
    </div>
  </header>
</template>

<script>
import { getAccessToken, logout } from '../../services/authService';
// import SpotifyClient from '../../services/spotifyClient';

export default {
  data: () => ({
    isAuthenticated: false,
  }),
  mounted() {
    if (getAccessToken()) {
      this.isAuthenticated = true;
    }
  },
  methods: {
    logout() {
      logout(this);
      this.isAuthenticated = false;
    },
  },
};
</script>
