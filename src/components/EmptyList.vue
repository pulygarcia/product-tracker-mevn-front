<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="d-flex flex-column justify-space-center align-center mt-10 ga-1">
    <div class="container">
      <div class="folder">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
      <div class="title">List is empty, start adding products in <RouterLink :to="{name: 'control-panel'}">Control</RouterLink></div>
    </div>
  </div>
</template>

<style scoped>
    .container {
  width: fit-content;
  gap: 10px
}

.folder {
  width: min-content;
  margin: auto;
  animation: float 2s infinite linear;
}

.folder .top {
  background-color: #FF8F56;
  width: 60px;
  height: 12px;
  border-top-right-radius: 10px;
}

.folder .bottom {
  background-color: #FFCE63;
  width: 100px;
  height: 70px;
  box-shadow: 5px 5px 0 0 #283149;
  border-top-right-radius: 8px;
}

.container .title {
  font-size: .9em;
  color: #283149;
  text-align: center;
  margin-top: 15px;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-25px);
  }

  100% {
    transform: translatey(0px);
  }
}
</style>