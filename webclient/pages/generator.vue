<template>
  <v-row>
    <v-col :cols="12">
      <h1>Generator</h1>
    </v-col>
    <v-col :cols="12">
      <generator-progress :progress="progress" />
    </v-col>
  </v-row>
</template>

<script>
import {
  getAllLikedTracksByUserToken,
} from '~/services/spotifyClient';
import Progress from '~/components/generator/Progress.vue';
import ProgressState from '~/data/progressState';

export default {
  middleware: ['auth', 'generator'],
  components: {
    GeneratorProgress: Progress,
  },
  async fetch() {
    try {
      this.likedTracks = await getAllLikedTracksByUserToken(this);
      this.updateStatus(0, ProgressState.DONE);
    } catch (err) {
      this.updateStatus(0, ProgressState.FAILED);
    }
  },
  data: () => ({
    likedTracks: [],
    progress: [{
      id: 0,
      status: ProgressState.ACTIVE,
    }],
  }),
  methods: {
    updateStatus(id, state) {
      this.progress.find((p) => p.id === id).status = state;
    },
  },
};
</script>
