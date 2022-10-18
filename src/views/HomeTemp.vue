<template>
  <v-app id="inspire">
  <v-container fluid> 
  <h1 align="" class="mb-3 ml-2">Welcome to Stockpile</h1>
  <h2 align="" class="mb-3 ml-2">Here is a list of all your family's items</h2>
    <v-main>
    
    <v-data-table
      :headers="headers"
      :items="posts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-img
          max-height="10rem"
          max-width="10rem"
          :src="item.image"
        ></v-img>
          
        </td>
      </template>
    </v-data-table>
    



    

    </v-main>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  
  name: "HomeTemp",
  data: () => ({
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
      { text: 'Image', value: 'image', align: ' d-none' },
      { text: 'Purchase date', value: 'datePurchased' },
      { text: 'Buyer', value: 'buyer' },
    ],
  }),
  
  mounted() {
    this.loadPosts()
  },
  methods: {
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







