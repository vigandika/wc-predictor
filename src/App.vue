<template>
  <div id="app">
    <v-alert prominent :value="isAlertVisible">
      <v-text-field type="text" placeholder="username" v-model="username"> </v-text-field>
      <v-text-field type="password" placeholder="password"> </v-text-field>
      <v-btn @click="getUser">Ok </v-btn>
    </v-alert>
    <div id="nav">
      <router-link to="/">Predict</router-link> |
      <router-link to="/about">Rankings</router-link> |
      <router-link to="/history">History</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import store from '@/store/index';

    @Component({
        name: 'App',
    })
    export default class App extends Vue {
      private username: string = '';
      private isAlertVisible: boolean = true;

      private getUser() {
        if (this.username === '') {
          alert('input username and password');
        } else {
          this.$store.commit('login', this.username);
          this.isAlertVisible = false;
        }
      }
    }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
