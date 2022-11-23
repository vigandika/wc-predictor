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
