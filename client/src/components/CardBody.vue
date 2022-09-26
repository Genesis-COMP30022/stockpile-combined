<template>
    <v-container fluid> 
        <h1 align="" class="mb-3 ml-2">Recent purchases</h1>
        <v-row>
        <v-col 
            v-bind:key="n" 
            v-for="n in 10" 
            cols="12" 
            sm="6" 
            md="4" 
            lg="3"
        >   
          <CardItem/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

import CardItem from './CardItem'

export default {
  name: 'CardBody',

  components: {
    CardItem
  },

  data: () => ({
    //
  }),
};

</script>
