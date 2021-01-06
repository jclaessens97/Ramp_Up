<template>
  <v-container>
    <v-row v-for="status in states" :key="status.id" class="align-center py-2" no-gutters>
      <v-col :cols="1" class="text-center">
        <v-progress-circular
          v-show="isActive(status)"
          indeterminate
          color="primary"
        />
        <v-icon large color="success" v-if="isDone(status)">far fa-check-circle</v-icon>
        <v-icon large color="warning" v-if="isWaiting(status)">far fa-pause-circle</v-icon>
        <v-icon large color="error" v-if="isFailed(status)">far fa-times-circle</v-icon>
      </v-col>
      <v-col>
        <span class="ml-2">{{ $vuetify.lang.t(getText(status)) }}...</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProgressState from '~/data/progressState';

export default {
  props: {
    progress: {
      type: Array,
      required: true,
    },
    states: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isInactive(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.INACTIVE;
    },
    isActive(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.ACTIVE;
    },
    isWaiting(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.WAITING;
    },
    isDone(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.DONE;
    },
    isFailed(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.FAILED;
    },
    getText(status) {
      if (this.isDone(status)) {
        return status.textDone;
      }

      if (this.isFailed(status)) {
        return status.textFailed;
      }

      return status.text;
    },
  },
};
</script>
