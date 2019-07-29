<script>

import { mapGetters } from 'vuex';

import Layout from '@/router/layouts/main.vue';
import HeaderBar from './components/header-bar.vue';
import TitleBar from './components/title-bar.vue';
import SearchField from './new/search-fields.vue';
import DisplayField from './new/display-fields.vue';
import ListInfo from './new/list-info.vue';
export default {
  components: {
    Layout, TitleBar, HeaderBar, SearchField, DisplayField, ListInfo,
  },
  data: () => {
    return {
      tab_index: 0,
      relatedObjects: ['Estimates', 'Contractor'],
      title: 'Create New List',
      accountNames: ['First Name', 'Last Name', 'Account', 'Work Phone', 'Mobile Phone', 'Email'],
      list: null,
    };
  },
  computed: {
    ...mapGetters([
      'searchKey',
    ]),
  },
  watch: {
    searchKey(val) {
      this.$router.push('/');
    },
  },
  beforeMount() {
    // check if edit mode
    if (this.$route.params.id) {
      this.$store.dispatch('getList', {id: this.$route.params.id})
        .then((response) => {
          this.list = response;
          this.title = this.list.name;
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  methods: {
    onNext() {
      this.tab_index ++;
    },
    onPrev() {
      this.tab_index --;
    },
    onCancel() {
      this.$router.push('/list/allList');
    },
    onSaveRun() {
      this.$router.push('/list/my-list');
    }
  },
};
</script>

<template>
  <Layout>
    <HeaderBar/>
    <div class="available">
      <TitleBar :title="title">
        <VBtnToggle mandatory style="margin: 0 16px;">
          <VBtn style="width: 120px;" @click="onCancel">
            Cancel
          </VBtn>
        </VBtnToggle>
        <VBtnToggle mandatory style="margin: 0 16px;">
          <VBtn class="btn-prev" :disabled="tab_index==0" @click="onPrev">
            Prev
          </VBtn>
          <VBtn v-if="tab_index < 2" class="btn-next" color="cyan" @click="onNext">
            Next
          </VBtn>
          <VBtn v-else class="btn-save" color="cyan">
            Save
          </VBtn>
        </VBtnToggle>
      </TitleBar>
      <div class="content-area">
        <VTabs v-model="tab_index" slider-color="cyan">
          <VTab class="capitalize" ripple>
            Search Fields
          </VTab>
          <VTab class="capitalize" ripple>
            Display Fields
          </VTab>
          <VTab class="capitalize" ripple>
            List Info Fields
          </VTab>
          <VTabItem>
            <SearchField />
          </VTabItem>
          <VTabItem>
            <DisplayField />
          </VTabItem>
          <VTabItem>
            <ListInfo :list="list"/>
          </VTabItem>
        </VTabs>
        <br>
        <VLayout>
          <VSpacer />
          <VBtnToggle mandatory style="margin: 0 16px;">
            <VBtn style="width: 120px;" @click="onCancel">
              Cancel
            </VBtn>
          </VBtnToggle>
          <VBtnToggle mandatory style="margin: 0 16px;">
            <VBtn class="btn-blue" style="width: 160px;" @click="onSaveRun">
              Save & Run
            </VBtn>
          </VBtnToggle>
          <VBtnToggle mandatory style="margin: 0 16px;">
            <VBtn class="btn-blue" style="width: 160px;">
              Run
            </VBtn>
          </VBtnToggle>
          <VBtnToggle mandatory style="margin: 0 16px;">
            <VBtn class="btn-prev" :disabled="tab_index==0" @click="onPrev">
              Prev
            </VBtn>
            <VBtn v-if="tab_index < 2" class="btn-next" color="cyan" @click="onNext">
              Next
            </VBtn>
            <VBtn v-else class="btn-save" color="cyan">
              Save
            </VBtn>
          </VBtnToggle>
        </VLayout>
      </div>
    </div>
  </Layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

.card {
  background-color: #FAFBFD;
}
.capitalize {
  text-transform: capitalize
}
.available {
  display: block;
  max-width: 1440px;
  padding: 28px 32px;
  margin: 0 auto;
}
.content-area {
  width: 100%;
  padding: 12px 30px;
  margin: 30px auto;
  background: white;
}

.btn-prev, .btn-next, .btn-save {
  width: 96px;
  opacity: 1
}
.btn-next, .btn-save {
  color: white !important;
}
.btn-blue {
  background-color: #21497A !important;
  color: white !important;
}
</style>

<style lang="scss">
.ag-row {
  border-bottom: 1px solid #DADADA !important;
  border-top: 1px solid #FAFAFA !important;
  height: 50px !important;
  box-shadow: -1px 2px 10px -3px rgba(0, 0, 0, 0.5);
}
.ag-root {
  border: none !important;
}
.ag-cell {
  align-items: center !important;
  display: flex !important;
}

</style>
