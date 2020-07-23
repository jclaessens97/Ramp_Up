<template>
  <p>Loading...</p>
</template>

<script>
import { parseAccessToken } from '../services/authService';

export default {
  created() {
    parseAccessToken(this);
  },
};
</script>