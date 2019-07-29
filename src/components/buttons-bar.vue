<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
  computed: {},
});

</script>

<template>
  <div class="buttons-group">
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/account.png"
      >
      <br>Accounts
    </div>
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/contact.png"
      >
      <br>Contacts
    </div>
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/lead.png"
      >
      <br>Leads
    </div>
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/opportunity.png"
      >
      <br>Opportiunities
    </div>
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/activity.png"
      >
      <br>Activities
    </div>
    <div class="image">
      <img
        width="60"
        height="60"
        src="assets/icons/recommendation.png"
      >
      <br>Recommendations
    </div>
  </div>
</template>

<style scoped>
.buttons-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 960px;
  width: 100%;
  height: 155px;
  margin: 0 auto;
}
.image {
  display: flex;
  width: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
