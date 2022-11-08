<template>
  <v-container fluid>
    <div id="results">
    <h1 align="" class="mb-3 ml-2">Advanced search...</h1>
    <v-form @submit.prevent="savePost" v-model="valid" ref="itemData">
      <v-container style="max-width=200px">
        <v-row class="ml-0">
          <p>Fill in the optional fields below to see filtered search results. 
            <b style="color: red">LACHLAN'S DEV VERSION!</b></p>
         </v-row>
        <v-row>

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

                <v-btn depressed color="sEhiteBlue" class="mr-4" @click="clearDates()">
                    <v-icon left>mdi-delete</v-icon>
                    Clear dates
                </v-btn>
            </v-col>

        </v-row>

        <v-row class="ml-1 pb-12">
          <v-btn depressed color="primary" class="mr-4" @click="submitAdvancedSearch()">
            <v-icon left>mdi-check</v-icon>
            Submit
          </v-btn>
                  
          <v-btn depressed color="sYellow" class="mr-4" @click="print">
            <v-icon left>mdi-printer</v-icon>
            Generate report
          </v-btn>

        </v-row>


      </v-container>
    </v-form>

    <v-divider class="mb-10"></v-divider>

    <v-row>
      <v-col sm="12">
        <h1 align="" class="mb-3 ml-2">Search results</h1>
        <p class="mb-3 ml-2 pb-10" v-if="items.length == 0 && submitStart">
            There are no results for your query. Check whether you misspelled something, 
            and make sure that you really do want all of the filters you've set.</p>
        <p class="mb-3 ml-2 pb-10" v-if="submitStart == false">
            Click the "submit" button to search.</p>
      </v-col>
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
          :showEdit="false"
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

// print related
import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(VueHtmlToPaper);

const fastDecode = require('fast-decode-uri-component')


export default {
  name: "CardBody",


  created() {
    this.loadPosts();
    this.dialogone = false;
  },

  mounted(){
    this.loadPosts()

    if (window.location.href.split('?').pop() == window.location.href){
      this.sTerm = ""

    }
    else{
      this.sTerm = window.location.href.split('?').pop();
      
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
          this.itemsBackup = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // thanks to the absolute fucking legend who wrote this https://stackoverflow.com/a/16080662
    isDateBetween(dateFrom, dateTo, dateCheck) {
        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

        return check > from && check < to;
    },

    submitAdvancedSearch() {
      this.items = [];
      this.submitStart = true;

      for (var i = 0; i < this.itemsBackup.length; i++) { 

        var ib = this.itemsBackup;

        var cardDate = new Date(ib[i].datePurchased).toLocaleDateString('en-AU');
        var sDateMod = this.sDate.map(x => new Date(x).toLocaleDateString('en-AU'));

        if (   ( this.sBuyer == "" || ib[i].buyer == this.sBuyer || ib[i].buyer.includes(this.sBuyer) )
            && ( this.sTerm == "" || ib[i].name == this.sTerm || ib[i].name.includes(this.sTerm) )
            && ( sDateMod[0] == null || sDateMod[0] == cardDate || this.isDateBetween(sDateMod[0], sDateMod[1], cardDate) || this.isDateBetween(sDateMod[1], sDateMod[0], cardDate) )
            && ( this.sCat == "" || this.sCat == ib[i].category )
            && ( this.sPrice == "" || this.sPrice == ib[i].price )
        ) {
            this.items.push(ib[i]);
        }

      }

    },

    clearDates() {
        this.sDate = []
    },

    print () {
      this.$htmlToPaper('results');
    },

    replaceBlankImages(image) {
      return image == "NULL"
        ? "https://storage.googleapis.com/stockpileapp/StockpileBLUENOTXT.png"
        : image;
    },
  },
  data: () => ({
    submitStart: false,
    dialogone: true,
    categories: ["Entertainment", "Furniture", "Food"],
    items: [],
    itemsBackup: [],
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
