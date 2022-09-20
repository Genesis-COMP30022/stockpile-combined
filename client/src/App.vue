<template>
  <v-app>
    <NaviBar/>
    <v-main>
      <CardBody/>
    </v-main>
  </v-app>
</template>

<script>
import NaviBar from './components/NaviBar';
import CardBody from './components/CardBody';

export default {
  name: 'App',

  components: {
    NaviBar,
    CardBody
  },

  data: () => ({
    //
  }),
};
</script>
