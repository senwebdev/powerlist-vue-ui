<script>

import Layout from '@/router/layouts/main.vue';
import HeaderBar from './components/header-bar.vue';
import TitleBar from './components/title-bar.vue';
export default {
  components: {
    Layout, TitleBar, HeaderBar,
  },
  data: () => {
    return {
      title: 'Edit List',
    };
  },
  methods: {
    onCancel() {
      this.$router.push('/list/all');
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
      </TitleBar>
    </div>
  </Layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

.available {
  display: block;
  max-width: 1440px;
  padding: 28px 32px;
  margin: 0 auto;
}

</style>