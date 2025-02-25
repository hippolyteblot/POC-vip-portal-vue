<script setup lang="ts">
import { ref } from 'vue';

interface Execution {
  id: number;
  app: string;
  status: 'En cours' | 'Terminé' | 'Échec';
}

const executions = ref<Execution[]>([
  { id: 1, app: 'App A', status: 'En cours' },
  { id: 2, app: 'App B', status: 'Terminé' },
  { id: 3, app: 'App C', status: 'Échec' },
]);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Monitoring des exécutions</h1>
    <table class="table-auto w-full mt-4 border-collapse border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">ID</th>
          <th class="border p-2">Application</th>
          <th class="border p-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exec in executions" :key="exec.id">
          <td class="border p-2">{{ exec.id }}</td>
          <td class="border p-2">{{ exec.app }}</td>
          <td class="border p-2" :class="{
            'text-green-600': exec.status === 'Terminé',
            'text-yellow-600': exec.status === 'En cours',
            'text-red-600': exec.status === 'Échec'
          }">
            {{ exec.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
