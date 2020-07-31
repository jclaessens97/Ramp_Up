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
  getAudioFeaturesByIds,
} from '~/services/spotifyClient';
import {
  getGenreFromTrack,
  mergeAudioFeaturesToTracks,
} from '~/services/trackService';
import Progress from '~/components/generator/Progress.vue';
import ProgressState from '~/data/progressState';

export default {
  middleware: ['auth', 'generator'],
  components: {
    GeneratorProgress: Progress,
  },
  async fetch() {
    await this.fetchLikedTracks();
    await this.fetchAudioFeatures();

    await getGenreFromTrack(this.likedTracks[0]);
  },
  data: () => ({
    likedTracks: [],
    progress: [{
      id: 0,
      status: ProgressState.ACTIVE,
    }, {
      id: 1,
      status: ProgressState.INACTIVE,
    }],
  }),
  methods: {
    updateStatus(id, state) {
      this.progress.find((p) => p.id === id).status = state;
    },
    async fetchLikedTracks() {
      try {
        this.likedTracks = await getAllLikedTracksByUserToken(this);
        this.updateStatus(0, ProgressState.DONE);
        this.updateStatus(1, ProgressState.ACTIVE);
      } catch (err) {
        this.updateStatus(0, ProgressState.FAILED);
      }
    },
    async fetchAudioFeatures() {
      try {
        const audioFeatures = await getAudioFeaturesByIds(
          this,
          this.likedTracks.map((t) => t.track.id),
        );
        this.likedTracks = mergeAudioFeaturesToTracks(this.likedTracks, audioFeatures);
        this.updateStatus(1, ProgressState.DONE);
      } catch (err) {
        this.updateStatus(1, ProgressState.FAILED);
      }
    },
  },
};
</script>
