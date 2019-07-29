<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    list: {
      type: Object,
      default: null,
    }
  },
  data: () => {
    return {
      fields: [
        'Account Name', 'City', 'Status', 'Accout Type', 'Email', 'Location Type',
      ],
      favorite: false,
      form: {
        listName: '',
        listDescription: ''
      },
    };
  },
  computed: {
    ...mapGetters([
      'allList',
    ]),
    listNameState () {
      if (this.list) {
        return (this.allList.find(list => (list.id !== this.list.id) && (list.name === this.form.listName)) === undefined)
      }
      return (this.allList.find(list => list.name === this.form.listName) === undefined) 
    }
  },
  watch: {
    list(value) {
      if (value) {
        this.form.listName = value.name;
        this.form.listDescription = value.description;
      }
    }
  },
};
</script>

<template>
  <div>
    <VLayout flex style="margin-top: 16px; min-height: 360px;">
      <VFlex sm7>
        <b-form>
          <b-form-group label="Name of the List*" description="" :style="{color: listNameState ? '': '#dc3545'}">
            <b-form-input v-model="form.listName"
                          type="text"
                          placeholder="List Name"
                          :state="listNameState"
            />
            <b-form-invalid-feedback id="inputLiveFeedback">
              Sorry, there is a list with same name. Please try another
            </b-form-invalid-feedback>
            <b-form-text v-if="listNameState" id="inputLiveHelp">
              *This is a mandatory field
            </b-form-text>
          </b-form-group>
          <b-form-group label="List Description">
            <b-form-textarea v-model="form.listDescription"
                             type="text"
                             required
                             :rows="4"
            />
          </b-form-group>
        </b-form>
      </VFlex>
      <VFlex sm5 class="text-xs-center" style="padding: 32px 0;">
        <div style="width: max-content; margin: auto;">
          <h3 class="text-xs-left">
            Visibility
          </h3>
          <VBtnToggle mandatory>
            <VBtn flat class="icon-btn">
              <VLayout flex column>
                <i class="fa fa-users"/>
                Public
              </VLayout>
            </VBtn>
            <VBtn flat class="icon-btn">
              <VLayout flex column>
                <i class="fa fa-key"/>
                Private
              </VLayout>
            </VBtn>
          </VBtnToggle>
          <VLayout flex column style="margin: 32px auto;">
            <VTooltip top>
              <VBtn slot="activator" flat icon style="align-self: center;" @click="favorite = !favorite">
                <VIcon v-if="favorite" color="#FCAB11">
                  star
                </VIcon>
                <VIcon v-else>
                  star
                </VIcon>
              </VBtn>
              <span>Click to set the list as Favorite</span>
            </VTooltip>
            <p >{{ favorite ? 'Marked': 'Mark' }} as Favorite</p>
          </VLayout>
        </div>
      </VFlex>
    </VLayout>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  h3 {
    color: #31455E;
  }
  .input-classic {
    padding: 16px 0 !important;
    .v-input__slot {
      border: 1px solid #DDDDDD;
    }
  }
  .icon-btn {
    height: 40px;
    width: 96px !important;
    color: #283953 !important;
    background: #F3F7FF !important;
    opacity: 1 !important;
  }
  .icon-btn.v-btn--active {
    color: white !important;
    background-color: #20C0F4 !important;
  }
  
</style>
