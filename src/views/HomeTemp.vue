<template>
  <v-container fluid> 
      <h1 align="" class="mb-3 ml-2">Welcome to Stockpile</h1>
    <v-data-table 
      :headers="headers"
      :items="posts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand

      class="elevation-1"
    >
    <template v-slot:[`item.datePurchased`]="{ item }">
    <span>{{ new Date(item.datePurchased).toLocaleDateString('en-AU') }}</span>
  </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>All Items</v-toolbar-title>
          <v-spacer></v-spacer>
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

  </v-container>
  
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
      { text: 'Purchase date', value: 'datePurchased'},
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