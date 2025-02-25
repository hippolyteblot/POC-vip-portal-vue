<template>
    <nav class="bg-gray-900 text-white p-4 shadow-md text-xl">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="nav-link flex items-center space-x-2">
                <img src="/vip-logo.png" alt="VIP Logo" class="bg-white rounded-full w-16 h-16 p-2" />
                <h1 class="text-xl font-bold">VIP Portal</h1>
            </router-link>

            <ul class="flex space-x-6">
                <li>
                    <router-link to="/" class="nav-link">Accueil</router-link>
                </li>
                <li>
                    <router-link to="/execution" class="nav-link"
                        >Lancer une exécution</router-link
                    >
                </li>
                <li>
                    <router-link to="/monitor" class="nav-link"
                        >Monitoring</router-link
                    >
                </li>
            </ul>
        </div>
    </nav>
</template>

