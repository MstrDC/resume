<template>
  <v-sheet class="mb-8">
    <h2 class="text-h4 mb-4 pa-4">Skills</h2>
    <div class="pa-4 bg-surface rounded">
      <v-row align="end" class="mb-4">
        <v-btn-toggle v-model="activeFilter" color="primary" mandatory>
          <v-btn value="all">All</v-btn>
          <v-btn value="coding">Coding</v-btn>
        </v-btn-toggle>
        <v-chip v-for="option in filterOptions()" :key="option" :color="activeFilter === option ? 'primary' : undefined"
          :variant="activeFilter === option ? 'elevated' : 'flat'" @click="activeFilter = option" class="px-4" filter>
          {{ option }}
        </v-chip>
      </v-row>
      <v-row>
        <v-col v-for="skill in getSkills()" :key="skill.name" cols="12" sm="6">
          <v-card hover elevation="2" class="mx-auto">
            <v-card-title class="pb-1">{{ skill.name }}</v-card-title>
            <v-card-text>
              <v-row align="center" no-gutters class="mb-2">
                <v-col cols="4" class="text-body-1 font-weight-medium">Skill Level:</v-col>
                <v-col>
                  <v-rating v-model="skill.level" readonly density="compact" color="amber-darken-3"
                    active-color="amber-darken-3" size="small"></v-rating>
                </v-col>
              </v-row>

              <v-row align="center" no-gutters>
                <v-col cols="4" class="text-body-1 font-weight-medium">Experience:</v-col>
                <v-col>
                  <v-chip color="primary" size="small" class="px-2">
                    {{ formatExperience(skill.since) }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { inject } from 'vue';

interface ResumeData {
  skills: Array<{
    name: string;
    category: string;
    level: number;
    since: string;
  }>;
}

const resumeData = inject('resumeData') as ResumeData;
const skills = resumeData.skills;
const activeFilter = ref('All');
const filterOptions = () => {
  const filters = ['All'];
  for (const skill of skills) {
    if (!filters.includes(skill.category)) {
      filters.push(skill.category);
    }
  }
  return filters;
}

const getSkills = () => {
  return activeFilter.value === 'All' ? skills : skills.filter(skill => skill.category === activeFilter.value);
}

const formatExperience = (since: string): string => {
  const startDate = new Date(since);
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();
  const adjustedYears = months < 0 ? years - 1 : years;
  const adjustedMonths = months < 0 ? months + 12 : months;
  return `${adjustedYears} year${adjustedYears !== 1 ? 's' : ''} ${adjustedMonths} month${adjustedMonths !== 1 ? 's' : ''}`;
};
</script>
