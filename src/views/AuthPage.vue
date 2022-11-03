<template>
  <v-container fluid>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <h1>Please confirm logout</h1>
        <div v-if="!$auth.state.loading">
      <!-- show login when not authenticated -->
      <!-- show logout when authenticated -->
      <button @click="logout">Logout</button>
    </div>
  </v-container>
</template>


<script>

export default {
  name: "AuthPage",
  methods: {
login() {
  this.$auth.loginWithRedirect();
},

logout() {
  this.$auth.logout({
    returnTo: "https://app.stockpileapp.au"
  });
},

  },
};
</script>
