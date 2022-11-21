<template>
<v-container>
    <p> Lol </p>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import axios from "axios";
import moment from "moment";

@Component
export default class Rankings extends Vue {
  private axios = axios.create({});
  private matches: Array<Match> = [];
  private date = moment();

  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
