<script>
import Vue from 'vue';
import SpaceLine from './space-line.vue';
import AvailableSearch from './available-search.vue';

export default Vue.extend({
  components: {SpaceLine, AvailableSearch},
  props: {
    showNewBtns: Boolean
  },
  data() {
    return {
        model: null,
    };
  },
  methods: {
    newList() {
      this.$router.push('/list/new-list');
    },
    newOpportunity() {
      this.$router.push('/list/new-object');
    },
    goHome() {
      window.location.href = process.env.BASE_URL;
    },
  },
 });
</script>

<template>
  <VToolbar color="white" height="75" style="margin-top: 2px">
    <b-navbar variant="faded" type="light" style="cursor: pointer;">
      <b-navbar-brand @click="goHome">
        <b-img src="assets/images/custom_logo.png" fluid alt="Responsive image" />
      </b-navbar-brand>
    </b-navbar>
    <VSpacer />
    <AvailableSearch />
    <VBtn v-if="showNewBtns" class="btn-new-list text-capitalize" @click="newList">
      <VIcon>assignment</VIcon>&nbsp;
      Create New List
    </VBtn>
    <SpaceLine />
    <VBtn v-if="showNewBtns" class="btn-new-opportunity text-capitalize" @click="newOpportunity">
      <VIcon>account_circle</VIcon>&nbsp;
      Create Opportunity
    </VBtn>
  </VToolbar>
</template>

<style lang="scss" scoped>
.logo-image {
  height: 100%;
}

.btn-new-opportunity, .btn-new-list {
  padding-left: 0;
  box-shadow: none !important;
  min-height: 40px;
  border-radius: 6px;
  overflow: hidden;
  color: #2E4766;
  .v-icon {
    height: 38px;
    color: white !important;
    padding: 0 7px;
  }
}
.btn-new-list {
  border: 1px solid #20C0F4;
  .v-icon {
    background: #20C0F4
  }
}
.btn-new-opportunity {
  border: 1px solid #FCAB11;
  .v-icon {
    background: #FCAB11;
  }
}
</style>
