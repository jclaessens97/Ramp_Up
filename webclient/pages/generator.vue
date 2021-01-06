<template>
  <v-row>
    <v-col :cols="12">
      <h1>Generator</h1>
    </v-col>
    <v-col :cols="12">
      <generator-progress :progress="progress" :states="states" />
      <preview-playlists v-if="awaitingPreview" :playlists="generatedPlaylists" />
    </v-col>
    <v-col :cols="12">
      <v-btn v-if="isFinished" href="/" color="primary">
        {{ $vuetify.lang.t('$vuetify.generator.home') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import {
  getAllLikedTracksByUserToken,
  getAudioFeaturesByIds,
} from '~/services/spotifyClient';
import {
  mergeAudioFeaturesToTracks,
} from '~/services/trackService';
import {
  generatePlaylists,
  createPlaylistsOnSpotify,
} from '~/services/playlistService';
import Progress from '~/components/generator/Progress.vue';
import ProgressState from '~/data/progressState';
import PreviewPlaylists from '~/components/generator/PreviewPlaylists.vue';

export default {
  middleware: ['auth', 'generator'],
  components: {
    GeneratorProgress: Progress,
    PreviewPlaylists,
  },
  async fetch() {
    await this.fetchLikedTracks();
    await this.fetchAudioFeatures();
    await this.generatePlaylists();
  },
  data: () => ({
    likedTracks: [],
    generatedPlaylists: [],
    progress: [{
      id: 0,
      status: ProgressState.ACTIVE,
    }, {
      id: 1,
      status: ProgressState.INACTIVE,
    }, {
      id: 2,
      status: ProgressState.INACTIVE,
    }, {
      id: 3,
      status: ProgressState.INACTIVE,
    }],
    states: [{
      id: 0,
      text: '$vuetify.generator.fetchingLikedTracks',
      textDone: '$vuetify.generator.fetchedLikedTracks',
      textFailed: '$vuetify.generator.failedFetchingLikedTracks',
    }, {
      id: 1,
      text: '$vuetify.generator.fetchingAudioFeatures',
      textDone: '$vuetify.generator.fetchedAudioFeatures',
      textFailed: '$vuetify.generator.failedFetchingAudioFeatures',
    }, {
      id: 2,
      text: '$vuetify.generator.generatingPlaylists',
      textDone: '$vuetify.generator.generatedPlaylists',
      textFailed: '$vuetify.generator.failedGeneratingPlaylists',
    }, {
      id: 3,
      text: '$vuetify.generator.creatingPlaylistsSpotify',
      textDone: '$vuetify.generator.createdPlaylistsSpotify',
      textFailed: '$vuetify.generator.failedCreatingPlaylists',
    }],
  }),
  computed: {
    ...mapState({
      options: (state) => state.generator.options,
    }),
    awaitingPreview() {
      return this.progress[2].status === ProgressState.DONE
        && this.progress[3].status !== ProgressState.DONE;
    },
    isFinished() {
      return this.progress[this.progress.length - 1].status === ProgressState.DONE;
    },
  },
  created() {
    this.$nuxt.$on('accept-playlist-preview', (playlists) => this.createPlaylistsOnSpotify(playlists));
  },
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
        this.updateStatus(2, ProgressState.ACTIVE);
      } catch (err) {
        this.updateStatus(1, ProgressState.FAILED);
      }
    },
    async generatePlaylists() {
      try {
        this.generatedPlaylists = await generatePlaylists(
          this.likedTracks.slice(0, 50),
          this.options,
        );
        this.updateStatus(2, ProgressState.DONE);
        this.updateStatus(3, ProgressState.WAITING);
      } catch (err) {
        this.updateStatus(2, ProgressState.FAILED);
      }
    },
    async createPlaylistsOnSpotify(playlists) {
      try {
        console.log(playlists);
        await createPlaylistsOnSpotify(this, this.$auth.$state.user.id, playlists);
        this.updateStatus(3, ProgressState.DONE);
        // this.$router.push('/');
      } catch (err) {
        console.error(err);
        this.updateStatus(3, ProgressState.FAILED);
      }
    },
  },
};
</script>
