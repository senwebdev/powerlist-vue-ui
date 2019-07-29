<script>
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import { mapGetters } from 'vuex';
import DownloadExcel from 'vue-json-excel';

import Layout from '@/router/layouts/main.vue';
import HeaderBar from './components/header-bar.vue';
import TitleBar from './components/title-bar.vue';
import Alphabet from './components/alphabet.vue';
import Pagination from './components/pagination.vue';
import SpaceLine from './components/space-line.vue';

export default Vue.extend({
  components: {
    Layout, HeaderBar, TitleBar, Alphabet, AgGridVue, Pagination, SpaceLine, DownloadExcel,
  },
    data: () => {
    return {
      title: 'My Amazing List',
      list: null,
      showingData: [],
      currentPage: 0,
      totalPages: 0,
      pageLimit: 25,
      columnDefs: [
        { headerName: 'Opportunity Name', field: 'name' },
        { headerName: 'Opportunity Type', field: 'type' },
        { headerName: 'Industry', field: 'industry', width: 140 },
        { headerName: 'Sector', field: 'sector', width: 140 },
        { headerName: 'Estimates', field: 'estimates', width: 140 },
        { headerName: 'General Contractors', field: 'contractors', width: 180 },
        { headerName: 'Key Staffs', field: 'staffs', width: 150 },
        { headerName: 'Owner', field: 'owner', width: 150 },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'listPage',
      'listDetails'
    ]),
  },
  watch: {
    listPage() {
      this.updateData();
    },
    listDetails() {
      this.updateDetails();
    }
  },
  beforeMount() {
    this.updateDetails();
    this.updateData();
  },
  methods: {
    updateDetails() {
      const id = this.$route.params.id;
      if (id && (
          this.listDetails === undefined || this.listDetails.id !== id)) {
        if (this.error === undefined) {
          this.$store.dispatch(
            'getListDetails',
            {list_id: this.$route.params.id});
        }
        this.title = "Loading..."
        this.list = undefined;
        return;
      }
      this.title = this.listDetails.name;
      this.list = this.listDetails;
    },
    updateData() {
      this.loading = false;
      if (this.listPage === undefined) {
        if (this.error === undefined) {
          this.$store.dispatch(
            'getListPage',
            {list_id: this.$route.params.id,
             page: this.currentPage,
             page_size: this.pageLimit});
          this.loading = true;
        }
        this.showingData = [];
        this.totalPages = 0;
        return;
      }
      this.showingData = this.listPage.records;
      this.totalPages = this.listPage.total_pages;
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
      const maxPage = this.totalPages - 1;
      if (newPage > maxPage) {
        newPage = maxPage;
      }
      if (this.currentPage !== newPage) {
        this.currentPage = newPage;
        this.updateData();
      }
    },
    onEdit() {
      if (this.list) {
        this.$router.push('/list/edit/' + this.list.id)
      }
    },
    onExport(type='csv') {
      if (type === 'csv') {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += [
          Object.keys(this.showingData).join(";"),
          ...this.showingData.map(item => Object.values(item).join(";"))
        ]
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");
  
        const data = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", "export.csv");
        link.click();
      } else if (type === 'xlsx') {
      }
    },
    jsonExcelFields() {
      let jsonFields = {};
      this.columnDefs.map(col => {
        jsonFields[col.headerName] = col.field;
      });
      return jsonFields;
    },
  },
});
</script>

<template>
  <Layout>
    <HeaderBar :showNewBtns="true"/>
    <div class="mylist">
      <TitleBar :title="title" :showIcon="true">
        <VBtn class="title-btn text-capitalize" @click="onEdit">
          <VIcon>edit</VIcon>&nbsp;
          Edit List
        </VBtn>
        <SpaceLine />
        <VMenu offset-y min-width="200" left>
          <VBtn slot="activator" class="title-btn text-capitalize">
            <VIcon>get_app</VIcon>&nbsp;
            Export
          </VBtn>
          <VList subheader>
            <VSubheader style="height: 35px">
              Export as
            </VSubheader>
            <VDivider class="m-0"/>
            <VListTile style="height: 48px" @click="onExport('csv')">
              <VListTileContent >
                CSV File
              </VListTileContent>
              <VListTileAction>
                <img
                  width="20"
                  height="20"
                  src="assets/icons/csv.png"
                >
              </VListTileAction>
            </VListTile>
            <VDivider class="m-0 ml-3"/>
            <VListTile style="height: 48px" @click="onExport('xlsx')">
              <VListTileContent>
                <DownloadExcel
                  :data="showingData"
                  :fields="jsonExcelFields()"
                  name="export.xls"
                  style="width: 100%"
                >
                  Excel File
                  <img
                    width="20"
                    height="20"
                    src="assets/icons/xlsx.png"
                    style="float: right"
                  >
                </DownloadExcel>
              </VListTileContent>
              <!-- <VListTileAction>
              </VListTileAction> -->
            </VListTile>
          </VList>
        </VMenu>
      </TitleBar>
      <div class="content-area">
        <div class="pagination-header">
          <Alphabet/>
          <VSpacer />
          <Pagination
            :totalCount="totalPages * pageLimit"
            :currentPage="currentPage"
            :limit="pageLimit"
            :changeLimit="changeLimit"
            :changePage="changePage"
          />
          <p style="margin: 0 0 0 10px;">
            <b>Page: {{ currentPage + 1 }}</b> of {{ totalPages }}
          </p>
        </div>
        <h2>
          Opportunity<span class="gray-title">
            Total: 100 Records
          </span>
        </h2>
        <AgGridVue
          rowHeight="70"
          style="width: 100%; height: 58vh;"
          class="ag-theme-balham"
          :columnDefs="columnDefs"
          :rowData="showingData"
          :enableSorting="true"
        />
      </div>
    </div>
  </Layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

.mylist {
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

.gray-title {
  color: gray;
}

.title-btn {
  padding-left: 0;
  box-shadow: none !important;
  min-height: 40px;
  border-radius: 6px;
  overflow: hidden;
  color: white;
  background:#20C0F4 !important;
  .v-icon {
    height: 40px;
    color: #23497A;
    padding: 0 7px;
    background: #F3F7FF;
  }
}
</style>

