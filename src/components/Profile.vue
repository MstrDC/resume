<template>
  <v-sheet class="mb-8">
    <v-card>
      <v-card-title class="text-h4">Profile</v-card-title>
      <v-card-subtitle class="text-subtitle-1">Experienced Team Lead with a passion for quality and continuous improvement</v-card-subtitle>
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="auto" class="text-center">
            <v-avatar size="200">
              <v-img :src="profileImage" alt="Dennis Cappel" />
            </v-avatar>
          </v-col>
          <v-col>
            <v-card-text>
              <p class="text-body-1 mb-4">{{ profile.summary }}</p>
              <h3 class="text-h5 mb-2">My Principles</h3>
              <v-list>
                <v-list-item
                  v-for="(principle, index) in profile.principles"
                  :key="index"
                  :title="principle"
                  prepend-icon="mdi-check"
                  class="mb-1"
                />
              </v-list>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import profileImage from '../assets/picture me.png';

defineProps<{
  profile: {
    summary: string;
    principles: string[];
  };
}>();
</script>
