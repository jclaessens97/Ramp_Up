<template>
  <div class="flex flex-wrap">
    <div class="grid-cols-6">
      <button
        class="action-button"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
