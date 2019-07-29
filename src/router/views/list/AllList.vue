<script>
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import { mapGetters } from 'vuex';

import Layout from '@/router/layouts/main.vue';
import HeaderBar from './components/header-bar.vue';
import TitleBar from './components/title-bar.vue';
import Alphabet from './components/alphabet.vue';
import Pagination from './components/pagination.vue';
import EmptyList from './components/empty-list.vue';

export default Vue.extend({
  components: {
    Layout, HeaderBar, TitleBar, Alphabet, AgGridVue, Pagination, EmptyList
  },
  data: () => {
    return {
      openDeleteConfirm: false,
      selectedId: -1,
      currentPage: 0,
      pageLimit: 25,
      title: 'All Available Lists',
      showingData: [],
      columnDefs: [
        {
          headerName: 'List Name',
          field: 'name',
          cellRenderer: (params) => {
            return `<a href='#/list/my-list/${params.data.id}'>${params.value}<a/>`;
          },
        }, {
          width: 130,
          headerName: 'Visibility',
          field: 'visibility',
          cellRenderer: (params) => {
            let style;
            if (params.data.owner === 'John Doe') {
              style = 'color: black';
            } else {
              style = 'color: gray';
            }
            return `<div style="text-align: center; width: 98px; ${style}"><i class="fa fa-${
              params.value === 'public' ? 'users' : 'lock'
            }"/></div>`;
          },
        }, {
          width: 130,
          headerName: 'Favorite',
          field: 'favorite',
          cellRenderer: (params) => {
            return `
            <div style="width: 98px; cursor: pointer; text-align: center; color:${
              params.value ? '#FCAB11' : 'grey'
            }">
              <i class="fa fa-star"></i>
            </div>
            `;
          },
        },
        { width: 154, headerName: 'Last Modified', field: 'modifiedBy' },
        { width: 154, headerName: 'Date Created', field: 'createdDate' },
        { width: 154, headerName: 'Created by', field: 'createdBy', sort: 'asc' },
        {
          width: 279,
          headerName: 'List description',
          field: 'description',
          valueFormatter: (params) => {
            return global._.truncate(params.value, {length: 100});
          },
          tooltip: (params) => params.valueFormatted ? params.valueFormatted : params.value,
          cellRenderer: (params) => {
            return `<div class="description">${params.value}</div>`;
          }
        },
        {
          width: 100,
          headerName: 'Actions',
          field: 'actions',
          cellRenderer: (params) => {
            let status = 'enabled';
            let titleDel = "Remove This List";
            let titleEdit = "Edit This List";
            if (params.data.owner !== 'John Doe') {
              status = 'disabled';
              titleDel = titleEdit = "You Don't Have Access to this List";
            }
            return `
              <div class="cell-actions ${status}">
                <i style="cursor: pointer;" class="fa fa-times" title="${titleDel}"></i>
                &nbsp;
                <i style="cursor: pointer;" class="fa fa-edit" title="${titleEdit}"></i>
              </div>
            `;
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'allList',
      'error',
    ]),
  },
  watch: {
    allList() {
      this.updateData();
    },
    'error'() {
      this.updateData();
    }
  },
  beforeMount() {
    this.updateData();
  },

  methods: {
    agreeDelete() {
      this.openDeleteConfirm = false;
      if (this.selectedId < 0) {
        return;
      }
      this.$store.dispatch('deleteList', {index: this.selectedId});
      this.selectedId = -1;
    },
    onCellClicked(e) {
      const id = e.data.id;
      switch (e.colDef.field) {
        case 'favorite':
          this.$store.dispatch('updateLike', {index: id});
          break;
        case 'actions':
          if (e.data.owner !== 'John Doe') {
            return;
          }
          if (e.event.target.classList.contains('fa-times')) {
            this.openDeleteConfirm = true;
            this.selectedId = id;
          }
          if (e.event.target.classList.contains('fa-edit')) {
            this.$router.push('/list/edit/' + id);
          }
          break;
        case 'visibility':
          if (e.event.target.classList.contains('fa')) {
            this.$store.dispatch('changeVisiblity', {index: id});
          }
          break;
      }
    },
    updateData() {
      this.loading = false;
      if (this.allList === undefined) {
        if (this.error === undefined) {
          this.$store.dispatch('refreshLists');
          this.loading = true;
        }
        this.showingData = [];
        this.totalLists = 0;
        return;
      }
      this.showingData = this.allList.slice(this.currentPage * this.pageLimit,  (this.currentPage + 1) * this.pageLimit);
      this.totalLists = this.allList.length;
    },
    changeLimit(limit) {
      this.pageLimit = limit;
      this.updateData();
    },
    changePage(step) {
      let newPage = this.currentPage + step;
      if (newPage < 0) {
        newPage = 0;
      }
      const maxPage = Math.ceil(this.allList.length / this.pageLimit);
      if (newPage > maxPage) {
        newPage = maxPage;
      }
      if (this.currentPage !== newPage) {
        this.currentPage = newPage;
        this.updateData();
      }
    },
  },
});
</script>

<template>
  <Layout>
    <!-- <b-btn v-b-tooltip.hover title="I'm a tooltip!">Hover Me</b-btn> -->
    <HeaderBar :showNewBtns="true"/>
    <div class="available">
      <TitleBar :title="title"/>
      <div class="content-area">
        <div v-if="loading">
          Loading...
        </div>
        <div v-if="error">
          {{ error }}
        </div>
        <div class="pagination-header">
          <Alphabet/>
          <VSpacer />
          <Pagination
            :totalCount="totalLists"
            :currentPage="currentPage"
            :limit="pageLimit"
            :changeLimit="changeLimit"
            :changePage="changePage"
          />
          <p style="margin: 0 0 0 10px;">
            <b>Page: {{ currentPage + 1 }}</b> of {{ Math.ceil(totalLists / pageLimit) }}
          </p>
        </div>
        <template v-if="showingData.length > 0">
          <AgGridVue
            rowHeight="70"
            :style="`width: 100%; height: 62vh;`"
            class="ag-theme-balham"
            :columnDefs="columnDefs"
            :rowData="showingData"
            :enableSorting="true"
            :cellClicked="onCellClicked"
          />
        </template>
        <template v-else>
          <EmptyList />
        </template>
      </div>
    </div>
    <VDialog v-model="openDeleteConfirm" persistent max-width="400">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <VCard>
        <VCardTitle class="headline" style="display: block; text-align: center;">
          Are you sure you want to&nbsp;<b>Delete</b>
        </VCardTitle>
        <VCardActions>
          <VSpacer />
          <VBtn outline class="btn-calcel capitalize" @click="openDeleteConfirm = false">
            Cancel
          </VBtn>
          <VBtn color="error" class="btn-delete" @click="agreeDelete">
            Delete
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </Layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.btn-delete {
  background: #D9544F !important;
  border-radius: 6px !important;
}
.btn-calcel {
  border-radius: 6px !important;
  border-color: #DDDDDD !important;
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
  .pagination-header {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
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
.description {
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.available {
  .content-area {
    .cell-actions {
      width: 86px;
      text-align: center;
      &.enabled {
        color: gray;
        .fa:hover {
          color: #20C0F4;
        }
      }
      &.disabled {
        color: #BBB;
      }
    }
  }
}
</style>
