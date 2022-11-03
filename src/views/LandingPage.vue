<template>
  <v-container fluid>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.state.loading">
      <!-- show login when not authenticated -->
      <v-btn v-if="!$auth.state.isAuthenticated" @click="login">Login</v-btn>
      <!-- show logout when authenticated -->
      <v-btn v-if="$auth.state.isAuthenticated" @click="logout">Logout</v-btn>
    </div>
    <h1 align="" class="mb-3 ml-2">Welcome to Stockpile</h1>

  </v-container>
</template>


<script>

export default {
  name: "LandingPage",

  methods: {
login() {
  this.$auth.loginWithRedirect();
},

logout() {
  this.$auth.logout({
    returnTo: "/"
  });
},

  },
};
</script>
