<template>
  <main>
    <div class="flex flex-wrap ">
      <div class="w-full text-center">
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
