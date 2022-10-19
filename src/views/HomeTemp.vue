<template>
  <v-container fluid> 
      <h1 align="" class="mb-3 ml-2">Dashboard</h1>
          <v-data-table
      :headers="headers"
      :items="posts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Items</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
          persistent
            v-model="dialog"
            max-width="20rem"
          >

            <v-card>
              <v-card-title>
                <span class="text-h5">View Image</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>

                      <h2>Item: {{editedItem.name}}</h2>
                      

                  </v-row>
                  <v-row><br><v-img max-height="auto" max-width="15rem" :src="editedItem.image"></v-img></v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-file-image 
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
      <v-spacer></v-spacer>
      <br>

  </v-container>
  
</template>


<script>
import axios from "axios";

export default {



  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.loadPosts()
  },

  dialog: false,
  dialogDelete: false,
  
  name: "HomeTemp",
  data: () => ({
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    
    posts: [],
    headers: [
      {
        text: 'Item name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Price', value: 'price' },
      { text: 'Description', value: 'desc' },
      { text: 'Category', value: 'category' },
      { text: 'Purchase date', value: 'datePurchased'},
      { text: 'Buyer', value: 'buyer' },
      { text: 'Image', value: 'actions', sortable: false },
    ],
  }),

  methods: {
        editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },



loadPosts: async function(){
  let apiURL = 'https://stockpile-api-reqn7ab5ea-as.a.run.app/itemAPI';
  axios.get(apiURL).then(res => {
    this.posts = res.data;      


  }).catch(error => {
    console.log(error)
  });
},
  },
};
</script>