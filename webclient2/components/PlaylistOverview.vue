<template>
  <div>
    <div class="d-flex flex-row align-center">
      <h2>Playlist Overview</h2>
      <v-checkbox
        v-model="onlyGenerated"
        class="ml-5"
        label="Show only generated playlists"
      />
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

      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center justify-space-between">
          {{ item.name }}
          <v-btn
            :href="item.external_urls.spotify"
            target="_blank"
            outlined
            small
          >
            view on spotify
          </v-btn>
        </div>
      </template>

      <template v-slot:item.public="{ item }">
        <v-icon v-if="item.public" color="green">fa-lock-open</v-icon>
        <v-icon v-if="!item.public" color="red">fa-lock-closed</v-icon>
      </template>
    </v-data-table>
  </div>

</template>

<script>
export default {
  data: () => ({
    onlyGenerated: false,
    headers: [{
      text: '',
      value: 'images',
      sortable: false,
      width: 60,
    }, {
      text: 'Name',
      value: 'name',
    }, {
      text: '# Tracks',
      value: 'tracks.total',
      align: 'center',
      width: 100,
    }, {
      text: 'Public',
      value: 'public',
      sortable: false,
      align: 'center',
      width: 40,
    }],
  }),
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
  methods: {
    getSmallestImage(imgArr) {
      const minHeight = Math.min(...imgArr.map(({ height }) => height));
      const [img] = imgArr.filter(({ height }) => height === minHeight);
      return img;
    },
  },
};
</script>
