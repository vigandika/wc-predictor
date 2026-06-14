<template>
  <v-app>
    <v-dialog v-model="isAlertVisible" max-width="360" persistent>
      <v-card class="pa-2">
        <v-card-title class="justify-center">WC Predictor</v-card-title>
        <v-card-subtitle class="text-center pb-4">Enter your name to join</v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Username"
            outlined
            dense
            hide-details
            autofocus
            @keyup.enter="getUser"
          />
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn color="primary" depressed @click="getUser">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-if="!isAlertVisible">
      <v-app-bar color="#1b5e20" dark dense flat>
        <v-toolbar-title class="font-weight-medium">WC Predictor</v-toolbar-title>
        <v-spacer />
        <span class="caption text-uppercase">{{ loggedInUser }}</span>
      </v-app-bar>

      <v-tabs
        background-color="transparent"
        color="#1b5e20"
        show-arrows
        center-active
        class="app-tabs"
      >
        <v-tab to="/">Predict</v-tab>
        <v-tab to="/about">Rankings</v-tab>
        <v-tab to="/history">History</v-tab>
        <v-tab to="/rules">Rregullat</v-tab>
      </v-tabs>

      <v-main class="grey lighten-5">
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";

@Component({
  name: "App",
})
export default class App extends Vue {
  private username: string = "";
  private isAlertVisible: boolean = true;

  get loggedInUser() {
    return store.state.username;
  }

  private getUser() {
    const name = this.username.trim().toLowerCase();
    const users = [
        "jona",
        "vigan",
        "asdren",
        // "andi",
        // "ardian",
        "dard",
        "diart",
        "dielli",
        "hana",
        "ilir",
        // "joni",
        // "kastri",
        // "laid",
        // "ardita",
        "moza",
        "myrteza",
        // "rozi",
        "artan"
    ];
    if (name === "") {
      return;
    }
    if (users.includes(name)) {
      this.$store.commit("login", name);
      this.isAlertVisible = false;
    } else {
      alert("Unknown user — ask the admin to add you.");
    }
  }
}
</script>

<style>
.app-tabs .v-slide-group__wrapper {
  -webkit-overflow-scrolling: touch;
}

.app-tabs .v-tab {
  min-width: 72px;
  font-size: 13px;
  letter-spacing: 0;
  padding: 0 12px;
}
</style>
