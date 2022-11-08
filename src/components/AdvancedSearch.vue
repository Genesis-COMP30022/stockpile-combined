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
                  
          <v-btn depressed color="sYellow" class="mr-4" @click="createPDF()">
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

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const fastDecode = require('fast-decode-uri-component')


export default {
  name: "CardBody",
    watch: {
    $route: {
      immediate: true,
      handler() {
        if (window.location.href.split('?').pop() == window.location.href){
          this.sTerm = ""

        }
        else{
          this.sTerm = window.location.href.split('?').pop();
          
        }
        
        this.sTerm = fastDecode(this.sTerm)
        this.loadUser();
      },
    },
  },
  components: {
    CardItem,
  },

  methods: {

  createPDF () {
            var source =  this.items;
            let rows = [];
            let columnHeader = ['Item Name', 'Price', 'Description', 'Category', 'Purchase Date', 'Buyer'];
            let pdfName = 'Stockpile_exported';

            source.forEach(element => {
                var temp = [
                    element.name,
                    element.price,
                    element.desc,
                    element.category,
                    new Date(element.datePurchased).toLocaleDateString("en-AU"),
                    element.buyer,
                ];
                rows.push(temp);
            });
            var doc = new jsPDF();
            // var base64Img = "data:image/png;base64,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"
            // doc.addImage(base64Img, 'png');
            // doc.addImage(imgData, 'png', 10, 78, 12, 15)
            
            doc.autoTable(columnHeader, rows, { startY: 10 });

            doc.save(pdfName + '.pdf');
        },

    loadUser() {
      let oneUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"+this.$auth.state.user.email;
       axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
          this.loadPosts();
          this.dialogone = false;
        })
        .catch((error) => {
          console.log(error);
        });
        
  },

    loadPosts(){
      let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/getfamilyitems/"+this.currentuser.family;
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
