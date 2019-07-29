<script>
import Vue from 'vue';

export default Vue.extend ({
  methods: {
    newList() {
      this.$router.push('/list/new-list');
    },
  }
});
</script>

<template>
  <VLayout column align-center style="padding: 144px 0;">
    <h3 class="title-empty">
      Please Click Here to Create a New List
    </h3>
    <br>
    <VBtn class="btn-new-list text-capitalize" @click="newList">
      <VIcon>assignment</VIcon>&nbsp;
      Create New List
    </VBtn>
  </VLayout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.title-empty {
  margin: 0;
  line-height: 39px;
  background: white;
}
.btn-new-list {
  padding-left: 0;
  box-shadow: none !important;
  min-height: 40px;
  border-radius: 6px;
  overflow: hidden;
  color: #2E4766;
  border: 1px solid #20C0F4;
  width: fit-content;
  .v-icon {
    height: 38px;
    color: white !important;
    padding: 0 7px;
    background: #20C0F4
  }
}
</style>
