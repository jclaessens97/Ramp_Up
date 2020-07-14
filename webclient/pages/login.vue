<template>
  <div class="flex flex-wrap ">
    <div class="w-full text-center">
      <h1 class="text-6xl text-spotify-green">
        Ramp_Up
      </h1>
      <button
        class="action-button"
        @click="authenticate"
      >
        start here
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async authenticate() {
      await this.$auth.loginWith('spotify');
    },
  },
};
</script>
