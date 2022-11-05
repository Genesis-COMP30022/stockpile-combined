<template>
  <v-container fluid> 
    <h1 align="" class="mb-3 ml-2">User settings</h1>
    <v-form @submit.prevent="saveUser" v-model="valid">
        <v-container style="max-width=200px">
            <v-row class="ml-0">
                <p>To update personal information such as name or email, please visit <a href="https://myaccount.google.com/personal-info">Google Accounts</a>.</p>
            </v-row>
            <v-row>
                            <v-img
                    :lazy-src="this.$auth.state.user.picture"
                    max-height="5rem"
                    max-width="5rem"
                    :src="this.$auth.state.user.picture"
                    ></v-img>

                <v-col
                    cols="12"
                    md="5"
                >
                    <v-text
                    >{{this.$auth.state.user.name}}</v-text>
                </v-col>

                <v-col
                    cols="12"
                    md="5"
                >
                    
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        ref="updated_at"
                        disabled
                        label="Last Login"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="new Date(this.$auth.state.user.updated_at).toLocaleDateString('en-AU')"
                    ></v-text-field>
                </v-col>
                                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field   
                        ref="id"
                        label="Email"
                        prepend-icon="mdi-fingerprint"
                        required
                        filled
                        :value="this.$auth.state.user.email"
                        disabled
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        ref="role"
                        :items="roles"
                        :rules="rolerules"
                        label="Role"
                        required
                        filled
                        disabled
                        prepend-icon="mdi-star-circle"
                        :value="this.currentuser.role"
                        v-if="this.currentuser.role == 'Admin'"
                    ></v-text-field>
                </v-col>


                                <v-col
                    cols="12"
                    md="5"
                >
                    <v-text-field
                        ref="family_id"
                        disabled
                        label="Family ID"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="this.currentuser.family"
                        v-if="this.currentuser.family != 'null'"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        ref="family_name"
                        label="Family name"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="this.currentuser.family_name"
                        v-if="this.currentuser.family != 'null' && this.currentuser.role == 'Admin'"
                    ></v-text-field>
                    <v-text-field
                        ref="family_name"
                        label="Family name"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        disabled
                        :value="this.currentuser.family_name"
                        v-if="this.currentuser.family != 'null' && this.currentuser.role == 'User'"
                    ></v-text-field>
                </v-col>
                

            </v-row>

            <div v-if="this.currentuser.family == 'null'">
            <v-row class="ml-0">
                <p><b>Attention</b>: You are not currently assigned to a family. Ask an admin to add you to their family, or create one by clicking the button below</p>
            </v-row>

            <v-row>
                <v-col

                    class="shrink mr-2 mt-0 py-0"
                    cols="12"
                    md="3"
                >
 
                </v-col>
            </v-row>

            <v-row class="ml-0">
                            <v-col
                    cols="12"
                    md="12"
                    align="left"
                    class="pl-0"
                >
                    <p>More options will be available once you are assigned to a family.</p>
                </v-col>
            </v-row>
            </div>


            <div v-if="this.currentuser.role == 'Admin'">
            <v-row class="ml-0">
                <p>You can remove users from your family here.</p>
            </v-row>

            <v-row>
                <v-col
                    class="shrink mr-2 mt-0 py-0"
                    cols="12"
                    md="10"
                >
                    <v-combobox
      v-model="itemData.peopleinfamily"
      chips
      clearable
      label="Your family"
      multiple
      prepend-icon="mdi-account-group"
      solo
    >
      <template v-slot:selection="{ peopleinfamily, item, selected }">
        <v-chip
          v-bind="peopleinfamily"
          :input-value="selected"
          close
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>
                </v-col>
            </v-row>

            <v-row>

                <p>You can add users to your family by adding their emails here</p>
                                <v-col
                    class="shrink mr-2 mt-0 py-0"
                    cols="12"
                    md="10"
                >
                    <v-combobox
                    v-model="itemData.addtofamily"
                    chips
                    clearable
                    label="Type user email, then press enter to confirm"
                    multiple
                    prepend-icon="mdi-account-group"
                    solo
                    >
                    <template v-slot:selection="{ addtofamily, item, selected }">
                        <v-chip
                        v-bind="addtofamily"
                        :input-value="selected"
                        close
                        @click:close="remove(item)"
                        >
                        <strong>{{ item }}</strong>&nbsp;
                        </v-chip>
                    </template>
                    </v-combobox>
                </v-col>
            </v-row>
            </div>

            <v-row v-if="this.currentuser.role == 'Admin'" class="ml-1 pb-12">

                <v-btn
                    depressed
                    color="primary"
                    class="mr-4"
                    @click="saveUser"
                >
                    <v-icon left>mdi-check</v-icon>
                    Submit
                </v-btn>

                <v-btn
                    depressed
                    color="sWhiteBlue"
                    class="mr-4"
                >
                    <v-icon left>mdi-eraser-variant</v-icon>
                    Clear
                </v-btn>

            </v-row>
            <v-row v-if="this.currentuser.family == 'null'" class="ml-1 pb-12">

                <v-col
                    cols="10"
                    md="4"
                >
                    <v-text-field
                        ref="family_name"
                        label="Family name"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="this.currentuser.family_name"
                        v-if="this.currentuser.family == 'null'"
                    ></v-text-field>
                </v-col>

            </v-row>
            <v-row v-if="this.currentuser.family == 'null'" class="ml-1 pb-12">

                <v-btn
                    depressed
                    color="primary"
                    class="mr-4"
                >
                    <v-icon left>mdi-check</v-icon>
                    Create new family
                </v-btn>

            </v-row>

            
        </v-container>
    </v-form>
    <v-dialog
        v-model="dialog"
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
import uuid from "uuid";
export default {
    
  name: 'UserSettingsForm',

    watch: {
    $route: {
      immediate: true,
      handler() {
        this.loadPosts();
      },
    },
  },


  methods: {
    remove(item) {
      const index = this.itemData.peopleinfamily.indexOf(item);
      if (index > -1) { // only splice array when item is found
        this.itemData.peopleinfamily.splice(index, 1); // 2nd parameter means remove one item only
        //this.itemData.peopleinfamilyID.splice(index, 1)
        this.itemData.removefromfamily.push(this.itemData.peopleinfamilyID[index])
      }
    },
    getCurrentFamilyEmails(){
        for (var item in this.familyinfo){
            if(this.familyinfo[item].email != this.currentuser.email){
                this.itemData.peopleinfamily.push(this.familyinfo[item].email)
                this.itemData.peopleinfamilyID.push(this.familyinfo[item])
            }
        }
    },
    isAdmin(){
        return (this.currentuser.role == "Admin")
    },
    loadPosts: async function () {
      let oneUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"+this.$auth.state.user.email;
      await axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
        let familyUserAPI = "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getpeopleinfamily/"+this.currentuser.family;
    axios
        .get(familyUserAPI)
        .then((res) => {
          this.familyinfo = res.data;
          this.getCurrentFamilyEmails();
        })
        .catch((error) => {
          console.log(error);
        });
        this.dialog = false

        
    },
    saveUser() {
     this.dialogone = true;
    this.addUserToFamily();
    this.removeUserFromFamily();
    console.log("reached")
    setTimeout(() => { 
      this.dialogone = false 
        window.location.reload()
    }, 1000);
    
    },
    resetForm(newText) {
      this.text = newText;
      this.snackbar = true;
      this.$refs.itemData.reset();
    },
    // for new user where family == null
    newFamily() {

    if (this.currentuser.family == "null"){
        this.itemData.family = uuid.v4().replace(/-/g, "")
    }

      let apiURL =
        "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/new-family"+this.currentuser._id;

      axios
        .post(apiURL, this.itemData)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },



// EDIT THIS FOR UPDATING FAMILY 
    async addUserToFamily(){
      for (var index in this.itemData.addtofamily) {
        let userEmail = this.itemData.addtofamily[index];

        let apiURL =
          "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/"
          + userEmail;

        console.log(apiURL);
        //var user;
        let userID = "123";
        await axios
          .get(apiURL)
          .then((res) => {
            userID = res.data._id;
            // console.log("in axios")
            // console.log(userID);
          })
          .catch((error) => {
            console.log(error);
          });



        if (userID == "123"){
          return; // user not registered in database
        }

        console.log("passed check")

        apiURL =
          "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/update-user/"
          + userID;


        console.log("outside axios")
        console.log(apiURL)
        
        await axios
          .put(apiURL, {
            family: this.currentuser.family,
            family_name: this.currentuser.family_name,
            //addtofamily: this.itemData.addtofamily,
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }

      return

        
      // this.text = this.id + "yeah";
      // this.snackbar = true;
      // this.dialogone = false;
      // this.$refs.itemData.reset();
    },

    removeUserFromFamily() {
      for (var index in this.itemData.removefromfamily){
        let userID = this.itemData.removefromfamily[index]._id;
        console.log(userID);
        let apiURL =
          "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/update-user/"
          + userID;
      
        axios
          .put(apiURL, {
            family: "null",//this.itemData.family,
            family_name: "null",//this.itemData.family_name,
            //addtofamily: this.itemData.addtofamily,
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
        }

    return

    // console.log("yeah")
    
    
    
    //   this.text = this.id + "yeah";
    //   this.snackbar = true;
    //   this.dialogone = false;
    //   this.$refs.itemData.reset();
      
    },
  },



  data: () => ({
    dialogone: false,
    itemData: {
      family: "",
      family_name: "",
      peopleinfamily: [],
      peopleinfamilyID: [],
      addtofamily: [],
      removefromfamily:[],
    },
    dialog: true,
    currentuser: [],
    familyinfo: [],
    valid: false,
    roles: ['Regular', 'Admin'],
    nameRules: [
      name => !!name || 'Name is required',
      name => (name && name.length <= 60) || 'Name must be 50 characters or less',
    ],
    familyrules: [
      fam => fam ? ((fam.length <= 50) || 'Family must be 50 characters or less') : true,
    ],
    newuserrules: [
        newu => newu ? ( /^\d{24}(, \d{24})*$/.test(newu) || 'Does not contain comma-plus-space-separated UIDs (contain 24 digits)') : true,
    ],
  }),
};

</script>