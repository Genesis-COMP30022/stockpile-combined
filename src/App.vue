<template>
    <v-app>
    
        <NaviBar/>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import NaviBar from './components/NaviBar';
// import CardBody from './components/CardBody'; 

export default {
  name: 'App',

  components: {
    NaviBar,
  },

  data: () => ({
    //
  }),
};
</script>
