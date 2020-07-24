<template>
  <p>Loading...</p>
</template>

<script>
import { parseAccessToken, getAccessToken } from '../services/authService';

export default {
  inject: ['spotifyClient'],
  created() {
    parseAccessToken(this);
    this.$router.push('/');
  },
};
</script>
