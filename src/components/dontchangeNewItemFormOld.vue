<template>
  <v-container fluid>
    <h1 align="" class="mb-3 ml-2">Create new purchase...</h1>
    <v-form @submit.prevent="savePost" v-model="valid" ref="itemData">
      <v-container style="max-width=200px">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              ref="name"
              :rules="nameRules"
              :counter="50"
              label="Name of purchase"
              prepend-icon="mdi-pencil"
              required
              filled
              v-model="itemData.name"
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
              required
              filled
              v-model="itemData.price"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              ref="date"
              :rules="daterules"
              label="Date of purchase"
              prepend-icon="mdi-calendar-range"
              required
              type="date"
              filled
              v-model="itemData.date"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-autocomplete
              ref="category"
              :items="categories"
              :rules="catrules"
              label="Category"
              required
              filled
              prepend-icon="mdi-attachment"
              v-model="itemData.category"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              ref="buyer"
              :items="buyers"
              :rules="buyrules"
              label="Buyer"
              required
              filled
              prepend-icon="mdi-account-check"
              v-model="itemData.buyer"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="10">
            <v-textarea
              ref="desc"
              :rules="descrules"
              label="Description"
              :counter="400"
              full-width
              filled
              single-line
              prepend-icon="mdi-message"
              v-model="itemData.desc"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="ml-1">
          <v-btn color="sWhiteBlue">
            <v-icon left>mdi-check</v-icon>s Submitasdfnsakdlfnsalkfndaskl
          </v-btn>

          <v-btn depressed color="sWhiteBlue" class="mr-4">
            <v-icon left>mdi-eraser-variant</v-icon>
            Clear
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
//
// depressed
// color="primary"
// class="mr-4"
// type="submit"
// @submit="createItem"
//                     #@submit="createItem"
// https://vuetifyjs.com/en/components/text-fields
// maxlength: 400
import axios from "axios";

export default {
  name: "NewItemForm",

  components: {},

  data: () => ({
    valid: false,
    purchasename: "",
    lastname: "",
    categories: ["Entertainment", "Furniture", "Food"],
    buyers: ["Alister", "Brad", "Changmin", "Lachlan"],
    nameRules: [
      (name) => !!name || "Name is required",
      (name) => name.length <= 50 || "Name must be 10 characters or less",
    ],
    pricerules: [
      (price) => !!price || "Price is required",
      (price) =>
        (price && price.length <= 10) || "Price must be 10 digits or less",
      (price) => isNaN(price) == false || "Price must be numeric",
    ],
    daterules: [(date) => !!date || "Date is required"],
    catrules: [(category) => !!category || "Category is required"],
    descrules: [
      (desc) =>
        desc.length <= 400 || "Description must be 400 characters or less",
    ],
    buyrules: [(buyer) => !!buyer || "Buyer is required"],
  }),
  methods: {
    savePost: async function () {
      console.log("it is working");
      this.createItem();
    },
    createItem() {
      let apiURL = "http://localhost:4000/api/create-item";
      console.log("it is creating");
      axios
        .post(apiURL, this.itemData)
        .then(() => {
          this.itemData = {
            name: " ",
            price: 0.05,
            description: "",
            category: "",
            buyer: "",
            image: "",
            datePurchased: "",
            dateUpdated: "",
            dateCreated: "",
          };
          //this.createItem();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
