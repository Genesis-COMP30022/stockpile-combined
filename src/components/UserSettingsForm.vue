<template>
  <v-container fluid> 
    <h1 align="" class="mb-3 ml-2">User settings</h1>
    <v-form v-model="valid">
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
                        ref="family_id"
                        disabled
                        label="Family ID"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="this.currentuser.family"
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
                    ></v-text-field>
                </v-col>
                

            </v-row>

            <v-row class="ml-0">
                <p><b>Admin settings</b>: You can remove users from your family by unchecking them.</p>
            </v-row>

            <v-row>
                <v-col
                    v-bind:key="item"
                    v-for="item in this.familyinfo"
                    class="shrink mr-2 mt-0 py-0"
                    cols="12"
                    md="3"
                >
                    <v-checkbox
                        class="mt-1"
                        input-value="true"
                    >
                        <template v-slot:label>
                            <span>{{item.name}}<br><span style="font-size: 12px">Email: {{item.email}}</span></span>
                        </template>
                    </v-checkbox>
                </v-col>
            </v-row>

            <v-row class="ml-0">
                <p>You can add users to your family by adding their user ID numbers, separated by comma-plus-space, to this field.</p>
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

            <v-row class="ml-1 pb-12">

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
export default {
  name: 'UserSettingsForm',

created() {
    this.loadPosts();
  },

  methods: {
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
        })
        .catch((error) => {
          console.log(error);
        });
        this.dialog = false
    },
  },

  data: () => ({
    dialog: true,
    currentuser: [],
    familyinfo: [],
    valid: false,
    families: [
        {name: 'Smith family',  id: '359821094206097491489543'}, 
        {name: 'Bloggs family', id: '249356045784918402938462'}, 
        {name: 'Jones family', id: '697804589141350971094068'}, 
        {name: 'Unknown family', id: '954395350396936044050687'}
    ],
    roles: ['Regular', 'Admin'],
    nameRules: [
      name => !!name || 'Name is required',
      name => (name && name.length <= 60) || 'Name must be 50 characters or less',
    ],
    familyrules: [
      fam => fam ? ((fam.length <= 50) || 'Family must be 50 characters or less') : true,
    ],
    agerules: [
      age => !!age || 'Age is required',
      age => (age && age.length <= 10) || 'Age must be 10 characters or less',
      age => (age < 150 && age > 4) || 'Please give your real age',
    ],
    rolerules: [
      role => !!role || 'A role is required',
    ],
    newuserrules: [
        newu => newu ? ( /^\d{24}(, \d{24})*$/.test(newu) || 'Does not contain comma-plus-space-separated UIDs (contain 24 digits)') : true,
    ],
    imgrules: [
      value => !value || value.size < 2000000 || 'Image size must be less than 2 MB!',
    ],
    loginuser: {
        fullName: 'Queen Elizabeth II',
        userID: '464395350250360440505555',
        familyGroup: 'Unknown family',
        familyGroupID: '954395350396936044050687',
        age: '96',
        role: 'Admin',
    },
    userlinks: [
        ['478563954', 'King Charles III'],
        ['194256982', 'Catherine, Princess of Wales'],
        ['901240464', 'William, Prince of Wales'],
        ['368203507', 'Prince Harry, Duke of Sussex'],
        ['347323259', 'Anne, Princess Royal'],
        ['112947802', 'Prince Andrew, Duke of York'],
    ],
  }),
};

</script>