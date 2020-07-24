<template>
  <div class="w-full">
    <div class="flex flex-row">
      <h3 class="text-3xl">My Playlists</h3>
      <label class="ml-5 mt-3">
        <input class="mr-2 leading-tight" type="checkbox">
        <span class="text-sm">
          Only show generated playlists
        </span>
      </label>
    </div>
    <div class="flex flex-row">
      <button class="action-button">
        generate playlists
      </button>
    </div>
    <table class="table-auto">
      <thead>
        <tr>
          <th></th>
          <th class="text-left px-5">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="playlist in playlists" :key="playlist.id">
          <td><img :src="getSmallestImage(playlist.images).url" /></td>
          <td class="px-5">{{ playlist.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SpotifyClient from '../services/spotifyClient';
export default {
  data: () => ({
    spotifyClient: null,
    playlists: [],
  }),
  async created() {
    this.spotifyClient = new SpotifyClient();
    this.playlists = await this.spotifyClient.getAllPlaylistsByUserToken();
    console.log(this.playlists);
  },
  methods: {
    getSmallestImage(imgArr) {
      const minHeight = Math.min(...imgArr.map(({ height }) => height));
      const [img] = imgArr.filter(({height}) => height === minHeight);
      console.log(img);
      return img;
    },
  }
};
</script>
