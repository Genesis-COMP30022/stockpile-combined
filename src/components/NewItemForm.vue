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
              v-model="itemData.datePurchased"
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
              prepend-icon="mdi-folder-outline"
              v-model="itemData.category"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              ref="buyer"
              label="Buyer"
              required
              disabled
              filled
              prepend-icon="mdi-account-check"
              :value="this.$auth.state.user.name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="10">
            <handy-uploader
              :documentAttachment.sync="handyAttachments"
              :fileUploaderType="'simple'"
              :fileAccept="'image/png,image/jpeg'"
              :maxFileSize="10240"
              :imageCompressor="false"
              :maxFileCount="1"
              :badgeCounter="true"
              :thumb="false"
              :changeFileName="true"
            >
            </handy-uploader>
          </v-col>

          <v-col cols="12" md="10">
            <v-textarea
              ref="desc"
              :rules="descrules"
              label="Description (optional)"
              :counter="400"
              filled
              prepend-icon="mdi-message"
              v-model="itemData.desc"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="ml-1 pb-12">
          <v-btn depressed color="primary" class="mr-4" @click="createItem">
            <v-icon left>mdi-check</v-icon>
            Submit
          </v-btn>

          <v-btn
            depressed
            color="sWhiteBlue"
            class="mr-4"
            @click="resetForm('Form is reset')"
          >
            <v-icon left>mdi-eraser-variant</v-icon>
            Clear
          </v-btn>
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
  </v-container>
</template>

<script>
// https://vuetifyjs.com/en/components/text-fields
// maxlength: 400
import axios from "axios";
import handyUploader from "handy-uploader/src/components/handyUploader";

export default {
  name: "NewItemForm",

  components: {
    handyUploader,
  },

  data: () => ({
    handyAttachments: [],
    snackbar: false,
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
      dateCreated: Date.now(),
    },
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
      //console.log("it is working");
      this.createItem();
    },
    resetForm(newText) {
      this.text = newText;
      this.snackbar = true;
      this.$refs.itemData.reset();
      this.handyAttachments = [];
    },
    createItem() {
      let apiURL =
        "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/create-item";
      //console.log("it is creating");

      if (this.handyAttachments.length === 0) {
        this.itemData.image = "NULL";
        this.itemData.imagetype = "NULL";
      } else {
        this.itemData.image = this.handyAttachments[0].file.base64;
        this.itemData.imagetype = this.handyAttachments[0].file.format;
      }

      this.itemData.buyer = this.$auth.state.user.name;

      axios
        .post(apiURL, this.itemData)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      this.resetForm("New item saved");
    },
  },
};
</script>
