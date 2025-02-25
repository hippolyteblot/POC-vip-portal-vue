<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import ApplicationList from "@/components/ApplicationList.vue";
import FrequentlyUsedApplications from "@/components/FrequentlyUsedApplications.vue";
import ExecutionList from "@/components/ExecutionList.vue";
import { fetchApplications, fetchExecutions } from "@/services/api";

const applications = ref([]);
const executions = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  applications.value = await fetchApplications();
  executions.value = await fetchExecutions();
});
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex h-full">
      <div class="flex-1 p-6 w-1/2 h-full overflow-y-auto">
        <h1 class="text-3xl font-bold text-center">Bienvenue sur VIP</h1>

        <div class="flex flex-col mt-4 pb-4 rounded-lg p-4 h-2/3 items-center">
          <SearchBar v-model:searchQuery="searchQuery" />
          <ApplicationList :applications="applications" :searchQuery="searchQuery" />
        </div>
        <div class="flex flex-col rounded-lg items-center">
            <FrequentlyUsedApplications :applications="applications" />
        </div>
      </div>

      <ExecutionList :executions="executions" />
    </div>
  </div>
</template>
