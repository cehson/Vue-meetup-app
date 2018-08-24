import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import Alert from './components/Shared/AlertComponent'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'

Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.component('app-alert', Alert)
Vue.component('add-edit-meetup-dialog', EditMeetupDetailsDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyD2fIRqKwyidFYrNEI_84uk0mwOOnwFWs4",
      authDomain: "meetupapp-6b6a6.firebaseapp.com",
      databaseURL: "https://meetupapp-6b6a6.firebaseio.com",
      projectId: "meetupapp-6b6a6",
      storageBucket: "gs://meetupapp-6b6a6.appspot.com",
    }),

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      })
      this.$store.dispatch('loadMeetups')


  }

});
