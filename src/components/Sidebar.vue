<script setup>
    import {RouterLink, useRoute} from 'vue-router'

    const route = useRoute();
</script>

<template>
  <v-card class="md-w-25 bg-indigo-darken-2 rounded-0 pa-3" :class="route.path == '/control' ? 'bg-grey-darken-4' : ''">
    <span class="text-blue-grey-lighten-2 mt-3 text-subtitle-2">Made by Puly</span>
      <h1 class="text-h5 font-weight-bold py-1">{{route.path == '/control' ? 'Control Panel' : 'Product Tracker app'}}</h1>
      <v-divider></v-divider>

      <div class="d-flex flex-column mt-6 ga-4">
        <RouterLink :to="{name: 'home'}" class="text-decoration-none">
            <v-btn class="d-flex font-weight-bold text-white w-100" :class="route.path == '/control' ? 'bg-red-lighten-1' : 'bg-indigo-lighten-1'">
                <span>Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20px">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </v-btn>
        </RouterLink>

        <RouterLink :to="{name: 'new-product'}" class="text-decoration-none">
            <v-btn class="d-flex font-weight-bold text-white w-100" :class="route.path == '/control' ? 'bg-red-lighten-1' : 'bg-indigo-lighten-1'">
                <span>New product</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  width="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </v-btn>
        </RouterLink>
        
        <RouterLink :to="{name: 'control-panel'}" class="text-decoration-none">
            <v-btn class="d-flex  font-weight-bold text-white w-100" :class="route.path == '/control' ? 'bg-red-lighten-1' : 'bg-indigo-lighten-1'">
              <span>Control</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
              </svg>
            </v-btn>
        </RouterLink>
      </div>
    </v-card>
</template>

<style scoped>
    @media (min-width: 960px){
      .md-w-25{
        width: 300px;
      }
  }
</style>