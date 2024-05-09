<script setup>
    defineProps({
        title:{
            type: String
        },
        message:{
            type: String
        },
        type:{
            type: String
        }
    })
</script>

<template>
  <v-alert
    class="fixed"
    :text="message"
    :title="title"
    :type="type"
  ></v-alert>
</template>

<style>
    .fixed{
        position: fixed;
        top: .5rem;
        right: 1rem
    }
</style>