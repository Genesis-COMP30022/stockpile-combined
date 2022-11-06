import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import { Auth0Plugin} from "@marketredesign/auth0-spa-vue";

Vue.use(Auth0Plugin, {
  domain: 'stockpileapp.au.auth0.com',
  clientId: '3JsGVywVUSMpZWdt230wRMNnWyohkkZC',
  onRedirectCallback: appState => {

    
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : 'settings'
    );
  }
});




Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
