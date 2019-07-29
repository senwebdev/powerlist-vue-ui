<template>
  <div id="app" class="app">
    <transition name="router" mode="out-in">
      <router-view class="view router-view" />
    </transition>
  </div>
</template>


<script>
import Vue from 'vue';

export default Vue.extend({
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e0e4e5;
}
</style>
