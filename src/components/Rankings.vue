<template>
  <v-container>
    <v-data-table dense :headers="headers" :items="rankings" :sort-by="['points']" :sort-desc="[true, false]" hide-default-footer class="elevation-1"></v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import axios from "axios";
import moment from "moment";
import calculateScore from '@/helper/scoreHelper';

@Component
export default class Rankings extends Vue {
  private axios = axios.create({});
  private matches: Array<Match> = [];
  private rankings = [];
  private predictions: Array<any> = [];
  private date = moment();

  get headers() {
    return [
      { text: "User", value: "username" },
      { text: "Predictions", value: "matchesPredicted" },
      { text: "Points", value: "points" },
    ];
  }

  mounted() {
    this.axios.get(
      `https://wcpredictor.fun/api/predictionOutcomes`
    ).then(response => {
      console.log(response);
      this.predictions = response.data;
      this.calculatePoints();
    }).catch(error => {
      console.error(error);
    })
  }

  private calculatePoints() {
    let map: any = {};
    this.predictions.forEach((prediction) => {
      let score = calculateScore(prediction);

      if (prediction.username in map) {
        map[prediction.username].matchesPredicted += 1;
        map[prediction.username].points += score;
      } else {
        map[prediction.username] = {
          username: prediction.username,
          matchesPredicted: 1,
          points: score,
        };
      }
    });

    console.log(map);
    // @ts-ignore
    this.rankings = Object.values(map);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
