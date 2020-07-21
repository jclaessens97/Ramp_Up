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
export default {
  middleware: 'auth',
  computed: {
    // TODO: remove, only for debugging
    token() {
      if (process.client) {
        return window.localStorage.getItem('auth._token.spotify').slice(7);
      }

      return 'none';
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
