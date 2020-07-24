<template>
  <v-app dark>
    <v-app-bar color="primary" app>
      <v-toolbar-title v-text="'Ramp_Up'" />
      <v-spacer />
      <v-icon v-if="$auth.$state.loggedIn" @click="logout" large>
        fa-sign-out-alt
      </v-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
