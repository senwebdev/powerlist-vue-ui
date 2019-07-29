<script>
import ToggleButton from 'vue-js-toggle-button/src/Button';

export default {
  components: { ToggleButton },
  props: {
    isDefault: {
      type: Boolean,
      default: false
    },
    where: {
      type: Object,
      default: () => {
        return {
          operator: 'and',
          name: 'First Name',
          condition: 'Equal To',
          value: '',
          }
      }
    }
  },
  data: () => {
    return {
      title: 'Create New List',
      fieldItems: ['First Name', 'Last Name', 'Account', 'Work Phone', 'Mobile Phone', 'Email'],
      conditionItems: ['Equal To', 'Contains', 'Starts With', 'Ends With'],
      valueItems: ['AB'],

      field: '',
      condition: '',
      value: '',
      andOr: false,
    };
  },
  watch: {
    where (value) {
      this.andOr = value['operator'] === 'and';
      this.field = value['name'];
      this.condition = value['condition'];
      this.value = value['value'];
    }
  },
  mounted() {
    this.andOr = this.where['operator'] === 'and';
    this.field = this.where['name'];
    this.condition = this.where['condition'];
    this.value = this.where['value'];
  },
  methods: {
    onChangeValueType(e) {

    },
    onChange() {

    },
    updateCondition() {
      this.$emit('onUpdate', {
        operator: this.andOr ? 'and' : 'or',
        name: this.field,
        condition: this.condition,
        value: this.value,
      })
    },
    removeCondition() {
      this.$emit('onRemove')
    },
  },
};
</script>

<template>
  <VLayout flat flex row class="card">
    <ToggleButton
      v-model="andOr"
      :width="70"
      :height="30"
      :value="true"
      :sync="true"
      :labels="{checked: 'And', unchecked: 'Or'}"
      class="switch-logic"
      :class="{hidden: isDefault}"
      :disabled="isDefault"
      @change="updateCondition"
    />
    <VSpacer class="mini-space" />
    <div>
      <span class="text-label">
        Fields
      </span>
      <VSelect
        v-model="field"
        :items="fieldItems"
        class="select-oportunity"
        solo
        @change="updateCondition"
      />
    </div>
    <VSpacer class="mini-space" />
    <div>
      <span class="text-label">
        Condition
      </span>
      <VSelect
        v-model="condition"
        :items="conditionItems"
        class="select-oportunity"
        solo
        @change="updateCondition"
      />
    </div>
    <VSpacer class="mini-space" />
    <div>
      <span class="text-label">
        Value
      </span>
      <VTextField
        v-model="value"
        class="select-oportunity"
        solo
        @change="updateCondition"
      />
    </div>
    <VSpacer />
    <VBtn 
      flat 
      icon
      @click="removeCondition"
    >
      <VIcon color="#D8DBE4">
        clear
      </VIcon>
    </VBtn>
  </VLayout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.switch-logic {
  margin: 0 0 0 24px;
  height: 30px;
  .v-switch-core {
    background: #23497A !important;
    border: 1px solid #079DCF;
  }

  .v-switch-label {
    margin: 0 8px !important;
  }
}
.switch-logic.toggled {
  height: 30px;
  .v-switch-core {
    background: #20C0F4 !important;
  }
}

</style>

<style lang="scss" scoped>
.mini-space {
  max-width: 64px;
}
.hidden {
  opacity: 0 !important;
}
.text-label {
  color: #B0B4BF;
}
.select-oportunity {
  width: 204px; 
  // background-color: white;
}
.v-card {
  background-color: transparent;
}
.card {
  background-color: #FAFBFD !important;
  align-items: center;
  margin: 10px 0;
  border-width: 0;
  border-left: 6px solid #20C0F464;
  border-radius: 0;
  &:hover{
    border-left: 6px solid #20C0F4;
  }
  height: 90px;
}

</style>
