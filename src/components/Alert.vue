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
    :text="message"
    :title="title"
    :type="type"
  ></v-alert>
</template>