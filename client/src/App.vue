<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="#0264a6" class="pa-4">
        <v-avatar class="mb-4" color="grey lighten-1" size="64"></v-avatar>

        <div>user@stockpileapp.au</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#004D80">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        ><a href="/"
          ><v-img
            max-height="8rem"
            max-width="12rem"
            :src="require('@/assets/whitecropped.svg')"
          ></v-img></a
      ></v-toolbar-title>

      <v-speed-dial v-model="fab" direction="bottom" absolute right>
        <template v-slot:activator>
          <v-btn color="primary">
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-pencil-outline </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>

    <v-main>
      <v-divider></v-divider>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Dashboard"],
      ["mdi-send", "All Items"],
      ["mdi-delete", "Create"],
      ["mdi-delete", "Search"],
      ["mdi-cog", "Settings"],
      ["mdi-alert-octagon", "Logout"],
    ],
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        title: "[NUM]",
        artist: "Number of Items",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        title: "[NUM]",
        artist: "Value of all items",
      },
    ],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
  }),
};
</script>
