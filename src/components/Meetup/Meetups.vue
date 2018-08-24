<template>
  <v-container class="mt-0">
    <v-layout row wrap class="mt-1">
      <v-flex xs12>
        <v-card class="info mb-2" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="meetup.imageURL"
                  height="225px"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs5>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text">{{meetup.title}}</h5>
                    <div>
                      {{meetup.date}} {{meetup.time}}
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meetup.id">
                    <v-icon left>arrow_forward</v-icon>
                    View meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: 'meetups',
    computed: {
      meetups() {
        return this.$store.getters.loadedMeetups;
      }
    }


  }
</script>

<style scoped>

</style>
