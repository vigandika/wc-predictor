<template>
  <v-container>
    <template>
      <v-expansion-panels :key="panel">
        <v-expansion-panel v-for="(match, value) in history" :key="value">
          <v-expansion-panel-header> {{match.homeTeam}} {{ match.homeScore }} - {{ match.awayScore }} {{match.awayTeam}} </v-expansion-panel-header>
          <v-expansion-panel-content v-for="(prediction, username) in match.predictions" :key="username">
            {{username}}: {{ prediction.predictedHomeScore }} - {{ prediction.predictedAwayScore }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";

type MatchHistory = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  predictions: Record<string, { predictedHomeScore: number; predictedAwayScore: number }> | any;
};

@Component({})
export default class History extends Vue {
  private history: Record<string, MatchHistory> = {};
  private predictions: Array<any> = [];
  private panel = false;

  mounted() {
    let data = [
      {
        username: "myrteza",
        match: "englandiran",
        homeTeam: "england",
        awayTeam: "iran",
        homeScore: 6,
        awayScore: 2,
        predictedHomeScore: 3,
        predictedAwayScore: 0,
      },
      {
        username: "ilir",
        match: "englandiran",
        homeTeam: "england",
        awayTeam: "iran",
        homeScore: 6,
        awayScore: 2,
        predictedHomeScore: 5,
        predictedAwayScore: 1,
      },
      {
        username: "hana",
        match: "englandiran",
        homeTeam: "england",
        awayTeam: "iran",
        homeScore: 6,
        awayScore: 2,
        predictedHomeScore: 5,
        predictedAwayScore: 1,
      },
      {
        username: "myrteza",
        match: "FranceAustralia",
        homeTeam: "France",
        awayTeam: "Australia",
        homeScore: 4,
        awayScore: 1,
        predictedHomeScore: 2,
        predictedAwayScore: 0,
      },
      {
        username: "ilir",
        match: "FranceAustralia",
        homeTeam: "France",
        awayTeam: "Australia",
        homeScore: 4,
        awayScore: 1,
        predictedHomeScore: 0,
        predictedAwayScore: 0,
      },
      {
        username: "hana",
        match: "FranceAustralia",
        homeTeam: "France",
        awayTeam: "Australia",
        homeScore: 4,
        awayScore: 1,
        predictedHomeScore: 1,
        predictedAwayScore: 3,
      },
    ];
    this.predictions = data;
    this.populateHistory();
    this.panel = true;
  }

  private populateHistory() {
    this.predictions.forEach((prediction) => {
      if (prediction.match in this.history) {
        let homePred = prediction.predictedHomeScore;
        let awayPred = prediction.predictedAwayScore;
        this.history[prediction.match].predictions[prediction.username] = { predictedHomeScore: homePred, predictedAwayScore: awayPred };
      } else {
        this.history[prediction.match] = {
          homeTeam: prediction.homeTeam,
          awayTeam: prediction.awayTeam,
          homeScore: prediction.homeScore,
          awayScore: prediction.awayScore,
          predictions: {},
        };

        let homePred = prediction.predictedHomeScore;
        let awayPred = prediction.predictedAwayScore;
        this.history[prediction.match].predictions = {
          [prediction.username]: { predictedHomeScore: homePred, predictedAwayScore: awayPred },
        };
      }
    });
  }
}
</script>
