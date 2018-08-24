<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-tile v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
          </v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
                           class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Meetup App
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in activeMenuItems"
          :key="item.title"
          :to="item.link"
        >{{item.title}}
        </v-btn>
        <v-btn
          flat
          v-if="isUserLogedIn"
          @click="onLogOut"
        >
          <v-icon>exit_to_app</v-icon>
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>


<script>
  export default {
    data() {
      return {
        drawer: false,
        menuItems: [],
      };
    },

    computed: {
      activeMenuItems(){
        let menuItems = [
          {title: 'Sign up', link: '/signup'},
          {title: 'Sign in', link: '/signin'}
        ]

        if(this.isUserLogedIn){
          menuItems = [
            {title: 'View Meetups', link: '/meetups'},
            {title: 'Organize Meetups', link: '/meetup/new'},
            {title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },

      isUserLogedIn(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }


    },

    methods: {

      onLogOut(){

        if (confirm("Do you really want to exit?")) {
          this.$store.dispatch('logOut')
        }
      }
    }

  };


</script>
