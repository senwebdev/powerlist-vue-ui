<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    },
    changeLimit: {
      type: Function,
      default: ()=> {}
    },
    changePage: {
      type: Function,
      default: ()=> {}
    }
  },
  data() {
    return {
    };
  },
  methods: {

  },
});
</script>

<template>
  <div class="text-xs-right">
    <label>
      Records Shown
    </label>
    <VMenu offset-y>
      <VBtn
        slot="activator"
        color="primary"
        class="btn-pagination"
        flat
        icon
      >
        {{ limit }}
        <VIcon class="btn-icon">
          arrow_drop_down
        </VIcon>
      </VBtn>
      <VList>
        <VListTile
          v-for="v in [25, 50, 100]"
          :key="v"
          class="limit-item"
          @click="changeLimit(v)"
        >
          <VListTileTitle>{{ v }}</VListTileTitle>
        </VListTile>
      </VList>
    </VMenu>

    <VBtn flat outline class="pagination-button" :disabled="currentPage == 0" @click="changePage(-1)">
      <VIcon color="#9195A1">
        keyboard_arrow_left
      </VIcon>
    </VBtn>
    <VBtn flat outline class="pagination-button" :disabled="currentPage == Math.ceil(totalCount / limit) - 1" @click="changePage(1)">
      <VIcon color="#9195A1">
        keyboard_arrow_right
      </VIcon>
    </VBtn>
  </div>
</template>

<style lang="scss" scoped>
.text-xs-right {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  label {
    margin-bottom: 0;
  }
}
.btn-pagination {
  border-radius: 0;
  background: #20C0F4;
  color: white !important;
  height: 24px;
  font-size: 12px;
  border-radius: 4px;
}
.btn-icon {
  font-size: 16px;
}
.pagination {
  -webkit-appearance: menulist;
  background: #20C0F4;
  color: white;
  margin: 0 16px;
}
.pagination-button {
  min-width: 24px;
  height: 24px;
  padding: 0;
  margin: 2px;
  background: #F2F6FF !important;
  border-color: #E9E8Ed;
  border-radius: 4px;
}
</style>
<style lang="scss">
.limit-item {
  height: 24px;
  .v-list__tile {
    padding: 0 2px;
    font-size: 12px;
    height: 24px;
  }
  .v-list__tile__title {
    text-align: center;
  }
}
</style>
