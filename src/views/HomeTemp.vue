<template>
  <v-container fluid>
    <h1 align="" class="mb-3 ml-2">Dashboard</h1>
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
