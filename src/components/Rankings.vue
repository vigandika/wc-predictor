<template>
  <v-container>
    <v-data-table dense :headers="headers" :items="rankings" hide-default-footer class="elevation-1"></v-data-table>
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
    let data = 
    [   
    {"username": "myrteza", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "vigan", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 0, "predictedAwayScore": 1},
    {"username": "andi", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 1, "predictedAwayScore": 3},
    {"username": "ilir", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "hana", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "ardian", "match": "QatarEcuador", "homeTeam": "Qatar", "awayTeam": "Ecuador", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 0, "predictedAwayScore": 2},

    {"username": "myrteza", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "myrteza", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 1, "predictedAwayScore": 3},
    {"username": "myrteza", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 1},
    {"username": "myrteza", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 5, "predictedAwayScore": 0},
    {"username": "myrteza", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "myrteza", "match": "DenmarkTunisia", "homeTeam": "Denmark", "awayTeam": "Tunisia", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "myrteza", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 3, "predictedAwayScore": 1},

    {"username": "ardian", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "ardian", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 1, "predictedAwayScore": 2},
    {"username": "ardian", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 0, "predictedAwayScore": 2},
    {"username": "ardian", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 6, "predictedAwayScore": 0},
    {"username": "ardian", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 1, "predictedAwayScore": 1},
    {"username": "ardian", "match": "DenmarkTunisia", "homeTeam": "Denmark", "awayTeam": "Tunisia", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "ardian", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 2, "predictedAwayScore": 0},


    {"username": "andi", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "andi", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 1, "predictedAwayScore": 3},
    {"username": "andi", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 2},
    {"username": "andi", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "andi", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 0, "predictedAwayScore": 2},
    {"username": "andi", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 3, "predictedAwayScore": 0},

    {"username": "vigan", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "vigan", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 0, "predictedAwayScore": 2},
    {"username": "vigan", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 1},
    {"username": "vigan", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "vigan", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 0, "predictedAwayScore": 0},
    {"username": "vigan", "match": "DenmarkTunisia", "homeTeam": "Denmark", "awayTeam": "Tunisia", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "vigan", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 0},

    {"username": "ilir", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 3, "predictedAwayScore": 1},
    {"username": "ilir", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 0, "predictedAwayScore": 3},
    {"username": "ilir", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 2},
    {"username": "ilir", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 4, "predictedAwayScore": 1},
    {"username": "ilir", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "ilir", "match": "DenmarkTunisia", "homeTeam": "Denmark", "awayTeam": "Tunisia", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "ilir", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 2, "predictedAwayScore": 1},

    {"username": "hana", "match": "EnglandIran", "homeTeam": "England", "awayTeam": "Iran", "homeScore": 6, "awayScore": 2, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "hana", "match": "SenegalNetherlands", "homeTeam": "Senegal", "awayTeam": "Netherlands", "homeScore": 0, "awayScore": 2, "predictedHomeScore": 3, "predictedAwayScore": 1},
    {"username": "hana", "match": "USAWales", "homeTeam": "USA", "awayTeam": "Wales", "homeScore": 1, "awayScore": 1, "predictedHomeScore": 2, "predictedAwayScore": 1},
    {"username": "hana", "match": "ArgentinaSaudi Arabia", "homeTeam": "Argentina", "awayTeam": "Saudi Arabia", "homeScore": 1, "awayScore": 6, "predictedHomeScore": 3, "predictedAwayScore": 0},
    {"username": "hana", "match": "MexicoPoland", "homeTeam": "Mexico", "awayTeam": "Poland", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 1, "predictedAwayScore": 0},
    {"username": "hana", "match": "DenmarkTunisia", "homeTeam": "Denmark", "awayTeam": "Tunisia", "homeScore": 0, "awayScore": 0, "predictedHomeScore": 2, "predictedAwayScore": 0},
    {"username": "hana", "match": "FranceAustralia", "homeTeam": "France", "awayTeam": "Australia", "homeScore": 4, "awayScore": 1, "predictedHomeScore": 1, "predictedAwayScore": 0}
];
         this.predictions = data;
    this.calculatePoints();
  }

  private calculatePoints() {
    let map: any = {};
    this.predictions.forEach((prediction) => {
      console.log(prediction);
      let score = 0;
      let predictedHeuristics = prediction.predictedHomeScore - prediction.predictedAwayScore;
      let realHeuristics = prediction.homeScore - prediction.awayScore;

      console.log(predictedHeuristics, realHeuristics)
      if (predictedHeuristics * realHeuristics > 0 || (predictedHeuristics === 0 && realHeuristics === 0)) {
        // if both heuristics have the same sign (multiply to zero), winner is correctly predicted
        // if both are zero, draw is correctly predicted
        score += 3;
        console.log("giving +3 to " + prediction.username + " for match " + prediction.match);
      }

      if (Math.abs(predictedHeuristics) === Math.abs(realHeuristics)) {
        // if difference between score is correctly predicted, extra +1
        score += 1;
      }

      if (prediction.homeScore === prediction.predictedHomeScore && prediction.awayScore === prediction.predictedAwayScore) {
        // exact score, +1
        score += 1;
      }

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
