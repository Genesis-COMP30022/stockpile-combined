<template>
  <v-card>
      <v-card-title class="text-h5 grey lighten-2 px-4 py-3">
          <v-icon left class="pr-1">mdi-wrench</v-icon>
          Edit

          
          
      </v-card-title>
      

      <v-form @submit.prevent="editItem" v-model="valid" class="pt-4 px-2" ref="itemData">
          <p>{{buyer}}, {{itemData.name}} {{date}} {{rawDate}} </p>
          <v-container style="max-width=200px">
              <v-row>
                  <v-col cols="12" md="8">
                      <v-text-field
                      ref="name"
                      :rules="nameRules"
                      :counter="50"
                      label="Name of purchase"
                      prepend-icon="mdi-pencil"
                      filled
                      v-model="itemData.name"
                      :placeholder="itemName"
                     :value="itemName"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                      <v-text-field
                      ref="price"
                      :rules="pricerules"
                      :counter="10"
                      label="Price"
                      prepend-icon="mdi-currency-usd"
                      suffix="AUD"
                      filled
                      v-model="itemData.price"
                      :placeholder="price"
                      :value="price"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                      <v-text-field
                      ref="date"
                      :rules="daterules"
                      label="Date of purchase"
                      prepend-icon="mdi-calendar-range"
                      type="date"
                      filled
                      v-model="itemData.datePurchased"
                      :value="new Date(rawDate).toISOString().split('T')[0]"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                      <v-autocomplete
                      ref="category"
                      :items="categories"
                      :rules="catrules"
                      label="Category"
                      filled
                      prepend-icon="mdi-folder-outline"
                      v-model="itemData.category"
                      :value="cat"
                      :placeholder="cat"
                      ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" md="4">
                      <v-text-field
                      ref="buyer"
                      label="Buyer"
                      disabled
                      filled
                      prepend-icon="mdi-account-check"
                      :value="itemData.buyer"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12">
                      <v-img
                          width="100"
                          :src="img"
                      ></v-img>
                  </v-col>

                  <v-col cols="12" md="12">
                      <v-textarea
                      ref="desc"
                      :rules="descrules"
                      label="Description (optional)"
                      :counter="400"
                      filled
                      prepend-icon="mdi-message"
                      v-model="itemData.desc"
                      :placeholder="desc"
                      :value="desc"
                      height="150"
                      ></v-textarea>
                  </v-col>
              </v-row>

          </v-container>
      </v-form>
      <v-snackbar v-model="snackbar" color="sDarkBlue" :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
          </template>
      </v-snackbar>
      <v-divider></v-divider>

      <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn depressed color="primary" class="mr-4" @click="editItem">
          <v-icon left>mdi-check</v-icon>
          Submit
        </v-btn>

        <v-btn
          depressed
          color="sWhiteBlue"
          class="mr-0"
          @click="resetForm('Form is reset')"
        >
          <v-icon left>mdi-eraser-variant</v-icon>
          Clear
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable */
import axios from "axios";
const moment = require("moment");
var tz = require("moment-timezone");
//import handyUploader from "handy-uploader/src/components/handyUploader";

export default {
name: 'CardModal',
mounted() {
  this.copyItemData()
},
components: {
  //handyUploader
},


data: () => ({
  
  valid: false,
  families: ['Smith family', 'Bloggs family', 'Jones family', 'Cowler family'],
  roles: ['Regular', 'Admin'],
  snackbar: false,
  nametest: "not changed",
  itemData: {
    name: "",
    price: "",
    desc: "",
    category: "",
    buyer: "",
    image: "",
    imagetype: "",
    datePurchased: "",
    dateUpdated: Date.now(),
    dateCreated: "",
    family: "",
  },

  purchasename: "",
  lastname: "",
  categories: ["Entertainment", "Furniture", "Food"],
  buyers: ["Alister", "Brad", "Changmin", "Lachlan"],
  nameRules: [
    (name) => !!name || "Name is required",
    (name) => name.length <= 50 || "Name must be 10 characters or less",
    (name) => name.length > 0 || "Name cannot be empty",
  ],
  pricerules: [
    (price) => !!price || "Price is required",
    (price) =>
      (price && price.toString().length <= 10) || "Price must be 10 digits or less",
    (price) => isNaN(price) == false || "Price must be numeric",
  ],
  daterules: [(date) => !!date || "Date is required"],
  catrules: [(category) => !!category || "Category is required"],
  descrules: [
    (desc) =>
      desc.length <= 400 || "Description must be 400 characters or less",
    (desc) => desc.length > 0 || "Description cannot be empty",
  ],
  buyrules: [(buyer) => !!buyer || "Buyer is required"],
}),
props: {
  itemName: String,
  id: String,
  price: Number,
  date: String,
  cat: String,
  buyer: String,
  buyerID: String,
  img: String,
  desc: String,
  rawDate: String,
},
methods: {     
  copyItemData(){
    // console.log(this.itemName)
    this.itemData.name = this.itemName
    this.itemData.price = this.price
    this.itemData.desc = this.desc
    this.itemData.datePurchased = new Date(this.rawDate).toISOString().split('T')[0]
    this.itemData.category = this.cat
    this.itemData.buyer = this.buyer
    this.itemData.img = this.image
  },
  resetForm(newText) {
    this.text = newText;
    this.snackbar = true;
    this.$refs.itemData.reset();
    this.handyAttachments = [];
  },

  editItem() {
    //this.$refs.form.validate();
    console.log(this.itemData.datePurchased)

    let apiURL =
      "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/update-item/"
      + this.id;

    


    if(this.itemData.name.length == 0) {
      this.itemData.name = this.itemName
    }
    if(this.itemData.price.length == 0) {
      this.itemData.price = this.price
    }
    if(this.itemData.desc.length == 0) {
      this.itemData.desc = this.desc
    }
    if(this.itemData.category.length == 0) {
      this.itemData.category = this.cat
    }
  


    

    axios
      .put(apiURL, {
        name: this.itemData.name,
        price: this.itemData.price,
        desc: this.itemData.desc,
        category: this.itemData.category,
        //buyer: this.buyer,
        //image: this.image,
        //imagetype: this.imagetype,
        datePurchased: this.itemData.datePurchased,
        dateUpdated: Date.now(),
        //dateCreated: "",
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    if (isNaN(this.itemData.price)) {
      this.text = "Price must be numeric"
    } else {
      this.text = "Submission sent";
    }
    this.snackbar = true;
    this.$refs.itemData.reset();

  },

  close () {
    this.$emit('close');        
  }


}
};

</script>