<template>
  <v-container class="mt-2">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>

        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>


              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>


              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="confirmedPassword"
                    label="Confirm Password"
                    id="confirmedPassword"
                    v-model="confirmedPassword"
                    type="password"
                    required
                    :rules="[passwordCheck]"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>


              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                  >
                    Sign Up
                    <span slot="loader" class="custom-loader">
                      <v-icon light>
                        cached
                      </v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>

            </form>
          </v-container>
        </v-card-text>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "signup",

    data() {
      return {
        email: '',
        password: '',
        confirmedPassword: ''
      }
    },
    computed: {
      passwordCheck() {
        return this.password !== this.confirmedPassword ? 'Paswoords dont match' : ''
      },
      user() {
        return this.$store.getters.user
      },
      error() {
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },

    watch: {
      // watcher prati promjenu na computed propertiju "user"

      user(value) {   // value je vrijednost getter-a kada nam vrati neku vrijednost
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }

    },

    methods: {
      onSignup() {
        // ovdje dozivamo firebase i kreiramo usera preko VUEX action-a, jer zelimo
        // spremiti usera u VUEX store !
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      }
    },

  }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
