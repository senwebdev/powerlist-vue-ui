<script>
import Switches from 'vue-switches';

import Opportunity from './opportunity.vue';
import RelatedArea from './related-area.vue';

export default {
  components: {
    Opportunity, Switches, RelatedArea,
  },
  data: () => {
    return {
      isAllRecords: true,
      accountNames: ['First Name', 'Last Name', 'Account', 'Work Phone', 'Mobile Phone', 'Email'],
      relatedObjects: [
        { text: 'Opportunity', disabled: true },
        { text: 'Industry', disabled: false },
        { text: 'Sector', disabled: false },
        { text: 'Estimates', disabled: false },
        { text: 'General Contractors', disabled: false },
        { text: 'Key Staffs', disabled: false },
      ],
      objects: [
        {
          name: 'Opportunity',
          fields: [
            {
              name: 'Account',
              condition: 'Equal To',
              value: 'AB',
              operator: 'and'
            }
          ],
          panel: [true],
        }
      ]
    };
  },
  methods: {
    onAddField(index, event) {
      event.preventDefault();
      event.stopPropagation();

      this.objects[index].fields.push({
          operator: 'and',
          name: 'First Name',
          condition: 'Equal To',
          value: '',
      });
    },
    addRelativeObject(obj, index) {
      this.objects.push({
        name: obj.text,
        fields: Object.assign([], this.objects[0].fields), // copy search conditions from parent
        panel: [true],
      })
      this.relatedObjects[index].disabled = true;
    },
    updateCondition(i, j, condition) {
      Object.assign(this.objects[i].fields[j], condition)
    },
    removeCondition(i, j) {
      if (i < this.objects.length) {
        if (j === -1) { // remove the related object
          this.objects.splice(i, 1)
          this.relatedObjects[i].disabled = false;
        } else if (j < this.objects[i].fields.length) {
            this.objects[i].fields.splice(j, 1)
        }
      }
    },
  },
};
</script>

<template>
  <div class="search-fields">
    <VLayout flex style="margin: 16px 0;">
      <RelatedArea :relatedObjects="relatedObjects" :onAdd="addRelativeObject"/>
      <VSpacer />
      <div>
        <span style="height: 40px">
          All Records I see
        </span>
        <Switches v-model="isAllRecords" class="switch-records" type-bold="true" />
        <span style="color: gray;">
          All Records I Own
        </span>
      </div>
    </VLayout>
    <div v-for="(obj, index) in objects" :key="index">
      <VLayout flex column>
        <VExpansionPanel expand :value="obj.panel">
          <VExpansionPanelContent style="background: #FAFBFD !important;">
            <VLayout slot="header">
              <VFlex xs5>
                <h3 class="opp-header">
                  {{ obj.name }}
                </h3>
              </VFlex>
              <VFlex xs6 class="text-xs-right">
                <VBtn flat color="#20C0F4" class="capitalize" @click="onAddField(index, $event)">
                  <VIcon>add_circle</VIcon>
                  Add Another Field
                </VBtn>
              </VFlex>
              <VFlex v-if="index!=0" xs1 class="text-xs-right">
                <VBtn 
                  flat 
                  icon
                  @click="removeCondition(index, -1)"
                >
                  <VIcon color="#D8DBE4">
                    clear
                  </VIcon>
                </VBtn>
              </VFlex>
            </VLayout>
            <VCard>
              <Opportunity v-for="(field, j) in obj.fields" 
                           :key="j" 
                           :isDefault="j==0" 
                           :where="field" 
                           @onRemove="removeCondition(index, j)"
                           @onUpdate="updateCondition(index, j, $event)"
              />
            </VCard>
          </VExpansionPanelContent>
        </VExpansionPanel>
      </VLayout>
      <br>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.opp-header {
  color: #32465F;
  font-weight: 100;
}
.opp-header.activated {
  color: #23497A;
  font-weight: 600;
}
</style>

<style lang="scss">
.switch-records {
  margin: 0 8px;
  >div {
    top: 8px;
    background-color: #aaa !important;
  }
  >div::after {
    background-color: white !important;
  }
}
.switch-records.vue-switcher--unchecked {
  >div {
    background-color: #20C0F4 !important;
  }
}
.capitalize {
  text-transform: capitalize !important;
}
.search-fields {
  .v-card {
    background-color: transparent;
  }
}
</style>
