<template>
  <main>
    <div class="flex flex-wrap ">
      <div class="w-full text-center">
        <h1 class="text-6xl text-spotify-green">
          Ramp_Up
        </h1>
        <button
          class="action-button"
          @click="login"
        >
          start here
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { requestAuthorization } from '../services/authService';

export default {
  methods: {
    login() {
      requestAuthorization();
    },
  },
};
</script>