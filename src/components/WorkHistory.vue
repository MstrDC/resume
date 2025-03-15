<template>
  <v-sheet class="mb-8">
    <h2 class="text-h4 mb-4 pa-4">Work Experience</h2>
    <v-timeline>
      <v-timeline-item v-for="(company, index) in experience" :key="index" dot-color="primary" size="small">
        <v-card>
          <v-card-title>{{ company.company }}</v-card-title>
          <v-card-text>
            <div v-for="(position, pIndex) in company.positions" :key="pIndex">
              <h4 class="text-h6">{{ position.title }}</h4>
              <v-chip size="small" class="mb-2">
                {{ position.since }} - {{ position.until || 'Present' }}
              </v-chip>
              <p>{{ position.description }}</p>
              <v-divider v-if="pIndex < company.positions.length - 1" class="my-2" />
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
  experience: Array<{
    company: string
    since: string
    until: string
    positions: Array<{
      title: string
      since: string
      until: string
      description: string
    }>
  }>
}>()
</script>
