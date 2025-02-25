<script setup lang="ts">

const props = defineProps<{
  executions: Array<{
    identifier: string;
    name: string;
    pipelineIdentifier: string;
    startDate: number;
    status: string;
  }>;
}>();
</script>

<template>
  <div class="w-1/5 p-6 shadow-lg m-6 rounded-lg border border-blue-400 w-1/5 overflow-y-hidden">
    <h2 class="text-xl font-semibold">Exécutions récentes</h2>
    <div class="overflow-y-auto h-full overflow-x-hidden m-4">
      <div
        v-for="exec in executions"
        :key="exec.identifier"
        class="m-2 p-3 bg-white rounded-lg cursor-pointer border border-gray-300"
      >
        <div class="flex justify-between">
          <h3 class="font-bold max-w-2/3 overflow-x-hidden whitespace-nowrap">{{ exec.name }}</h3>
          <p
            :class="{
              'w-fit px-2 py-1 rounded-full text-s bg-green-100 text-green-600': exec.status === 'Finished',
              'w-fit px-2 py-1 rounded-full text-s bg-blue-100 text-blue-600': exec.status === 'Running',
              'w-fit px-2 py-1 rounded-full text-s bg-red-100 text-red-600': exec.status === 'Failed' || exec.status === 'Killed'
            }"
          >
            {{ exec.status }}
          </p>
        </div>
        <p class="text-sm text-gray-500">Date : {{ new Date(exec.startDate).toLocaleString() }}</p>
        <p>{{ exec.pipelineIdentifier }}</p>
      </div>
    </div>
  </div>
</template>
