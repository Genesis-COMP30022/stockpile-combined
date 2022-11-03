<template>
  <v-container fluid> 
    <h1 align="" class="mb-3 ml-2">User settings</h1>
    <v-form v-model="valid">
        <v-container style="max-width=200px">
            <v-row class="ml-0">
                <p>To create a new family group, simply type an unused name 
                    into the "Family group" box and submit the form.</p>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    md="5"
                >
                    <v-text-field
                        ref="fullname"
                        :rules="nameRules"
                        :counter="50"
                        label="Full name"
                        prepend-icon="mdi-face-man-shimmer"
                        required
                        filled
                        :value="this.$auth.state.user.name"
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="5"
                >
                    <v-combobox
                        ref="fullname"
                        :rules="familyrules"
                        :items="families"
                        item-text="name"
                        item-value="name"
                        :counter="50"
                        label="Family group"
                        prepend-icon="mdi-human-male-female-child"
                        required
                        :return-object="false"
                        filled
                        value="Unknown"
                    >
                        <template v-slot:item="data">
                            <v-list-item-content>
                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                <v-list-item-subtitle v-html="'ID: ' + data.item.id"></v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-combobox>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        ref="signupdate"
                        disabled
                        label="Sign up date"
                        prepend-icon="mdi-ray-start-vertex-end"
                        filled
                        :value="this.$auth.state.user.created_at"
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-autocomplete
                        ref="role"
                        :items="roles"
                        :rules="rolerules"
                        label="Role"
                        required
                        filled
                        prepend-icon="mdi-star-circle"
                        :value="loginuser.role"
                    ></v-autocomplete>
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
                    md="10"
                >
                <p>Current picture</p>
                <v-img
                    :lazy-src="this.$auth.state.user.picture"
                    max-height="5rem"
                    max-width="5rem"
                    :src="this.$auth.state.user.picture"
                    ></v-img>
                    <br>
                    <v-file-input
                        ref="img"
                        label="Upload avatar (optional)"
                        show-size
                        filled
                        :rules="imgrules"
                        prepend-icon="mdi-image"
                        accept="image/png, image/jpeg, image/bmp, image/gif"
                    ></v-file-input>
                </v-col>


            </v-row>

            <v-row class="ml-0">
                <p><b>Admin settings</b>: You can remove users from <em>{{loginuser.familyGroup}}</em> by unchecking them.</p>
            </v-row>

            <v-row>
                <v-col
                    v-bind:key="id"
                    v-for="[id,name] in userlinks"
                    class="shrink mr-2 mt-0 py-0"
                    cols="12"
                    md="3"
                >
                    <v-checkbox
                        class="mt-1"
                        input-value="true"
                    >
                        <template v-slot:label>
                            <span>{{name}}<br><span style="font-size: 12px">UID: {{id}}</span></span>
                        </template>
                    </v-checkbox>
                </v-col>
            </v-row>

            <v-row class="ml-0">
                <p>You can add users by adding their user ID numbers, separated by comma-plus-space, to this field.</p>
                <v-col
                    cols="12"
                    md="10"
                    align="center"
                    class="pl-0"
                >
                    <v-text-field
                        label="User IDs to join group (comma-plus-space separated)"
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
  </v-container>
</template>

<script>

export default {
  name: 'UserSettingsForm',

  components: {
    
  },

  data: () => ({
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