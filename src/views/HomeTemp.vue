<template>
  <v-container fluid> 
      <h1 align="" class="mb-3 ml-2">Welcome to Stockpile</h1>
      <h2 align="" class="mb-3 ml-2">This page currently shows all items</h2>
          <v-data-iterator
        :items="posts"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
            <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="item.image"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-card-title> {{ item.name }}</v-card-title>
      </v-img>

  
      <v-card-text class="text--primary">
        <div>                <v-list dense>
                  <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                  >
                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                      {{ key }}:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }"
                    >
                      {{ item[key.toLowerCase()] }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list></div>
      </v-card-text>
  
      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          View Item
        </v-btn>

      </v-card-actions>
    </v-card>
            </v-col>
          </v-row>
        </template>
  
        <template v-slot:footer>
          <v-row
            class="mt-2"
            align="center"
            justify="center"
          >
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
  
            <v-spacer></v-spacer>
  
            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
      <v-spacer></v-spacer>
      <br>

  </v-container>
  
</template>


<script>
import axios from "axios";

export default {
  
  name: "HomeTemp",
  data: () => ({
    show: false,
    itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: 'name',
      keys: [
        'Name',
        'Price',
        'desc',
        'Category',
        'purchaseDate',
        'Buyer',
        'Image',
      ],
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
    computed: {
    numberOfPages () {
      return Math.ceil(this.posts.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Image')
    },
  },
  
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
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
  },
};
</script>