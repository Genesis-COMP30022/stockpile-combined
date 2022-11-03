<template>
<v-container fluid>
<div v-if="!$auth.state.isAuthenticated">
    <v-app-bar app dark color="sDarkBlue">
      <!--<v-toolbar-title 
                class="font-weight-black display-1 sWhiteBlue--text"
            >
                <span>STOCKPILE</span>
                <span class="font-weight-light">APP</span>
            </v-toolbar-title>-->
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
            <v-btn text color="sWhite"  @click="login()">
        <v-icon>mdi-login-variant</v-icon>&nbsp; Login
      </v-btn>
    </v-app-bar>
    </div>
        <v-row dense align="stretch" >
          <v-col
            align="center"
            cols="12"
          >
            <v-card>

  <v-img
                      max-height="auto"
                      max-width="15rem"
                      src="../assets/SquareNoBG_animated.svg"
                    ></v-img
                  >
              <v-card-actions>
                <v-spacer></v-spacer>
  
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            cols="6"
          >
            <v-card
            style="overflow-y: auto; height:100%"
      class="mx-auto"
    >
      <v-card-text>
        <p class="text-h5 text--primary">
          About
        </p>
        <div class="text--primary">
          Stockpile is a simple inventory tracking solution that enables families to easily track what they have, and who purchased it. Anytime, anywhere, on any device.
<br>
Unlike other inventory management systems, you won’t need a 100-page guide or lengthy training sessions to figure out Stockpile. It’s built so you can have it up and running in minutes, all on your own.
<br><br>
Get started now!
        </div>
      </v-card-text>
      <v-card-actions>
          <div v-if="!$auth.state.loading">
      <!-- show login when not authenticated -->
      <v-btn text color="deep-purple accent-4" v-if="!$auth.state.isAuthenticated" @click="login">Sign Up</v-btn>
    </div>
      </v-card-actions>
    </v-card>
          </v-col>
          <v-col
            cols="6"
          >
            <v-card style="overflow-y: auto; height:100%">
              <v-img
                src="../assets/whiteblue.svg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="100%"
              >
                <v-card-title>Organize your inventory at the touch of a button.</v-card-title>
              </v-img>

            </v-card>
          </v-col>
        </v-row>
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
