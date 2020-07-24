<template>
  <div class="container mx-auto">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/layout/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
}
</script>
