<template>
  <v-app :theme="isDarkMode ? 'dark' : 'light'">
    <v-app-bar v-if="!isPrinting" scroll-behavior="hide" color="primary" density="compact" elevation="1">
      <v-container max-width="1200" class="px-4"> <!-- Added padding -->
        <v-row align="center" no-gutters>
          <v-col cols="6" sm="8">
            <v-toolbar-title>Resume of Dennis Cappel</v-toolbar-title>
          </v-col>
          <v-col cols="6" sm="4" class="d-flex justify-end align-center">
            <v-btn variant="text" prepend-icon="mdi-file-download" title="Download PDF" @click="exportToPdf"
              class="mr-2">
              Download
            </v-btn>
            <v-switch v-model="isDarkMode" inset hide-details density="compact"
              :prepend-icon="isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'">
            </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="pt-8" max-width="1200">
        <v-responsive>
          <PersonalDetails v-bind="resumeData" />
          <Profile :profile="resumeData.profile" />
          <div v-if="isPrinting" style="page-break-before: always;"></div>
          <WorkHistory :experience="resumeData.work_experience" />
          <v-divider class="my-8"></v-divider>
          <div v-if="isPrinting" style="page-break-before: always;"></div>
          <Skills />
        </v-responsive>
      </v-container>
    </v-main>
    <v-footer>
      <v-container>
        <div class="text-center text-caption">
          © {{ new Date().getFullYear() }} Dennis Cappel
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import resumeData from './assets/resume.json'
import PersonalDetails from './components/PersonalDetails.vue'
import Profile from './components/Profile.vue'
import WorkHistory from './components/WorkHistory.vue'
import Skills from './components/Skills.vue' // Fixed casing

provide('resumeData', resumeData)

const skillsView = ref<'level' | 'experience'>('level')

// Dark mode functionality
const isDarkMode = ref(false)
const isPrinting = ref(false)

// Placeholder function for PDF export
const exportToPdf = () => {
  // Set a custom filename in the document title
  const originalTitle = document.title;
  document.title = `Resume_Dennis_Cappel_${new Date().toISOString().slice(0, 10)}`;

  // Set printing mode
  isPrinting.value = true;
  setTimeout(() => {
    window.print()
    isPrinting.value = false
  }, 1000)
}

// Provide theme mode to components if needed
provide('isDarkMode', isDarkMode)
</script>
