<template>
<v-container fluid>
<div v-if="!$auth.state.isAuthenticated">
    <v-app-bar app dark color="#004d80">
      <router-link to="/"
        ><v-img
          src="../assets/nologolargewhite.svg"
          max-width="12rem"
          min-width="200px"
          height="3rem"
          class="mr-4"
        >
        </v-img
      ></router-link>
      <v-spacer></v-spacer>
            <v-btn v-if="!$auth.state.isAuthenticated" text color="sWhite"  @click="login()">
        <v-icon>mdi-login-variant</v-icon>&nbsp; Login
      </v-btn>
    </v-app-bar>
    </div>
<head>
    <!-- PERFORMANCE -->
    <link rel="stylesheet" href="https://storage.googleapis.com/stockpileapp/style.css">
  </head>
  <body>
    <main role="main">
      <section class="ui-section-hero">
        <div class="ui-layout-container">
          <!-- COPYWRITING -->
          <div class="ui-layout-column-6 ui-layout-column-center">
          <img src="https://storage.googleapis.com/stockpileapp/SquareNoBG_animated.svg" style="width:10rem">
            <h1>Welcome to Stockpile.</h1>
            <p class="ui-text-intro">Stockpile is a simple inventory tracking solution that enables families to easily track what they have, and who purchased it.</p>
            <!-- CTA -->
            <div class="ui-component-cta ui-layout-flex">
              <v-btn v-if="!$auth.state.isAuthenticated" text color="sWhite"  @click="login()">
                    <v-icon>mdi-login-variant</v-icon>&nbsp; Sign Up
                </v-btn>
              <p class="ui-text-note"><small>Available on any device with an internet connection</small></p>
            </div>
          </div>
        </div>
      </section>
      <section class="ui-section-content">
        <div class="ui-layout-container">
          <div class="ui-section-content__layout ui-layout-grid ui-layout-grid-2">
            <div class="ui-component-card ui-layout-column-4">
              <img src="https://storage.googleapis.com/stockpileapp/michal-balog-66NaCdBrkCs-unsplash.jpg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Start organising faster.</h4>
              <p>Organize your inventory at the touch of a button.</p>
            </div>
            <div class="ui-component-card ui-layout-column-4">
              <img src="https://storage.googleapis.com/stockpileapp/vu-anh-TiVPTYCG_3E-unsplash.jpg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Simple user management.</h4>
              <p>Create, join or delete a family whenever you want.</p>
            </div>
            <div class="ui-component-card ui-layout-column-4">
              <img src="https://storage.googleapis.com/stockpileapp/isaac-smith-6EnTPvPPL6I-unsplash.jpg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Detailed reports.</h4>
              <p>Generate PDF reports easily for your records.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="ui-section-close">
        <div class="ui-layout-container">
          <div class="ui-layout-column-6 ui-layout-column-center">
            <h2>Ready to start?</h2>

            <!-- CTA -->
            <div class="ui-component-cta ui-layout-flex">
              <v-btn v-if="!$auth.state.isAuthenticated" text color="sWhite"  @click="login()">
        <v-icon>mdi-login-variant</v-icon>&nbsp; Sign Up
      </v-btn>
              <p class="ui-text-note"><small>Available on any device with an internet connection.</small></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
  <footer>
  Images provided by Unsplash <a href="https://unsplash.com/photos/TiVPTYCG_3E">(1)</a>, <a href="https://unsplash.com/photos/6EnTPvPPL6I">(2)</a>, <a href="https://unsplash.com/photos/66NaCdBrkCs">(3)</a>
  </footer>
      </v-container>

</template>



<script>

export default {
  name: "LandingPage",
    data: () => ({
    cards: [
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
  }),

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
