<template>
  <v-col :cols="12">
    <div class="d-flex flex-row align-center">
      <h2>{{ $vuetify.lang.t('$vuetify.playlistOverview.playlistOverview') }}</h2>
      <v-checkbox
        v-model="onlyGenerated"
        class="ml-5"
        :label="$vuetify.lang.t('$vuetify.playlistOverview.showOnlyGenerated')"
      />
    </div>

    <div class="d-flex flex-row align-center">
      <generate-playlists-dialog />
    </div>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="playlists"
    >
      <template v-slot:item.images="{ item }">
        <v-img
          :src="getSmallestImage(item.images).url"
          :height="getSmallestImage(item.images).height"
          contain
        />
      </template>

      <template v-slot:item.images="{ item }">
        <v-img
          :src="getSmallestImage(item.images).url"
          :height="getSmallestImage(item.images).height"
          contain
        />
      </template>

      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center justify-space-between">
          {{ item.name }}
          <v-btn
            :href="item.external_urls.spotify"
            target="_blank"
            outlined
            small
          >
            {{ $vuetify.lang.t('$vuetify.playlistOverview.viewOnSpotify') }}
          </v-btn>
        </div>
      </template>

      <template v-slot:item.public="{ item }">
        <v-icon v-if="item.public" color="green">
          fa-lock-open
        </v-icon>
        <v-icon v-if="!item.public" color="red">
          fa-lock-closed
        </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import GeneratePlaylistsDialog from '~/components/dialogs/GeneratePlaylistsDialog.vue';

export default {
  components: {
    GeneratePlaylistsDialog,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    playlists: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    onlyGenerated: false,
  }),
  computed: {
    headers() {
      return [
        {
          text: '',
          value: 'images',
          sortable: false,
          width: 60,
          align: 'center',
        }, {
          text: this.$vuetify.lang.t('$vuetify.playlistOverview.name'),
          value: 'name',
        }, {
          text: `# ${this.$vuetify.lang.t('$vuetify.playlistOverview.tracks')}`,
          value: 'tracks.total',
          align: 'center',
          width: 100,
        }, {
          text: this.$vuetify.lang.t('$vuetify.playlistOverview.public'),
          value: 'public',
          sortable: false,
          width: 60,
          align: 'center',
        },
      ];
    },
  },
  methods: {
    getSmallestImage(imgArr) {
      const minHeight = Math.min(...imgArr.map(({ height }) => height));
      const [img] = imgArr.filter(({ height }) => height === minHeight);
      return img;
    },
  },
};
</script>
