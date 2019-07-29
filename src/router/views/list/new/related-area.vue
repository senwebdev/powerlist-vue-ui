<script>

export default {
  props: {
    onAdd: {
      type: Function,
      default: () => {}
    },
    relatedObjects: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      selectedObject: '',
    };
  },
  mounted() {
    if (this.relatedObjects.length > 1) {
      this.selectedObject = this.relatedObjects[1].text;
    }
  },
  methods: {
    addObject(data) {
      let selectedIndex = this.relatedObjects.findIndex(item => (item.text === this.selectedObject));
      if (selectedIndex >= 0 && this.relatedObjects[selectedIndex].disabled === false) {
        this.onAdd(this.relatedObjects[selectedIndex], selectedIndex)
      }
    }
  }
};
</script>

<template>
  <VBtnToggle mandatory class="group-related">
    <VBtn disabled class="label-related capitalize" style="background: #F3F7FF !important; color: #8D8F9b !important;">
      Select Related Object
    </VBtn>
    <VSelect
      v-model="selectedObject"
      :items="relatedObjects"
      label="Select Related Object"
      class="select-related"
      solo
    />
    <VBtn class="capitalize btn-related" @click="addObject">
      Add Related Object
    </VBtn>
  </VBtnToggle>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.group-related {
  box-shadow: none;
}
.label-related {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 40px;
  opacity: 1 !important;
  border: 1px solid #DDDDDD;
}
.btn-related {
  background: #23497A !important;
  opacity: 1;
  color: white !important;
  padding: 0 16px !important;
  height: 40px;
  border-radius: 8px !important;
}
.capitalize {
  text-transform: capitalize;
}
</style>
<style lang="scss">
.select-related {
  width: 320px !important;
  flex-grow: unset;
  .v-input__control {
    min-height: 38px !important;
  }
  .v-input__slot {
    box-shadow: none !important;
    border: 1px solid #DDDDDD;
    padding-right: 0 !important;
    width: 292px;
    border-radius: 6px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    overflow: hidden;
    margin-bottom: 0;
    color: #32465E;
    .v-select__selections {
      color: #32465E;
    }
    .v-input__append-inner {
      min-width: 46px;
      height: 38px;
      background: #E6E6E6;
      align-items: center;
    }
  }
}

</style>
