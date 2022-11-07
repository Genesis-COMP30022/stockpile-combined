<template>
  <v-container fluid>
    <div id="results">
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
                    :rules="nameRules"
                    prepend-icon="mdi-format-color-text"
                    filled
                    v-model="sTerm"
                ></v-text-field>

                <v-text-field
                    v-model="dateRangeText"
                    label="Date range (use picker!)"
                    prepend-icon="mdi-calendar"
                    readonly
                    filled
                    
                ></v-text-field>

                <v-autocomplete
                    ref="category"
                    :items="categories"
                    label="Category"
                    filled
                    prepend-icon="mdi-folder-outline"
                    v-model="sCat"
                ></v-autocomplete>

                <v-text-field
                    ref="buyer"
                    label="Buyer"
                    prepend-icon="mdi-account-check"
                    filled
                    v-model="sBuyer"
                ></v-text-field>

                <v-text-field
                    label="Price"
                    prepend-icon="mdi-currency-usd"
                    suffix="AUD"
                    filled
                    v-model="sPrice"
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                sm="4"
            >
                <v-date-picker
                    v-model="sDate"
                    range
                    color="sYellow" 
                    header-color="sLightBlue"
                ></v-date-picker>
            </v-col>

        </v-row>

        <v-row class="ml-1 pb-12">
          <v-btn depressed color="primary" class="mr-4" @click="submitAdvancedSearch()">
            <v-icon left>mdi-check</v-icon>
            Submit
          </v-btn>
                  
          <v-btn depressed color="sWhiteBlue" class="mr-4" @click="print">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>

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
  </div>
  </v-container>
  
</template>

<script>
/* TODO
- needs to receive a generic search term as a prop, from whichever page in the app you might receive a search
- need to port over most of the functionality of CardBody where it loads stuff from the db and calls CardItems
*/

import CardItem from "./CardItem";
import axios from "axios";
import {Querier} from 'array-querier/lib/orbiter';

// print related
import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(VueHtmlToPaper);

const fastDecode = require('fast-decode-uri-component')


export default {
  name: "CardBody",


  created() {
    this.loadPosts()
    this.dialogone = false;
  },

  mounted(){

    if (window.location.href.split('?').pop() == window.location.href){
      this.sTerm = ""
    }
    else{
      this.sTerm = window.location.href.split('?').pop()
      this.submitAdvancedSearch();
      
    }
    
    this.sTerm = fastDecode(this.sTerm)
    
    
  },

  components: {
    CardItem,
  },

  methods: {
    loadPosts(){
      let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI";
      axios
        .get(apiURL)
        .then((res) => {
          this.items = res.data;
          this.itemsCopy = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    print () {
      this.$htmlToPaper('results');
    },
    replaceBlankImages(image) {
      return image == "NULL"
        ? "https://storage.googleapis.com/stockpileapp/StockpileBLUENOTXT.png"
        : image;
    },


    submitAdvancedSearch() {
      this.items = this.itemsCopy;

      if (this.sTerm == ""){
        this.sTerm = []
      }
      if (this.sTerm != ""){
        this.sTerm = [this.sTerm]
      }
      if (this.sBuyer == ""){
        this.sBuyer = []
      }
      if (this.sBuyer != ""){
        this.sBuyer = [this.sBuyer]
      }
      if (this.sCat == ""){
        this.sCat = []
      }
      if (this.sCat != ""){
        this.sCat = [this.sCat]
      }

      var filters = {
        name: this.sTerm,
        buyer: this.sBuyer,
        category: this.sCat,
      };
      
      const MyFilteredResult = Querier.filterSimpleArray(this.items, filters);
      this.items = MyFilteredResult
      console.log(MyFilteredResult)


      // this.items = searched
      // console.log(searched)
      
        // should do processing on the cards based on what the user entered
    }
  },
  data: () => ({
    dialogone: true,
    itemsCopy: [],
    categories: ["Entertainment", "Furniture", "Food"],
    items: [],
    sTerm: "",
    sDate: [],
    sCat: "",
    sBuyer: "",
    sPrice: "",

    nameRules: [
      (name) => name.length <= 50 || "Name must be 50 characters or less",
    ],
    pricerules: [
      (price) =>
        (price && price.toString().length <= 10) || "Price must be 10 digits or less",
      (price) => isNaN(price) == false || "Price must be numeric",
    ],
  }),
  computed: {
    dateRangeText () {
        return this.sDate.join(' ~ ')
    },
  },

};
</script>
