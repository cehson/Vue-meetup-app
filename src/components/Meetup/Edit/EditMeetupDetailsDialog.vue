<template>
  <v-dialog
    width="350px"
    persistent
    v-model="editDialog"
  >

    <v-btn
      fab
      accent
      slot="activator"
    >
      <v-icon>
        edit
      </v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12></v-flex>
          <v-card-title>Edit Meetup</v-card-title>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12></v-flex>
          <v-card-text>
            <v-text-field
              name="title"
              label="Title"
              id="title"
              required
              v-model="editedTitle"
            >
            </v-text-field>
            <v-text-field
              name="description"
              label="Description"
              id="desc"
              multi-line
              required
              v-model="editDesctiption"
            >
            </v-text-field>
          </v-card-text>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1"
                     @click="onSave"
              >
                Save
              </v-btn>
              <v-spacer>
              </v-spacer>
              <v-btn flat class="blue--text darken-1"

                     @click="editDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "EditMeetupDetailsDialog",
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        editedTitle: this.meetup.title,
        editDesctiption: this.meetup.description
      }
    },
    methods: {
      onSave() {
        if(!this.editedTitle){
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetup',
          {
            id: this.meetup.id,
            title: this.editedTitle,
            description: this.editDesctiption
          }
        )
      }
    }
  }


</script>

<style scoped>

</style>
