<template>
  <v-dialog v-model="active" persistent max-width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.generate') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline pa-0 mb-5">
        <v-toolbar color="primary">
          <v-toolbar-title>
            {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.generatorSettings') }}
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column">
          <h4 class="subtitle text-uppercase">
            {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.genres') }}
          </h4>
          <v-container fluid>
            <v-row dense>
              <v-col v-for="genre in supportedGenres" :key="genre" :cols="6" class="pa-0">
                <v-checkbox
                  v-model="options.genres"
                  :label="genre"
                  :value="genre"
                  class="pa-0 ma-0"
                  dense
                />
              </v-col>
              <v-col :cols="6" class="pa-0">
                <v-checkbox
                  v-model="options.genres"
                  :label="$vuetify.lang.t('$vuetify.generatePlaylistDialog.other')"
                  value="other"
                  class="pa-0 ma-0"
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="d-flex flex-column">
          <h4 class="subtitle text-uppercase">
            {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.other') }}
          </h4>
          <v-row align="center">
              <v-checkbox
                v-model="options.maxNumber.enabled"
                hide-details
                class="pa-0 ma-0 ml-5"
                dense
              />
              <v-text-field
                v-model="options.maxNumber.value"
                type="number"
                :disabled="!options.maxNumber.enabled"
                label="Maximum # tracks per playlist"
              />
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="startGenerator" :disabled="!validInput">
          {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.generate') }}
        </v-btn>
        <v-btn text @click="active = false">
          {{ $vuetify.lang.t('$vuetify.generatePlaylistDialog.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getSupportedGenres } from '~/services/trackService';

export default {
  data: () => ({
    active: false,
    allGenresSelected: false,
    options: {
      genres: [],
      maxNumber: {
        enabled: false,
        value: null,
      },
    },
  }),
  computed: {
    validInput() {
      return this.options.genres.length > 0;
    },
    supportedGenres() {
      return getSupportedGenres();
    },
  },
  methods: {
    startGenerator() {
      this.$store.commit('generator/setOptions', this.options);
      this.$router.push('/generator');
    },
  },
};
</script>
