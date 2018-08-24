<template>
  <v-container class="mt-0">
    <v-layout row>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="blue"
            indeterminate
            v-if="meetupsLoaded"
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>


    <v-layout row v-if="!meetupsLoaded">
      <v-flex xs12>
        <v-carousel >
          <v-carousel-item
            v-for="meetup in meetups"
            v-bind:key="meetup.id"
            v-bind:src="meetup.imageURL"
            @click="onLoadMeetup(meetup.id)"
          >
            <h2 class="title">{{meetup.title}}</h2>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
        <v-btn large router to="/meetups" class="info">
          Explore meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
        <v-btn large router to="/meetup/new" class="info">
          Organize meetups
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "home",
    computed: {        // COMPUTED PROPERTY JE NACIN PRIBAVLJANJA GETTERSA JER NAM UVIJEK VRAĆA NAJNOVJI STATE
      meetups() {
        return this.$store.getters.featuredMeetups
      },
      meetupsLoaded (){
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup(id) {
        this.$router.push("/meetups/" + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: rgba(0, 0, 6, 0.5);
    color: #fff;
  }
</style>
