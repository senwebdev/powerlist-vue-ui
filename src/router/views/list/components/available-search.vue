<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  props: {
    showNewBtns: Boolean
  },
  data() {
    return {
        loading: false,
        model: null,
        items: [],
        search: null,
        recentSearches: [
          'My Awesome List',
          'Wordpress Website',
          'Ecommerce google analytics',
          'A public List for Opportunity',
          'Private List example',
        ],
    };
  },
  computed: {
    ...mapGetters([
      'allSuggestions',
      'searchKey',
    ]),
  },
  watch: {
    search(val) {
      val !== this.model && this.querySelections(val);
    },
    searchKey(val) {
      if (this.model !== val) {
        this.model = val;
      }
    },
  },
  mounted() {
    this.items = Object.assign([], this.recentSearches);
    this.model = this.searchKey;
  },
  methods: {
    onChange(key) {
      this.$store.dispatch('setSearchKey', {key});
    },
    querySelections(v) {
      this.loading = true;
      if (!v || v === '') {
        this.loading = false;
        this.items = Object.assign([], this.recentSearches);
      } else {
        this.loading = false;
        this.items = Object.assign([], this.allSuggestions);
      }
    },
  },
 });
</script>

<template>
  <VAutocomplete
    v-model="model"
    solo
    :items="items"
    style="max-width: 320px;"
    label="Search Available List"
    class="search-header"
    append-icon="search"
    :loading="loading"
    :search-input.sync="search"
    @change="onChange"
  >
    <VListTile slot="prepend-item" ripple class="recent-list-title">
      <VListTileTitle style="color: #A4A6B2;">
        Recent List
      </VListTileTitle>
    </VListTile>
    <VListTile v-if="model" slot="prepend-item" ripple class="recent-list-content">
      <VListTileTitle style="color: #A4A6B2;">
        {{ model }}
      </VListTileTitle>
    </VListTile>
    <VDivider
      slot="prepend-item"
      class="mt-2"
    />
  </VAutocomplete>
</template>

<style lang="scss" scoped>


</style>

<style lang="scss">
.searchMenu {
  margin-top: 40px !important;
  .v-list {
    padding: 0;
  }
  hr {
    margin: 0 !important;
  }
}
.recent-list-title {
  .v-list__tile {
    height: 16px;
  }
}
.recent-list-content {
  .v-list__tile {
    height: 30px;
  }
}
.search-header {
  width: 320px !important;
  flex-grow: unset;
  .v-input__control {
    min-height: 38px !important;
  }
  .v-input__slot {
    background: #ecf6f8 !important;
    border: 1px solid #21497A;
    padding-right: 0 !important;
    width: 292px;
    border-radius: 6px !important;
    overflow: hidden;
    margin-bottom: 0;
    .v-input__append-inner {
      min-width: 46px;
      height: 38px;
      background: #21497A;
      align-items: center;
      .v-icon {
        color: white !important;
      }
    }
  }
}
.v-select--is-menu-active {
  .v-input__slot {
    border: 1px solid #20C0F4;
    .v-input__append-inner {
      background: #20C0F4;
    }
  }
}
.v-autocomplete__content.menuable__content__active {
  border: 1px solid #20C0F4;
  -webkit-box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
  -moz-box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
  box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
}
</style>
