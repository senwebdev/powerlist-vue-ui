import Vue from 'vue';
import Vuetify from 'vuetify';
import BootstrapVue from 'bootstrap-vue'

import vSelect from 'vue-select';
import ToggleButton from 'vue-js-toggle-button';

import App from './App.vue';
import store from './store';
import router from './router';

import 'vuetify/dist/vuetify.min.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { LicenseManager } from 'ag-grid-enterprise';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets'

LicenseManager.setLicenseKey(process.env.VUE_APP_AG_GRID_LICENSE_KEY);

/* globals */
global._ = require('lodash')

Vue.use(Vuetify);
Vue.use(ToggleButton);
Vue.use(BootstrapVue);
Vue.component('vue-select', vSelect);

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (window.Cypress) {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
