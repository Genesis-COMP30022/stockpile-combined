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
    <link rel="stylesheet" href="https://storage.googleapis.com/stockpileapp/style4.css">
  </head>
  <body>
    <main role="main">
      <section class="ui-section-hero py-8">
        <div class="ui-layout-container">
          <!-- COPYWRITING -->
          <div class="ui-layout-column-6 ui-layout-column-center">
          <img src="https://storage.googleapis.com/stockpileapp/SquareNoBG_animated.svg" style="width:10rem">
            <h1 style="font-size: 32px">Welcome to Stockpile</h1>
            <p class="ui-text-intro">Stockpile is a simple inventory tracking solution that enables families to easily track household items, and who purchased them.</p>
            <!-- CTA -->
            <div class="ui-component-cta ui-layout-flex">
                <v-btn v-if="!$auth.state.isAuthenticated" depressed color="sYellow" class="mr-4" @click="login()">
                    <v-icon left>mdi-login-variant</v-icon>
                    <b>Log in</b>
                </v-btn>
                <v-btn v-else depressed color="sYellow" class="mr-4" @click="$router.push('dashboard')">
                    <v-icon left>mdi-grid</v-icon>
                    <b>Go to dashboard</b>
                </v-btn>
            </div>
          </div>
        </div>
      </section>
      <section class="ui-section-content">
        <div class="ui-layout-container">
          <div class="ui-section-content__layout ui-layout-grid ui-layout-grid-2">
            <div class="ui-component-card ui-layout-column-4">
              <img src="../assets/pexels-photo-9999999.jpg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Start organising faster.</h4>
              <p>Organize your inventory at the touch of a button.</p>
            </div>
            <div class="ui-component-card ui-layout-column-4">
              <img src="../assets/pexels-photo-4259140.jpeg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Simple user management.</h4>
              <p>Create, join or delete a family whenever you want.</p>
            </div>
            <div class="ui-component-card ui-layout-column-4">
              <img src="../assets/pexels-photo-4559555.jpeg" alt="#" loading="lazy" class="ui-component-card--image">
              <h4 class="ui-component-card--title">Detailed reports.</h4>
              <p>Generate PDF reports easily for your records.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="ui-section-close pt-8">
        <div class="ui-layout-container">
          <div class="ui-layout-column-6 ui-layout-column-center">
            <h2>Ready to start?</h2>

            <!-- CTA -->
            <div class="ui-component-cta ui-layout-flex">
              <p><small>Stockpile is available on any device with an internet connection.</small></p>
              <v-btn v-if="!$auth.state.isAuthenticated" text color="sWhite"  @click="login()">
                    <v-icon>mdi-login-variant</v-icon>&nbsp; Sign Up
                </v-btn>
              <v-btn v-else depressed color="sYellow" class="mr-4" @click="$router.push('new')">
                    <v-icon left>mdi-pencil</v-icon>
                    <b>Add a purchase</b>
                </v-btn>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
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
