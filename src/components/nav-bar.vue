<script>
import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';

export default Vue.extend({
});
</script>

<template>
  <div class="navbar">
    <div class="logo">
      <VBtn flat icon color="gray">
        <VIcon>menu</VIcon>
      </VBtn>
      <img src="assets/images/logo.png">
    </div>
    <div class="menu">
      <VBtn flat icon>
        <VIcon>home</VIcon>
      </VBtn>
      <VBtn flat icon>
        <VIcon>star_border</VIcon>
      </VBtn>
      <VBtn flat icon>
        <VIcon>outlined_flag</VIcon>
      </VBtn>
      <VBtn flat icon>
        <VIcon>notification_important</VIcon>
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 69px;
  background: white;
}
.logo {
  display: flex;
  align-items: center;
  height: 100%;
  
}
.logo > img {
    height: 100%;
    display: block;
  }
.menu {
  padding: 0;
  margin: 0;
  margin-bottom: 0;
  text-align: center;
  list-style-type: none;
}
.menu > li {
  display: inline-block;
}
</style>
