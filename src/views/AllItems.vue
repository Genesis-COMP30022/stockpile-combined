<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="#0264a6" class="pa-4">
        <v-avatar class="mb-4" color="grey lighten-1" size="64"></v-avatar>

        <div>user@stockpileapp.au</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#004D80">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        ><a href="/"
          ><v-img
            max-height="8rem"
            max-width="12rem"
            :src="require('@/assets/whitecropped.svg')"
          ></v-img></a
      ></v-toolbar-title>

      <v-speed-dial v-model="fab" direction="bottom" absolute right>
        <template>
          <v-btn color="primary">
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-pencil-outline </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
                    <template>
                <v-btn color="red" v-on="on" outlined="">
                  <v-icon left>add</v-icon> ADD
                </v-btn>
            </template>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>

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
            <v-btn icon>
              <v-icon>local_offer</v-icon>
            </v-btn>
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
                  append-icon="search"
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
            <v-icon small>mdi-pencil</v-icon>
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
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Dashboard"],
      ["mdi-send", "All Items"],
      ["mdi-delete", "Create"],
      ["mdi-delete", "Search"],
      ["mdi-cog", "Settings"],
      ["mdi-alert-octagon", "Logout"],
    ],
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        title: "[NUM]",
        artist: "Number of Items",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        title: "[NUM]",
        artist: "Value of all items",
      },
    ],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
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
  let apiURL = 'http://localhost:4000/api';
  axios.get(apiURL).then(res => {
    this.posts = res.data;
  }).catch(error => {
    console.log(error)
  });
},

    onScroll (e) {
      if(typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop(){
      this.$vuetify.goTo(0)
    },
    close(){
      this.dialog = false
      setTimeout(()=>{
        this.postData = Object.assign({}, this.default)
        this.editedIndex = -1
      }, 300)
    },
    savePost: async function(){
        if(this.editedIndex > -1) {
         this.updatePost();
        }else {
          this.createPost();
        }
    },
    createPost(){
      let apiURL = 'http://localhost:4000/api/create-post';
        axios.post(apiURL, this.postData).then(() => {
          this.postData = {
            name: '',
            description: '',
          }
          this.close();
          this.loadPosts();
          this.color = 'success'
          this.text ='Post has been successfully saved.'
          this.snackbar = true;
        }).catch(error => {
          console.log(error)
        });
    },
    editPost(item) {
      this.editedIndex = this.posts.indexOf(item)
      this.postData = Object.assign({}, item)
      this.dialog = true
    },
    updatePost(){
      let apiURL = `http://localhost:4000/api/update-post/${this.postData._id}`;
      axios.post(apiURL, this.postData).then((res) => {
        console.log(res)
        this.close();
        this.loadPosts();
        this.color ='info'
        this.text = 'Post has been modified.'
        this.snackbar = true;
      }).catch(error => {
        console.log(error)
        console.log(this.$route.params.id)
      })
    },
     deletePost(id){
  this.$swal({
                    title: 'Are you sure?',
                    text: "Save changes?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#00b894',
                    cancelButtonColor: '#d63031',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    }).then((result) => {
                        // Send request to the server
                         if (result.value) {
                               try {
                let apiURL = `http://localhost:4000/api/delete-post/${id}`;
                let indexOfArrayItem = this.posts.findIndex(i => i._id === id);
                axios.delete(apiURL).then(() => {
                        this.posts.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                 this.$swal(
                         'Deleted!',
                         'Post has been deleted.',
                         'success'
                        )
                        //Notification error
                this.color = 'error'
                this.text = "Post has been deleted."
                this.snackbar = true;
                //Notification error
            }catch (error) {
             this.$swal("Error!", "Something went wrong.", "warning");
            }
                         }
                    })
  
            },
  },
};
</script>












