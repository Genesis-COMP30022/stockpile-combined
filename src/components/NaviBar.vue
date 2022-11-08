<template>
  <nav>
    <v-navigation-drawer v-model="drawer" right app>
      <v-sheet color="#027fd1" class="pa-4">
        <v-avatar class="mb-2" color="sYellow" size="64">
          <img :src="this.$auth.state.user.picture"/>
        </v-avatar>
        
        <div v-if="$auth.state.isAuthenticated" style="padding-bottom: 2px;"><b>{{this.$auth.state.user.name}} </b>
        <span v-if="$auth.state.isAuthenticated"
        >[{{this.currentuser.role}}]</span></div>
        <div v-if="$auth.state.isAuthenticated && this.currentuser.family == 'null'">Unassigned user</div>
        <div v-if="$auth.state.isAuthenticated && this.currentuser.family != 'null'"
             style="font-size: 14px" 
        >{{this.currentuser.family_name}}<br /></div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text, url] in links" :key="icon" :to="url">
          <v-list-item-icon class="mr-4">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="[icon, text] in links2" :key="icon" @click="logout">
          <v-list-item-icon class="mr-4">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="#004d80">
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
          min-width="150px"
          height="2rem"
          class="mr-4"
        >
        </v-img
      ></router-link>
      <v-spacer></v-spacer>
      <!--<v-btn 
                depressed 
                color="sBlue" 
                append-icon="mdi-plus" 
                class="ml-4 hidden-xs-only"
            >
                Add
                <v-icon right>mdi-plus</v-icon>
            </v-btn>-->
      <!--<v-btn depressed color="#54a3eb" append-icon="mdi-plus">
                Settings
                <v-icon right>mdi-cog</v-icon>
            </v-btn>-->
      <v-form v-if="this.currentpathname == '/search'" class="hidden-xs-only" @submit.prevent="submitSearch()"> 
        <v-container>
          <v-text-field
            label="Search..."
            placeholder="Search..."
            hide-details
            solo-inverted
            flat
            text
            dense
            append-icon="mdi-magnify"
            disabled
          >
          </v-text-field>
        </v-container>
      </v-form>
      <v-form v-if="this.currentpathname != '/search'" class="hidden-xs-only" @submit.prevent="submitSearch()"> 
        <v-container>
          <v-text-field
            label="Search..."
            placeholder="Search..."
            hide-details
            solo-inverted
            flat
            text
            dense
            append-icon="mdi-magnify"
            v-model="searchTerm"
          >
          </v-text-field>
        </v-container>
      </v-form>

      <!--<v-btn 
                depressed 
                class="hidden-xs-only" 
                fab 
                x-small 
                light 
                color="sYellow"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>-->
      <v-btn text small color="sWhite" fab @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

  </nav>
  
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";

export default {


    methods: {
    login() {
        this.$auth.loginWithRedirect();
    },

    logout() {
    this.$auth.logout({
        returnTo: "https://app.stockpileapp.au"
      });
    },

    submitSearch() {
      if (this.searchTerm != null){
        this.$router.push("/search?"+this.searchTerm);
      }
        //this.$router.push("/search?" )
    },

    loadUser: async function () {
      let oneUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"+this.$auth.state.user.email;
      await axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    },
  

  data: () => ({
    searchTerm: null,
    currentpathname: "",
    currentuser: [],
    drawer: null,
    items: [],
    links: [
      ["mdi-home", "Home", "/"],
      ["mdi-grid", "Dashboard", "/dashboard"],
      ["mdi-pencil", "Create purchase", "/new"],
      ["mdi-send", "Recent submissions", "/recent"],
      ["mdi-cog", "Settings", "/settings"],
    ],
    links2: [["mdi-close", "Logout"]]
  }),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.currentpathname = window.location.pathname
        this.loadUser();
        document.title = to.meta.title || "Stockpile";
      },
    },
  },
};
</script>
