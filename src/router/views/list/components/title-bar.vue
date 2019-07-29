
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'searchKey',
    ]),
  },
  methods: {
    onBackSearch() {
      this.$store.dispatch('setSearchKey', {key: ''});
    }
  }
});
</script>

<template>
  <VToolbar color="white" height="75" style="margin-top: 2px">
    <i v-if="showIcon" class="fa fa-users" style="color: gray;"/>
    <h3 v-if="searchKey == ''" class="title-area">
      &nbsp;{{ title }}&nbsp;
    </h3>
    <h3 v-else>
      <VBtn flat icon style="color: #BDBCCA !important;" @click="onBackSearch">
        <i class="fa fa-arrow-left" />
      </VBtn>
      <span style="color: #BDBCCA !important;">
        Result for:
      </span>"{{ searchKey }}"
    </h3>
    <i v-if="showIcon" class="fa fa-star" style="color: #FCAB11;"/>
    <VSpacer />
    <slot />
  </VToolbar>
</template>

<style lang="scss" scoped>

.title-area {
  margin: 0;
  line-height: 39px;
  background: white;
}
.line {
  height: 28px;
  background: #ebecee;
  max-width: 1px;
}

</style>
