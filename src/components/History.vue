<template>
  <v-container>
    <template>
      <v-expansion-panels v-model="history">
        <v-expansion-panel v-for="(key, value) in Object.entries(history)" :key="value">
          <v-expansion-panel-header> {{key}} {{value}} </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sits amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
  }

  private populateHistory() {
    this.predictions.forEach((prediction) => {
      if (prediction.match in this.history) {
        let homePred = prediction.predictedHomeScore;
        let awayPred = prediction.predictedAwayScore;
        this.history[prediction.match].predictions[prediction.username] = { homePred, awayPred };
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
          [prediction.username]: { homePred, awayPred },
        };
      }
    });
  }
}
</script>
