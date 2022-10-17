<template>
    <v-card>
        <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
        </v-card-title>

        <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>
        <p>test</p>
        </v-card-actions>
    </v-card>
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
  }),
  props: {
    itemName: String,
    id: String,
    price: Number,
    date: String,
    cat: String,
    buyer: String,
    buyerID: String,
    img: String,
    desc: String,
  },
  methods: {      
    close () {
      this.$emit('close');        
    }
  }
};

</script>