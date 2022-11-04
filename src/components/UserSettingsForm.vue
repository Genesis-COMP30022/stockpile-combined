<template>
  <v-container fluid> 
    <h1 align="" class="mb-3 ml-2">User settings</h1>
    <v-form @submit.prevent="saveUser" v-model="valid">
        <v-container style="max-width=200px">
            <v-row class="ml-0">
                <p>To update personal information such as name or email, please visit <a href="https://accounts.google.com">Google Accounts</a>.</p>
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
                        v-if="this.currentuser.family != 'null'"
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
                <p><b>Admin settings</b>: You can remove users from your family by unchecking them.</p>
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
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>
                </v-col>
            </v-row>

            <v-row class="ml-0">

                <p>You can add users to your family by adding their emails, separated by comma-plus-space, to this field.</p>
                <v-col
                    cols="12"
                    md="10"
                    align="center"
                    class="pl-0"
                >
                    <v-text-field
                        label="User emails to join group (comma-plus-space separated)"
                        filled
                        ref="newusers"
                        :rules="newuserrules"
                    ></v-text-field>
                </v-col>
            </v-row>
            </div>

            <v-row v-if="this.currentuser.role == 'Admin'" class="ml-1 pb-12">

                <v-btn
                    depressed
                    color="primary"
                    class="mr-4"
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
    removeChip (item) {
      this.this.itemData.peopleinfamily.splice(this.chips.indexOf(item), 1)
    },
    getCurrentFamilyEmails(){
        for (var item in this.familyinfo){
            this.itemData.peopleinfamily.push(this.familyinfo[item].email)
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
        savePost: async function () {
      //console.log("it is working");
      this.updateUser();
    },
    resetForm(newText) {
      this.text = newText;
      this.snackbar = true;
      this.$refs.itemData.reset();
    },
    updateUser() {

    if (this.currentuser.family == "null"){
        this.itemData.family = uuid.v4().replace(/-/g, "")
    }


      let apiURL =
        "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/update-user";

      axios
        .post(apiURL, this.itemData)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },

  data: () => ({
    itemData: {
      family: "",
      family_name: "",
      peopleinfamily: [],
      addtofamily: [],
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