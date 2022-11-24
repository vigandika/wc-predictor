<template>
  <v-container>
    <template>
      <v-expansion-panels :key="panel">
        <v-expansion-panel v-for="(match, value) in history" :key="value">
          <v-expansion-panel-header>
            {{ match.homeTeam }} {{ match.homeScore }} - {{ match.awayScore }} {{ match.awayTeam }}
          </v-expansion-panel-header>
          <v-expansion-panel-content v-for="(prediction, username) in match.predictions" :key="username">
            {{ username }}: {{ prediction.predictedHomeScore }} - {{ prediction.predictedAwayScore }}
            <v-chip style="float: right" pill>{{
              getScore(prediction.predictedHomeScore, prediction.predictedAwayScore, match.homeScore, match.awayScore)
            }}</v-chip>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import calculateScore from "@/helper/scoreHelper";
import axios from "axios";

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
  private axios = axios.create({});

  mounted() {
    this.axios
      .get(`https://wcpredictor.fun/api/predictionOutcomes`)
      .then((response) => {
        console.log(response);
        this.predictions = response.data;
        this.populateHistory();
        this.panel = true;
      })
      .catch((error) => {
        console.error(error);
      });
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

  private getScore(predictedHomeScore: number, predictedAwayScore: number, homeScore: number, awayScore: number) {
    return calculateScore({
      predictedHomeScore,
      predictedAwayScore,
      homeScore,
      awayScore,
    });
  }
}
</script>
