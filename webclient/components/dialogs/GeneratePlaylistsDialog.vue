<template>
  <v-dialog v-model="active" persistent max-width="50%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          generate
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline pa-0 mb-5">
          <v-toolbar color="primary">
            <v-toolbar-title>
              Generator Settings
            </v-toolbar-title>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <div class="d-flex flex-column">
            <h4 class="subtitle">
              Genres
            </h4>
            <v-container fluid>
              <v-row dense>
                <v-col :cols="6" class="pa-0">
                  <v-checkbox label="all" class="pa-0 ma-0" dense/>
                </v-col>
                <v-col :cols="6" v-for="genre in supportedGenres" :key="genre" class="pa-0">
                  <v-checkbox :label="genre" class="pa-0 ma-0" dense/>
                </v-col>
                <v-col :cols="6" class="pa-0">
                  <v-checkbox label="other" class="pa-0 ma-0" dense/>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary">generate</v-btn>
          <v-btn text @click="active = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import supportedGenres from '~/data/supportedGenres';

export default {
  data: () => ({
    active: false,
    supportedGenres,
  }),
};
</script>
