<template>
  <v-sheet class="mb-8">
    <h2 class="text-h3 mb-4 pa-4">{{ name }}</h2>
    <v-row>
      <v-col cols="5">
        <v-text-field prepend-icon="mdi-map-marker" variant="underlined" readonly>
          <template v-slot:default>
            <div style="white-space: pre-line; cursor: pointer" @click="openInGoogleMaps()" title="Open in Google Maps"
              class="text-decoration-none">
              {{ resumeData.address }}
            </div>
            <v-btn icon="mdi-content-copy" variant="plain" @click="copyToClipboard(resumeData.address)" size="x-small"
              density="comfortable" title="Copy address" />
          </template>
        </v-text-field>
        <v-row class="mt-1">
          <v-col>
            <v-text-field prepend-icon="mdi-steering" variant="underlined" label="Driver License"
              :model-value="resumeData.drivers_license" readonly /></v-col>
          <v-col>
            <v-text-field prepend-icon="mdi-car-back" variant="underlined" label="Has car" :model-value="resumeData.car"
              readonly /></v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col>
            <v-text-field prepend-icon="mdi-calendar" variant="underlined" label="Birth Date" readonly
              :model-value="displayBirthDate()" /></v-col>
          <v-col>
            <v-text-field prepend-icon="mdi-flag" variant="underlined" label="Nationality"
              :model-value="resumeData.nationality" readonly /></v-col>
        </v-row>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="auto">
        <v-text-field v-for="(item, index) in contactItems" :key="index" :prepend-icon="item.icon" variant="underlined"
          readonly>
          <v-btn :href="item.href" variant="text" :target="item.target" size="small" density="comfortable">
            {{ item.text }}
          </v-btn>
          <v-btn icon="mdi-content-copy" variant="plain" @click="copyToClipboard(item.text)" size="x-small"
            density="comfortable" />
        </v-text-field>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const resumeData = inject('resumeData') as {
  address: string;
  birth_date: string;
  nationality: string;
  drivers_license: string;
  car: string;
  bith_date: string;
  birth_place: string;
};
const props = defineProps<{
  name: string;
  email: string;
  phone: string;
  socials: Array<{ name: string; url: string; }>;
}>();

const contactItems = [
  { icon: 'mdi-email', text: props.email, href: `mailto:${props.email}` },
  { icon: 'mdi-phone', text: props.phone, href: `tel:${props.phone}` },
  ...props.socials.map(social => ({
    icon: `mdi-${social.name.toLowerCase()}`,
    text: social.name,
    href: social.url,
    target: '_blank'
  }))
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const openInGoogleMaps = () => {
  const encodedAddress = encodeURIComponent(resumeData.address);
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
};

const displayBirthDate = () => {
  const date = new Date(resumeData.birth_date);
  return date.toLocaleDateString() + ' (' + Math.floor((Date.now() - date.getTime()) / 31556952000) + ' years)';
};
</script>
