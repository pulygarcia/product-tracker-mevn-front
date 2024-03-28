<script setup>
import { RouterView } from 'vue-router'
import SideBar from './components/Sidebar.vue'
</script>

<template>
  <div class="d-md-flex h-screen ga-5">
    <SideBar />

    <RouterView />
  </div>
</template>

<style scoped>
  
</style>
