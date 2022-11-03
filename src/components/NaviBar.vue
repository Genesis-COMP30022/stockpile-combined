<template>
  <nav>
    <v-navigation-drawer v-model="drawer" right app>
      <v-sheet color="sLightBlue" class="pa-4">
        <v-avatar class="mb-2" color="sYellow" size="64">
          <img :src="this.$auth.state.user.picture"/>
        </v-avatar>

        <div v-if="$auth.state.isAuthenticated"><b>{{this.$auth.state.user.name}}</b> [?]<br />? family</div>
        <div v-if="!$auth.state.isAuthenticated"><b><br></b>Stockpile App</div>
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
         <v-list-item>
          <v-list-item-icon class="mr-4">
            <v-icon v-if="!$auth.state.isAuthenticated">mdi-login-variant</v-icon>
            <v-icon v-if="$auth.state.isAuthenticated">mdi-close</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
          <a v-if="!$auth.state.isAuthenticated" href="/dashboard">Login</a>
          <div v-if="!$auth.state.loading">
          
      <!-- show login when not authenticated -->
      
      <a v-if="$auth.state.isAuthenticated" href="/auth">Logout</a>

    </div>

          
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
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
      <v-form class="hidden-xs-only">
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


export default {
  

  data: () => ({
    
    drawer: null,
    links: [
      ["mdi-pencil", "Create purchase", "/new"],
      ["mdi-send", "Recent purchases", "/recent"],
      ["mdi-grid", "Dashboard", "/dashboard"],
      ["mdi-cog", "Settings", "/settings"],
    ],
  }),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Stockpile";
      },
    },
  },
};
</script>
