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
                        value="Suzanne Cowler"
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
                        :counter="50"
                        label="Family group"
                        prepend-icon="mdi-human-male-female-child"
                        required
                        filled
                        value="Cowler family"
                    ></v-combobox>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        ref="age"
                        :rules="agerules"
                        :counter="10"
                        label="Age"
                        prepend-icon="mdi-ray-start-vertex-end"
                        required
                        filled
                        value="25"
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
                        value="Admin"
                    ></v-autocomplete>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        ref="id"
                        label="User ID number"
                        prepend-icon="mdi-fingerprint"
                        required
                        filled
                        value="464395350250360440505555"
                        disabled
                    ></v-text-field>
                </v-col>


            </v-row>

            <v-row class="ml-0">
                <p>(The following settings appear because you are an Admin.) You can remove users from your group by unchecking them.</p>
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
                        :label="name"
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
    families: ['Smith family', 'Bloggs family', 'Jones family', 'Cowler family'],
    roles: ['Regular', 'Admin'],
    nameRules: [
      name => !!name || 'Name is required',
      name => (name && name.length <= 60) || 'Name must be 50 characters or less',
    ],
    familyrules: [
      fam => fam ? (fam.length <= 50) || 'Family must be 50 characters or less' : true,
    ],
    agerules: [
      age => !!age || 'Age is required',
      age => (age && age.length <= 60) || 'Age must be 10 characters or less',
      age => (age < 150 && age > 4) || 'Please give your real age',
    ],
    rolerules: [
      role => !!role || 'A role is required',
    ],
    userlinks: [
        [478563954, 'John Smith'],
        [194256982, 'Andy Anderson'],
        [901240464, 'Jacinta Clark'],
        [368203507, 'Natalie Bassingthwaighte'],
        [347323259, 'Anthony Albanese'],
        [112947802, 'Gabriella Cilmi'],
    ],
    newuserrules: [
        newu => newu ? newu.match(/^\d{24}(, \d{24})*$/) || 'Does not contain comma-plus-space-separated UIDs (contain 24 digits)' : true,
    ]
  }),
};

</script>