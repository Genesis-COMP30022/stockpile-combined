<template>
  <v-container fluid>
    <h1 align="" class="mb-3 ml-2">Dashboard</h1>
  <v-btn @click="createPDF" color="primary">Download as PDF</v-btn>
    <v-data-table
      ref="myTable"
      :headers="headers"
      :items="posts"
      :search="search"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:[`item.datePurchased`]="{ item }">
        <span>{{
          new Date(item.datePurchased).toLocaleDateString("en-AU")
        }}</span>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>All Items</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            
          ></v-text-field>
          <v-dialog persistent v-model="dialog" max-width="20rem">
            <v-card>
              <v-card-title>
                <span class="text-h5">View Image</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <h2>Item: {{ editedItem.name }}</h2>
                  </v-row>
                  <v-row
                    ><br /><v-img
                      max-height="auto"
                      max-width="15rem"
                      :src="editedItem.image"
                    ></v-img
                  ></v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Ok </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-file-image
        </v-icon>
        <v-icon v-if="item.email==currentuser.email || currentuser.role=='Admin'" small class="mr-2" @click="deleteItem(item._id)">
          mdi-trash-can
        </v-icon>
      </template>
      
      <template v-slot:no-data>
        <p>No Data Available</p>
        <v-row justify="center">
          <br />
          <v-img
            max-width="5rem"
            src="../assets/SquareNoBG_animated.svg"
          ></v-img>
        </v-row>
      </template>
    </v-data-table>
    <v-spacer></v-spacer>
    <br/>

    <v-snackbar v-model="snackbar" color="sDarkBlue" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

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
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {

    watch: {
    $route: {
      immediate: true,
      handler() {
        this.loadUser();
      },
    },
  },

  dialog: false,
  dialogDelete: false,

  name: "HomeTemp",
  data: () => ({
    currentuser: [],
    dialogone: true,
    snackbar: false,
    search: "",
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    posts: [],
    headers: [
      {
        text: "Item name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Price", value: "price" },
      { text: "Description", value: "desc" },
      { text: "Category", value: "category" },
      { text: "Purchase date", value: "datePurchased" },
      { text: "Buyer", value: "buyer" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  methods: {

    loadUser() {
      let oneUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"+this.$auth.state.user.email;
       axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
          this.checkNullFamily()
          this.loadPosts();
        })
        .catch((error) => {
          console.log(error);
        });
        
  },

checkNullFamily(){
  if (this.currentuser.family == "null"){
    window.location.href = "/settings";
  }
},

login() {
  this.$auth.loginWithRedirect();
},

logout() {
  this.$auth.logout({
    returnTo: window.location.origin
  });
},
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    deleteItem(toDeleteID) {
      this.dialogone = true
      let toDeleteURL =
        "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/delete-item/" +
        toDeleteID;

      axios
        .delete(toDeleteURL)
        .then(() => {
          //this.updatePost(toDeleteID);
          this.loadPosts()
        })
        .catch((error) => {
          console.log(error);
        });

      this.text = "Item deleted!";
      this.snackbar = true;
    },

    // updatePost(toDeleteID){
    //   let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/update-item/" + toDeleteID;
    //   axios.post(apiURL, this.itemData).then((res) => {
    //     console.log(res)
    //     this.close();
    //     this.loadPosts();
    //     this.color ='info'
    //     this.text = 'Post has been modified.'
    //     this.snackbar = true;
    //   }).catch(error => {
    //     console.log(error)
    //     console.log(this.$route.params.id)
    //   })
    // },


  createPDF () {


          
            var source =  this.$refs["myTable"];
            let rows = [];
            let columnHeader = ['Item Name', 'Price', 'Description', 'Category', 'Purchase Date', 'Buyer'];
            let pdfName = 'Stockpile_exported';
            source.items.forEach(element => {
                var temp = [
                    element.name,
                    element.price,
                    element.description,
                    element.category,
                    element.purchaseDate,
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




    loadPosts () {
      let apiURL = "https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI/getfamilyitems/"+this.currentuser.family;
      axios
        .get(apiURL)
        .then((res) => {
          this.posts = res.data;
          
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogone= false;
        
    },
  },
};
</script>
