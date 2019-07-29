<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    showButtons: {
      type: Boolean,
      default: false
    },
    onHideButtons:  {
      type: Function,
      default: ()=> {}
    },
    onShowButtons: {
      type: Function,
      default: ()=> {}
    }
  }
});
</script>

<template>
  <div class="side-bar">
    <VBtn v-if="!showButtons" icon large flat @click="onShowButtons">
      <img
        width="48"
        height="48"
        src="assets/icons/icon_side_2.png"
      >
    </VBtn>
    <VBtn v-if="!showButtons" icon large flat @click="onShowButtons">
      <img
        width="44"
        height="44"
        src="assets/icons/icon_side_1.png"
      >
    </VBtn>
    <VBtn v-if="showButtons" icon large flat @click="onHideButtons">
      <img
        width="44"
        height="44"
        src="assets/icons/icon_side_1.png"
      >
    </VBtn>
    <VBtn v-if="showButtons" icon large flat @click="onHideButtons">
      <img
        width="48"
        height="48"
        src="assets/icons/icon_side_2.png"
      >
    </VBtn>
  </div>
</template>

<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 66px;
  padding: 16px 0;
  background: #333;
}
</style>
