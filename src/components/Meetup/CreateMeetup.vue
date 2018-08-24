<template>
  <v-container class="mt-1">
    <v-layout class="row">
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="submitTheMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="uploadFile">Upload image</v-btn>
              <input type="file"
                     style="display: none"
                     ref="fileInput"
                     accept="image/*"
                     @change="onFilePicked"
              >
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageURL" alt="" style="max-height: 70px;">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="desc"
                v-model="description"
                multi-line
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-4">
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose date</h4>
              <v-date-picker v-model="date">

              </v-date-picker>
              <p>{{date}}</p>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose time</h4>
              <v-time-picker v-model="time">

              </v-time-picker>
              <p>{{time}}</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                primary
                :disabled="!formIsValid"
                type="submit"
              >
                Create Meetup
              </v-btn>


            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: "create-meetup",

    data() {
      return {
        title: '',
        location: '',
        imageURL: '',
        description: '',
        date: '',
        time: new Date(),
        image: null // ovo je raw image uploadan
      }
    },
    computed: {
      formIsValid() {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageURL !== '' &&
          this.description !== ''
      }
    },
    methods: {
      submitTheMeetup(){
        if(!this.formIsValid || !this.image){
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image, // U BAZU CE SE SLIKA SPREMATI KAO BINARI, JER STRING BI BIO PREVELIK
          description: this.description,
          date: this.date,
          time: this.time
        }
        this.$store.dispatch('createMeetup',meetupData) // OVDJE SE DISPATCHA "createMeetup" ACTION METODA  !
        this.$router.push('/meetups/')
      },
      uploadFile(){
        this.$refs.fileInput.click()
      },
      onFilePicked(){
        const files = event.target.files
        let fileName = files[0].name;

        if(fileName.lastIndexOf('.')<= 0){
          return alert('Upload real image')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageURL = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }

</script>

<style scoped>

</style>
