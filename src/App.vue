<template>
  <div id="app">
    <router-view />
    <AuthView />
  </div>
</template>

<script>
import AuthView from "./views/AuthView.vue";

export default {
  components: {
    AuthView,
  },
};
</script>

<style scoped></style>
