<template>
  <v-row>
    <v-col class="text-center">
      <v-btn color="primary" @click="authenticate">
        {{ $vuetify.lang.t('$vuetify.startHere') }}
      </v-btn>
    </v-col>
  </v-row>
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
