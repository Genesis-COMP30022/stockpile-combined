<template>
    <v-app>
        <div v-if="$auth.state.isAuthenticated">
        <NaviBar/>
        </div>
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

  }),
};
</script>
