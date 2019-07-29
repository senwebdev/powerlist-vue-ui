import Vue from 'vue';
import Vuex from 'vuex';
import Fuse from 'fuse.js';
import axios from 'axios';

import {StaticData} from './static_data.js';

Vue.use(Vuex);

function url(resource) {
  const REST_URL = process.env.VUE_APP_REST_URL;
  return `${REST_URL}/${resource}`;
}

function getToken() {
  return process.env.VUE_APP_AUTH_TOKEN;
}

function authHeaders() {
  return { headers: { authorization: getToken() } };
}

function getData(resource, args, headers) {
  if (process.env.VUE_APP_USE_STATIC === "yes") {
    return Promise.resolve({data: StaticData[resource]})
  }
  return axios.post(url(resource), args, headers)
}

export default new Vuex.Store({
  state: {
    filterKey: 'All',
    searchKey: '',
    search: (list, key) => {
      if (!key) {
        return list;
      }
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'name',
        ],
      };
      const fuse = new Fuse(list, options); // "list" is the item array
      return fuse.search(key);
    },
    filter: (list, key) => {
      if (key === 'All') {
        return list;
      }
      return list.filter((item) => {
        return item.name.toLowerCase().startsWith(key.toLowerCase());
      });
    },
    allList: undefined,
    listDetails: undefined,
    listPage: undefined,
    error:undefined
  },
  mutations: {
    refreshLists(state, payload) {
      state.allList = [...payload.lists];
    },
    errorReceived(state, payload) {
      state.error = payload;
    },
    setSearchKey(state, payload) {
      state.searchKey = payload.key;
    },
    setFilterKey(state, payload) {
      state.filterKey = payload.key;
    },
    updateLike(state, payload) {
      state.allList.map((data) => {
        if (data.id === payload.index) {
          data.favorite = !data.favorite;
        }
      });
      state.allList = [...state.allList];
    },
    deleteList(state, payload) {
      const items = state.allList.filter((item) => item.id === payload.index);
      if (items.length > 0) {
        state.allList.splice(state.allList.indexOf(items[0]), 1);
      }
    },
    changeVisiblity(state, payload) {
      state.allList.map((data) => {
        if (data.id === payload.index && data.owner === 'John Doe') {
          if (data.visibility === 'private') {
            data.visibility = 'public';
          } else {
            data.visibility = 'private';
          }
        }
      });
      state.allList = [...state.allList];
    },
    resetSearch(state, payload) {
      state.searchKey = '';
      state.filterKey = 'All';
    },
    getListDetails(state, payload) {
      console.log("Got list details", payload);
      state.listDetails = payload;
    },
    getListPage(state, payload) {
      state.listPage = payload;
    }
  },
  actions: {
    refreshLists({commit}) {
      getData('lists', {}, { ...authHeaders() })
        .then(result => commit('refreshLists', result.data))
        .catch(error => {
          console.log(error);
          commit(
            'errorReceived',
            'Error loading lists, refresh to try again');
        })
    },
    setSearchKey({commit}, payload) {
      commit('setSearchKey', payload);
    },
    setFilterKey({commit}, payload) {
      commit('setFilterKey', payload);
    },
    updateLike({commit}, payload) {
      commit('updateLike', payload);
    },
    deleteList({commit}, payload) {
      commit('deleteList', payload);
    },
    changeVisiblity({commit}, payload) {
      commit('changeVisiblity', payload);
    },
    resetSearch({commit}, payload) {
      commit('resetSearch', payload);
    },
    getListDetails({commit}, payload) {
      console.log("Get list details with params", payload);
      getData('list', { ...payload }, { ...authHeaders() })
        .then(result => commit('getListDetails', result.data))
        .catch(error => {
          console.log(error);
          commit(
            'errorReceived',
            'Error loading list details, refresh to try again');
        })
    },
    getListPage({commit}, payload) {
      getData('view', { ...payload }, { ...authHeaders() })
        .then(result => commit('getListPage', result.data))
        .catch(error => {
          console.log(error);
          commit(
            'errorReceived',
            'Error loading list records, refresh to try again');
        })
    }
  },
  getters: {
    listPage: (state) => {
      let result = state.search(state.listPage, state.searchKey);
      result = state.filter(result, state.filterKey);
      return result;
    },
    listDetails: (state) => {
      return state.listDetails;
    },
    allList: (state) => {
      let result = state.search(state.allList, state.searchKey);
      result = state.filter(result, state.filterKey);
      return result;
    },
    error: (state) => {
      return state.error;
    },
    searchKey: (state) => {
      return state.searchKey;
    },
    filterKey: (state) => {
      return state.filterKey;
    },
    allSuggestions: (state) => {
      return state.allList.map(item => item.name);
    },
  },
});
