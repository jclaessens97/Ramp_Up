<template>
  <p>Loading...</p>
</template>

<script>
import { parseAccessToken, getAccessToken } from '../services/authService';

export default {
  created() {
    if (getAccessToken()) {
      this.$router.push('/');
      return;
    }

    parseAccessToken(this);
  },
};
</script>
