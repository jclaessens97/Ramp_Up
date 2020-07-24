<template>
  <v-row>
    <v-col :cols="12" class="text-center">
      <v-avatar :size="200">
        <v-img
          :src="user.images[0].url"
        />
      </v-avatar>
      <h2 class="text-h4 font-weight-thin">
        Hi, {{ user.display_name }}
      </h2>
    </v-col>
    <v-col :cols="12">
      <playlist-overview :playlists="playlists" :loading="$fetchState.pending" />
    </v-col>
  </v-row>
</template>

<script>
import PlaylistOverview from '~/components/overviews/PlaylistOverview.vue';
import {
  getAllPlaylistsByUserToken,
} from '~/services/spotifyClient';

export default {
  middleware: 'auth',
  components: {
    PlaylistOverview,
  },
  async fetch() {
    this.playlists = await getAllPlaylistsByUserToken(this);
    console.log(this.playlists);
  },
  data: () => ({
    playlists: [],
  }),
  created() {
    console.log(this.user);
  },
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
};
</script>
