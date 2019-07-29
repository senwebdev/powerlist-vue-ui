<script>
import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';

export default Vue.extend({
});

</script>

<template>
  <VApp class="main-container">
    <div class="main-container">
      <div class="content">
        <slot />
      </div>
    </div>
  </VApp>
</template>

<style scoped>
.main-container {
  display: flex;
  margin: 0 10px;
  background: #f0f1f6;
}
.content {
  display: block;
  flex: auto;
}
</style>
