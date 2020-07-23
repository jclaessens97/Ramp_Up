<template>
  <div class="flex flex-wrap">
    <div class="grid-cols-6">
      <button
        class="action-button"
        @click="logout"
      >
        Logout
      </button>
      <p>{{ token }}</p>
    </div>
  </div>
</template>

<script>
import { getAccessToken, logout } from '../services/authService'


export default {
  computed: {
    token() {
      return getAccessToken().slice(7);
    },
  },
  methods: {
    logout() {
      logout(this);
    },
  },
};
</script>
