import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify, {
  iconfont: "md",
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        sDarkBlue: "#002e6e",
        sWhiteBlue: "#e9f4fd",
        sLightBlue: "#54a3eb",
        sBlue: "#0171bc",
        sYellow: "#fcba29",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
