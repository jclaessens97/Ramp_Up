<template>
  <v-card  class="ma-3 pa-4">
    <h2>{{ $vuetify.lang.t('$vuetify.generatorPreview.preview') }}</h2>

    <v-expansion-panels accordion class="my-2">
      <v-expansion-panel
        v-for="(playlist) in playlists"
        :key="playlist.name"
        style="background:#424242;"
      >
        <v-expansion-panel-header>
          {{ playlist.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="playlist.tracks"
          >
            <template v-slot:item.artists="{ item }">
              {{ item.artists.map((a) => a.name).join(', ') }}
            </template>

            <template v-slot:item.genre="{ item }">
              <v-chip :color="genreProbabilityColor(item.genre)">
                {{ item.genre.name }}
                <b class="ml-1">({{ (item.genre.probability * 100).toFixed(1) + '%' }})</b>
              </v-chip>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="text-center">
      <v-btn color="primary" @click="acceptPreview">
        {{ $vuetify.lang.t('$vuetify.generatorPreview.continue') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true,
    },
  },
  computed: {
    headers() {
      return [
        {
          text: this.$vuetify.lang.t('$vuetify.generatorPreview.trackName'),
          value: 'name',
        }, {
          text: this.$vuetify.lang.t('$vuetify.generatorPreview.artists'),
          value: 'artists',
        }, {
          text: this.$vuetify.lang.t('$vuetify.generatorPreview.genre'),
          value: 'genre',
        },
      ];
    },
  },
  methods: {
    genreProbabilityColor(genre) {
      if (genre.probability < 0.50) {
        return 'error';
      }

      if (genre.probability < 0.85) {
        return 'warning';
      }

      return 'success';
    },
    acceptPreview() {
      this.$nuxt.$emit('accept-playlist-preview', this.playlists);
    },
  },
};
</script>
