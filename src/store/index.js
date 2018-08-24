import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    loadedMeetups: [],

    // AUTHENTICATED USER
    user: null,
    loading: false,
    error: null
    // user: {
    //
    //   // id: 'aslkdaslkdlaskdlsakd12',
    //   // registeredMeetups: []  // LISTA MEETUP-OVA NA KOJE SE POJEDINI USER REGISTRIRAO
    // }

  },


  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    signUserUp(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    updateMeetupData(state, payload) {

      let meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })

      if(payload.title){
        meetup.title = payload.title
      }
      if(payload.description){
        meetup.description = payload.description
      }
      if(payload.date){
        meetup.date = payload.date
      }


    }
  },

  actions: {

    loadMeetups({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const object = data.val()
          for (let key in object) {
            meetups.push({
              id: key,
              title: object[key].title,
              description: object[key].description,
              imageURL: object[key].imageUrl,
              date: object[key].date,
              time: object[key].time,
              creatorId: object[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false)
        })
    },


    createMeetup({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      };
      // POD ACTIONIMA CEMO ODRAĐIVATI POZIVE NA BAZU KAKO BI ZAPISALI PODATKE U TU BAZU
      // ACTIONS JE MJESTO GDJE ODRAĐUJEMO ASINKRON KOD U VUEX-U!
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)  // REF FUNKCIJA METODA NA BAZU DOPUSTA DA SE PRENESE ARGUMENT KOJI SE ODNOSI NA NOD U NASOJ BAZI PODATAKA POD KOJU ZELIMO SACUVATI PODATKE
      // PUSH METODA NAM OMOGUĆAVA DA ZAPIŠEMO LISTU PODATAKA U BAZU
      // SET METODA OMOGUCAVA ZAPISIVANJA SIGNLE OBJEKTA !!!
      // UPDATE METODA OMOGUCAVA DA UPDEJTAMO SINGLE ITEM !!!
      // ZA PROCES UPLOADA SLIKE NA FIREBASE KORISTIMO 3 KORAKA. 1. ZELIMO DA SLIKA BUDE VEZANA ZA KREIRANI MEETUP PREKO ID-A, KOJEG KREIRA FIREBASE PRILIKOM OBJAVE MEETUP-A. PRVO UPLOADAMO PODATKE KOJE TRENUTNO IMAMO NA FIREBASE KOJI KREIRA UNIQUE ID ZA TAJ MEETUP, KOJI ONDA POVEZEMO SA SLIKOM. NAKON SEUCCESS RESPONSA, DOBIVAMO URL IMAGEa. NAKON TOGA POZOVEMO FIREBASE BAZU PONOVNO I UPDEJTAMO MEETUP SA TIM LINKOM NA SLIKU !
        .then(res => {
          key = res.key;
          // commit('createMeetup', {...meetup,id :key})
          return key
        })
        .then(key => {
          // NA OVOJ LOKACIJI DOHVAĆAMO FIREBASE STORAGE ! PRVO ODREĐUJEMO FILE NAME A NJEGA MOZEMO DOBITI IZ PAYLOADA KOJI SE POSLAO SA CREATE MEETUP-A
          const filename = payload.image.name
          const extention = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref('meetups/' + key + '.' + extention).put(payload.image)
        })
        .then(imageInfo => {
          // NA OVOJ LOKACIJI IZVLACIMO IMAGE URL KOJI SMO DOBILI KAO RETURN USPUJEŠNOG UPLODA IZ PROŠLE METODE GDJE SMO SAČUVALI SLIKU POD NAZIVOM ID-A I EXTENZIJE
          imageUrl = imageInfo.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({
            imageUrl: imageUrl
          })
        })
        .then(() => {
          commit('createMeetup', {...meetup, id: key, imageURL: imageUrl})
        })
        .catch(error => {
          console.log(error);
        });
    },

    signUserUp({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('signUserUp', newUser)
          this.$router.push('/')
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },

    signUserIn({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('signUserUp', newUser)
            this.$router.push('/')
          }
        )
        .catch(
          err => {
            commit('setLoading', false)
            commit('setError', err)
          }
        )
    },

    autoSignIn({commit}, payload) {
      commit('signUserUp', {id: payload.uid, registeredMeetups: []})
    },
    clearError({commit}) {
      commit('clearError')
    },


    logOut({commit}) {
      firebase.auth().signOut()
      commit('signUserUp', null)
    },

    updateMeetup({commit}, payload) {
      commit('setLoading', true)
      const updateObject = {}
      updateObject.id = payload.id
      if (payload.title) {
        updateObject.title = payload.title
      }
      if (payload.description) {
        updateObject.description = payload.description
      }
      if (payload.date) {
        updateObject.date = payload.date
      }

      firebase.database().ref('meetups').child(payload.id).update(updateObject)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetupData', payload)
        })

        .catch(error => {
          console.log(error);
          commit('setLoading', false)
        })


    }


  },


  // GETTERSI SLUZE KAKO BI SE MOGLI KORISTITI NA DRUGIM LOKACIJAMA U APLIKACIJI

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date // KOMPARIRA POJEDINI MEETUP PO DATUMU
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
// GETTERSE POSTAVLJAMO KAKO BI MEETUPSE KORISTILI NA DRUGIM LOKACIJAMA U APLIKACIJI

})
