<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data: () => {
    return {
      selectedIndex: 26, // All
      labels: [],
      extras: [''],
      extraLabel: '',
    };
  },
  computed: {
    ...mapGetters([
      'filterKey',
    ]),
  },
  watch: {
    filterKey(val) {
      let index = this.labels.indexOf(val);
      if (index === -1) {
        this.selectedIndex = 27;
      } else if (index >= 0 && this.selectedIndex !== index) {
        this.selectedIndex = index;
      }
    },
  },
  beforeMount() {
    for (let i = 0; i < 26; i++) {
      this.labels.push(String.fromCharCode(65 + i));
    }
    this.labels.push('All');
    this.extras = [];
    for (let i = 0; i < 10; i++) {
      this.extras.push(`${i}`);
    }
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    this.extras = [...this.extras, ...symbols];
  },
  methods: {
    onClickFilter(key, special=false) {
      this.$store.dispatch('setFilterKey', {key});
      this.extraLabel = special ? key : '';
    },
  },
});
</script>

<template>
  <div class="alphabet">
    <VBtnToggle v-model="selectedIndex" class="list" mandatory>
      <VBtn
        v-for="(label, index) in labels"
        :key="index"
        :value="index"
        :class="{'selected': selectedIndex==index}"
        flat
        @click="onClickFilter(label)"
      >
        {{ label }}
      </VBtn>
      <VMenu offset-y>
        <VBtn
          slot="activator"
          class="btn-more"
          flat
          dark
        >
          <VIcon v-if="selectedIndex <= 26" class="btn-icon">
            more_horiz
          </VIcon>
          <span v-if="selectedIndex > 26">
            &nbsp;{{ extraLabel }}
          </span>
          <VIcon class="btn-icon">
            arrow_drop_down
          </VIcon>
        </VBtn>
        <VList class="symbol-menu">
          <VListTile v-for="(item, index) in extras" :key="index" class="symbol" @click="onClickFilter(item, true)">
            <VListTileTitle>{{ item }}</VListTileTitle>
          </VListTile>
        </VList>
      </VMenu>
    </VBtnToggle>
  </div>
</template>


<style lang="scss" scoped>
.alphabet {
  margin: 16px 0;
}
.list {
  box-shadow: none;
  button {
    min-width: 21px;
    height: 18px;
    font-size: 10px;
    padding: 0;
    margin: 0;
    font-weight: 100;
    color: black;
    text-transform: capitalize;
    border: 1px solid #DDDDDD;
    opacity: 1;
  }
  button.selected {
    color: white;
    background: #20C0F4;
  }
}
.symbol-menu {
  display: flex;
  padding: 2px;
}
</style>
<style lang="scss">
.menuable__content__active {
  border: 1px solid rgba(0,0,0,.05);
  -webkit-box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
  -moz-box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
  box-shadow: 0px 4px 22px -2px rgba(32,192,244,1);
}
.btn-more {
  padding: 0 4px !important;
  background: white !important;
  border: 1px solid #DDDDDD !important;
  .v-btn__content {
    font-size: 11px;
    margin-top: -1px;
    span+.v-icon {
      margin-left: 0 !important;
    }
  }
  i {
    font-size: 16px;
    height: 18px;
  }
}
.btn-more.v-btn--active {
  background: #20C0F4 !important;
}
.btn-more::before {
  background: transparent !important;
}
.symbol {
  &:first-child {
    border-left: 1px solid #DDDDDD;  
  }
  border-top: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
  .v-list__tile--link {
    height: 24px;
    width: 21px;
    padding: 0;
  }
  .v-list__tile__title {
    font-size: 12px;
    text-align: center;
  }
}
</style>
