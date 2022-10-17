<template>
  <v-app id="inspire">
    

      <v-divider></v-divider>
       <v-main>
        <v-container
        class="scroll-y"
        fluid
        >
        <v-row
        align="center"
        justify="center"
        >
        <v-col>
          <v-card class="ml-5 mr-5">
            <v-app-bar
            dark
            color="#2C3A47"
            >
          <v-toolbar-title>All items</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template>
                <v-btn color="red" v-on="on" outlined="">
                  <v-icon left>add</v-icon> ADD
                </v-btn>
            </template>
              <v-card>
                <v-form @submit.prevent="savePost" ref="postData" lazy-validation enctype="multipart/form-data" autocomplete="off">
                  <v-card-title>
                    <span class="headline">Posts</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Name*"  v-model="postData.name" color="#2C3A47"></v-text-field>
                      </v-flex>
                  <v-flex xs12 sm12 md12>
                        <v-text-field label="Desscription" v-model="postData.description" color="#2C3A47"></v-text-field>
                    </v-flex>
                    </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#2C3A47" dark @click="close" outlined small>
                      <v-icon left>exit_to_app</v-icon> Close
                    </v-btn>
                    <v-btn color="light-green darken-4" dark type="submit" outlined small>
                      <v-icon left>save</v-icon> {{saveDialog}}
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
          </v-dialog>
            </v-app-bar>
            <v-container>
              <v-card class="mx-auto elevation-19">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                  v-model="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#2C3A47"
                  >
                  </v-text-field>
                </v-card-title>
        <v-data-table
        item-key="id"
        :headers="headers"
        :items="posts"
        :search="search"
        
        >
        <template>
          <v-btn color="success" class="mx-2" fab x-small @click="editPost(item)" outlined>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="pink" fab x-small @click="deletePost(item._id)" outlined>
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template>
            <v-alert :value="true" color="pink" icon="warning" dark>
              Your Search {{search}} does not exist.
            </v-alert>
        </template>

        </v-data-table>
              </v-card>
            </v-container>
          </v-card>
          <v-snackbar
          v-model="snackbar"
          top
          right
          :color="color"
          >
          {{text}}
          <v-btn
          color="black"
          text
          @click="snackbar = false"
          >
          Done
          </v-btn>

          </v-snackbar>
        </v-col>

        </v-row>

        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeTemp",
  data: () => ({
    mini: false,
    dialog:false,
    fab: false,
    search:'',
    snackbar: false,
    text:'',
    color:'',
    posts:[],
    headers: [
        {text: 'Name', value: 'name', sortable: true},
        {text: 'Description', value: 'description', sortable: false},
        {text: 'Action', value: 'actions', sortable: true, width: '180px'},
    ],
    postData: {
      name: '',
      description:''
    },
    default: {
      name: '',
      description:''
    },
    editedIndex: -1,

   
  }),
    watch: {
    dialog (val) {
      val || this.close()
    }
  },
  computed: {
    saveDialog() {
      return this.editedIndex === -1 ? 'Save' : 'Edit'
    }
  },
  mounted() {
    this.loadPosts();
  },
  methods: {
loadPosts: async function(){
  let apiURL = 'http://localhost:4000/itemAPI';
  axios.get(apiURL).then(res => {
    this.posts = res.data;
  }).catch(error => {
    console.log(error)
  });
},
  },
};
</script>







