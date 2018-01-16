<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <!--<v-icon>home</v-icon>-->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Meetup App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
        v-for="item in menuItems"
               :key="item.title"
        >{{item.title}}</v-btn>

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
        menuItems: [
          {title: 'View Meetups'},
          {title: 'Organize Meetups'},
          {title: 'Profile'},
          {title: 'Sign up'},
          {title: 'Sign in'}
        ],
      };
    },
  };


</script>
