<script setup lang="ts">
import ApplicationCard from "@/components/ApplicationCard.vue";
import { computed } from "vue";

const props = defineProps<{
  applications: Array<{ name: string; version: string; identifier: string; tags: string[] }>;
  searchQuery: string;
}>();

const filteredApplications = computed(() => {
  const query = props.searchQuery.toLowerCase();
  return props.applications.filter(
    (app) =>
      app.name.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="flex flex-wrap justify-center mt-6 gap-4 overflow-y-auto h-full overflow-x-hidden border rounded-lg p-4">
    <ApplicationCard
      v-for="app in filteredApplications.slice(0, 20)"
      :key="app.identifier"
      :title="app.name"
      :version="app.version"
      :pipeline="app.identifier"
      :tags="[app.version]"
    />
  </div>
  <p v-if="filteredApplications.length === 0" class="mt-4 text-gray-600 text-center">
    Aucune application trouvée pour "{{ searchQuery }}"
  </p>
</template>
