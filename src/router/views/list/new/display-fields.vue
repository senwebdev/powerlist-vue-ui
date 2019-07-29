<script>

import Draggable from 'vuedraggable'
import RelatedArea from './related-area.vue';

export default {
  components: {
    RelatedArea, Draggable,
  },
  data: () => {
    return {
      objects: [
        {
          name: 'Opportunity',
          searchKey: '',
          fields: [
            'Account Name', 'City', 'Status', 'Account Type', 'Email', 'Location Type',
          ],
          draggedFields: [ ],
          sortByItems: [
            'Account Name', 'Account Type', 'Status', 'Location Type',
          ],
          panel: [true],
        }
      ],
      relatedObjects: [
        { text: 'Opportunity', disabled: true },
        { text: 'Industry', disabled: false },
        { text: 'Sector', disabled: false },
        { text: 'Estimates', disabled: false },
        { text: 'General Contractors', disabled: false },
        { text: 'Key Staffs', disabled: false },
      ],
    };
  },
  methods: {
    onDragEnd(i, e) {
      this.objects[i].draggedFields = this.objects[i].draggedFields.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    },
    removeItem(i, j) {
      this.objects[i].draggedFields.splice(j, 1)
    },
    onCheckFields(value, i, j) {
      if (value) {
        if (this.objects[i].draggedFields.indexOf(this.objects[i].fields[j]) === -1) {
          this.objects[i].draggedFields.push(this.objects[i].fields[j])
        }
      } else {
        const removeIndex = this.objects[i].draggedFields.indexOf(this.objects[i].fields[j])
        if (removeIndex >= 0) {
          this.objects[i].draggedFields.splice(removeIndex, 1)
        }
      }
    },
    fieldChecked(i, j) {
      const draggedIndex = this.objects[i].draggedFields.indexOf(this.objects[i].fields[j])
      return draggedIndex >= 0;
    },
    addRelativeObject(obj, index) {
      this.objects.push({
        name: obj.text,
        searchKey: '',
        fields: [
          'Account Name', 'City', 'Status', 'Account Type', 'Email', 'Location Type',
        ],
        draggedFields: [ ],
        sortByItems: [
          'Account Name', 'Account Type', 'Status', 'Location Type',
        ],
        panel: [true],
      })
      this.relatedObjects[index].disabled = true;
    },
    removeRelatedObject(index) {
      if (index < this.objects.length) {
        this.objects.splice(index, 1)
        this.relatedObjects[index].disabled = false;
      }
    },
  }
};
</script>

<template>
  <div>
    <VLayout flex style="margin: 16px 0;">
      <RelatedArea :relatedObjects="relatedObjects" :onAdd="addRelativeObject"/>
    </VLayout>
    <div v-for="(obj, index) in objects" :key="index">
      <VLayout flex column>
        <VExpansionPanel expand :value="obj.panel">
          <VExpansionPanelContent style="background: #FAFBFD !important;">
            <VLayout slot="header" >
              <VFlex xs6>
                <h3 class="opp-header" style="color: #23497A; margin: 15px 0;">
                  {{ obj.name }}
                </h3>
              </VFlex>
              <VSpacer />
              <VFlex v-if="index!=0" xs1 class="remove-object">
                <VBtn 
                  flat 
                  icon
                  @click="removeRelatedObject(index)"
                >
                  <VIcon color="#D8DBE4">
                    clear
                  </VIcon>
                </VBtn>
              </VFlex>
            </VLayout>
            <VCard style="padding: 16px; background: #F4F7FC !important;">
              <VLayout flex style="background: white !important;">
                <VFlex sm4 class="left-container">
                  <VList two-line style="background: transparent; padding: 0;">
                    <VTextField v-model="obj.searchKey" solo label="Search Fields from Opportunity" class="input-opportunity"/>
                    <Draggable
                      v-model="obj.fields"
                      :options="{group:{ name:'people', pull:'clone', put:false }}"
                    >
                      <template v-for="(item, j) in obj.fields">
                        <VListTile v-if="item.indexOf(obj.searchKey)>=0" :key="j + 1" ripple class="drag-border">
                          <VListTileAction>
                            <VCheckbox :label="item" class="color-cyan" :input-value="fieldChecked(index, j)" @change="onCheckFields($event, index, j)"/>
                          </VListTileAction>
                        </VListTile>
                      </template>
                    </Draggable>
                  </VList>
                </VFlex>
                <VFlex sm8 class="right-container">
                  <VLayout style="height: 100px; padding: 16px; ">
                    <VFlex xs6>
                      <h3 style="color: #2E4765; margin: 15px 0;">
                        Selected Fields
                      </h3>
                    </VFlex>
                    <VFlex xs6>
                      <VSelect
                        :items="obj.sortByItems"
                        label="Sort By"
                        color="gray"
                        solo
                      >
                        <VIcon slot="prepend" v-b-tooltip.hover title="Select Default Sort by Field on List table">
                          help
                        </VIcon>
                      </VSelect>
                    </VFlex>
                  </VLayout>
                  <VLayout column style="padding: 8px 32px;">
                    <Draggable
                      v-model="obj.draggedFields"
                      :options="{group:{ name:'people', pull:false, put:true }}"
                      style="min-height: 400px"
                      @add="onDragEnd(index, $event)"
                    >
                      <template v-for="(item, j) in obj.draggedFields">
                        <VListTile :key="j" style="padding: 12px;" ripple class="drag-border">
                          <VListTileContent>
                            <VListTileTitle>{{ item }}</VListTileTitle>
                          </VListTileContent>
                          <VListTileAction>
                            <VBtn flat @click="removeItem(index, j)">
                              <VIcon>clear</VIcon>
                            </VBtn>
                          </VListTileAction>
                        </VListTile>
                      </template>
                    </Draggable>
                  </VLayout>
                  <p
                    v-if="obj.draggedFields.length === 0"
                    class="empty-text"
                  >
                    Nothing Selected yet.<br>Please search a Field or Add Fields from Left
                  </p>
                </VFlex>
              </VLayout>
            </VCard>
          </VExpansionPanelContent>
        </VExpansionPanel>
      </VLayout>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.remove-object{
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.right-container {
  position: relative;
  .empty-text {
    position:absolute;
    left: 35%;
    top: 50%;
    color: #31343B;
    text-align: center;
  }
}
</style>
<style lang="scss">
.input-opportunity {
  margin: 16px !important;
  .v-input__slot {
    border: 1px solid #DDDDDD;
  }
}
.color-cyan {
  .v-icon {
    color: #20C0F4 !important;
  }
}
.drag-border {
  border-top: 1px solid rgba(0,0,0,.12);
  border-bottom: 1px solid rgba(0,0,0,.12);
}
.left-container {
  label {
    margin: 0;
  }
}
</style>
