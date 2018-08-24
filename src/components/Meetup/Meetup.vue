<template>
  <v-container mt-2>
    <v-layout row v-if="loaded">
      <v-flex xs12>
        <div class="text-xs-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>

             {{meetup.title}}

            <template v-if="userIsCreator">
              <v-spacer>
              </v-spacer>
              <add-edit-meetup-dialog
                :meetup="meetup"
              >

              </add-edit-meetup-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageURL"
            height="425px"
          >
          </v-card-media>
            <v-card-text>
              <div class="info--text">{{meetup.date}}</div>
              <div>{{meetup.description}}</div>
            </v-card-text>
              <v-card-actions>
                <v-spacer>

                </v-spacer>
                <v-btn class="primary">
                  Register
                </v-btn>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "meetup",
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id)
      },
      loaded() {
        return this.$store.getters.loading
      },
      userIsAuthenticated (){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if(!this.userIsAuthenticated){
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    }
  }
</script>

<style scoped>

</style>
