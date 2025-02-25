<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/services/api";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = ""; // Reset errors

  if (!username.value || !password.value) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    const apiKey = await loginUser(username.value, password.value);
    
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey);
      router.push("/");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    errorMessage.value = "Identifiants incorrects.";
  }
};
</script>

<template>
  <div class="h-full flex justify-center items-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
      <h1 class="text-2xl font-bold text-center mb-4">Connexion</h1>

      <p v-if="errorMessage" class="text-red-500 text-xl mb-4 text-center">{{ errorMessage }}</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xl font-medium text-gray-700">Email</label>
          <input 
            v-model="username" 
            type="email" 
            class="border p-2 rounded w-full"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div>
          <label class="block text-xl font-medium text-gray-700">Mot de passe</label>
          <input 
            v-model="password" 
            type="password" 
            class="border p-2 rounded w-full"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button 
          type="submit" 
          class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>
