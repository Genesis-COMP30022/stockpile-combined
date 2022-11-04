<template>
  <v-container fluid>
    <h1 align="" class="mb-3 ml-2">Advanced search...</h1>
    <v-form @submit.prevent="savePost" v-model="valid" ref="itemData">
      <v-container style="max-width=200px">
        <v-row class="ml-0">
          <p>Fill in the optional fields below to see filtered search results.</p>
         </v-row>
        <v-row>

          <!--<v-col cols="12" md="2">
            <v-text-field
              ref="date"
              label="Minimum date"
              prepend-icon="mdi-calendar-range"
              type="date"
              filled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              ref="date"
              label="Maximum date"
              type="date"
              filled
            ></v-text-field>
          </v-col>-->

            <v-col
                cols="12"
                sm="6"
            >
                <v-text-field
                    ref="searchterm"
                    label="Search term"
                    prepend-icon="mdi-format-color-text"
                    filled
                ></v-text-field>

                <v-text-field
                    v-model="dateRangeText"
                    label="Date range"
                    prepend-icon="mdi-calendar"
                    readonly
                    filled
                ></v-text-field>

                <v-text-field
                    ref="buyer"
                    label="Buyer"
                    prepend-icon="mdi-account-check"
                    filled
                ></v-text-field>

                <v-text-field
                    label="Price"
                    prepend-icon="mdi-currency-usd"
                    suffix="AUD"
                    filled
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                sm="4"
            >
                <v-date-picker
                    v-model="dates"
                    range
                    color="sYellow" 
                    header-color="sLightBlue"
                ></v-date-picker>
            </v-col>

        </v-row>
      </v-container>
    </v-form>

    <v-divider class="mb-10"></v-divider>

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
/* TODO
- needs to receive a generic search term as a prop, from whichever page in the app you might receive a search
- need to port over most of the functionality of CardBody where it loads stuff from the db and calls CardItems
*/

import CardItem from "./CardItem";
import axios from "axios";
export default {
  name: "CardBody",

  created() {
    this.loadPosts();
  },

  components: {
    CardItem,
  },

  methods: {
    replaceBlankImages(image) {
      return image == "NULL"
        ? "https://storage.googleapis.com/stockpileapp/StockpileBLUENOTXT.png"
        : image;
    },
    loadPosts: async function () {
      let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI";
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
    dates: [],
    
  }),
  computed: {
    dateRangeText () {
        return this.dates.join(' ~ ')
    },
  },
};
</script>
