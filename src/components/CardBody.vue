<template>
  <v-container fluid>
    <h1 align="" class="mb-3 ml-2">Recent submissions</h1>
    <v-row>
      <v-col
        v-bind:key="a._id"
        v-for="a in items.slice().reverse()"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <CardItem
          :itemName="a.name"
          :id="a._id"
          :price="a.price"
          :date="new Date(a.datePurchased).toLocaleDateString('en-AU')"
          :rawDate="a.datePurchased"
          :cat="a.category"
          :buyer="a.buyer"
          :buyerID="a.buyer"
          :img="replaceBlankImages(a.image)"
          :desc="a.desc != '' ? a.desc : '*No description.'"
        />
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialogone"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Loading... Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import CardItem from "./CardItem";
import axios from "axios";
export default {
  name: "CardBody",

    watch: {
    $route: {
      immediate: true,
      handler() {
        this.loadUser();
      },
    },
  },

  components: {
    CardItem,
  },

  methods: {
    loadUser() {
      let oneUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"+this.$auth.state.user.email;
       axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
          this.loadPosts();
        })
        .catch((error) => {
          console.log(error);
        });
        
  },
    replaceBlankImages(image) {
      return image == "NULL"
        ? "https://storage.googleapis.com/stockpileapp/StockpileBLUENOTXT.png"
        : image;
    },
    loadPosts: async function () {
      let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/getfamilyitems/"+this.currentuser.family;
      await axios
        .get(apiURL)
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
        this.dialogone = false;
    },
  },
  data: () => ({
    dialogone: true,
    items: [],
  }),
};
</script>
