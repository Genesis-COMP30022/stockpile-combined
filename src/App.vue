<template>
  <v-app>
    <div v-if="$auth.state.isAuthenticated">
      <NaviBar />
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NaviBar from "./components/NaviBar";
import axios from "axios";
// import CardBody from './components/CardBody';

export default {
  name: "App",

  watch: {
    $route: {
      immediate: true,
      handler() {
        if (
          window.location.pathname != "/settings" &&
          window.location.pathname != "/"
        ) {
          this.loadUser();
        }
      },
    },
  },

  methods: {
    loadUser() {
      let oneUserAPI =
        "https://stockpile-api-reqn7ab5ea-as.a.run.app/userAPI/getusermail/" +
        this.$auth.state.user.email;
      axios
        .get(oneUserAPI)
        .then((res) => {
          this.currentuser = res.data;
          this.checkNullFamily();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkNullFamily() {
      if (this.currentuser.family == "null") {
        window.location.href = "/settings";
      }
    },
  },

  components: {
    NaviBar,
  },

  data: () => ({
    currentuser: [],
  }),
};
</script>
