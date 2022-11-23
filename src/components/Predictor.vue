<template>
  <v-container>
    <v-btn
      plain
      @click="
        date.subtract(1, 'days');
        loadData();
      "
    >
      yesterday
    </v-btn>
    &nbsp;
    <span class="pa-2"> {{ date.format("DD-MM-YYYY") }}</span>
    &nbsp;
    <v-btn
      plain
      @click="
        date.add(1, 'days');
        loadData();
      "
    >
      tomorrow
    </v-btn>
    <v-list>
      <v-list-item v-for="match in matches" :key="`${match.homeTeam}${match.awayTeam}`">
        <v-list-item-content>
          <span v-if="match.started" style="color: red; font-size: 12px"> This match has already started </span>
          <v-row style="flex-wrap: nowrap">
            <v-col sm="5" style="padding: 12px 0px 0px 0px">
              <v-card class="ht-card" outlined width="110px">
                <v-container fill-height class="padding: 12px 0px 0px 0px;">
                  <v-card-text class="team-text pa-0">
                    {{ match.homeTeam }}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
            <v-col sm="2" style="display: inline-flex; justify-content: center; padding: 12px 0px 0px 0px" width="40px">
              <span>
                <v-text-field
                  v-model="match.predHomeTeamScore"
                  hide-details
                  filled
                  dense
                  single-line
                  :disabled="match.started"
                  :placeholder="match.started ? match.homeTeamScore.toString() : ''"
                  class="shrink"
                  style="width: 40px; padding: 0px"
                >
                </v-text-field>
              </span>
              <p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</p>
              <span>
                <v-text-field
                  v-model="match.predAwayTeamScore"
                  hide-details
                  filled
                  dense
                  single-line
                  :disabled="match.started"
                  :placeholder="match.started ? match.awayTeamScore.toString() : ''"
                  class="shrink"
                  style="width: 40px; padding: 0px"
                >
                </v-text-field>
              </span>
            </v-col>
            <v-col sm="5" style="padding: 12px 0px 0px 0px">
              <v-card class="at-card" outlined tile width="110px">
                <v-container fill-height class="padding: 12px 0px 0px 0px;">
                  <v-card-text class="team-text pa-0">
                    {{ match.awayTeam }}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn plain right style="background-color: #18a558; color: white" @click="savePrediction"> SAVE </v-btn>
    <div style="padding: 10px">
      <v-btn v-if="username === 'vigan'" plain right style="background-color: red; color: white" @click="updateMatches">
        Admin update matches
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import axios from "axios";
import moment from "moment";
import store from "@/store/index";

@Component
export default class Predictor extends Vue {
  private axios = axios.create({});
  private matches: Array<Match> = [];
  private date = moment();
  private username = store.state.username;

  mounted() {
    this.loadData();
  }

  private loadData() {
    this.matches = [];
    this.axios
      .get(
        `https://wcpredictor.fun/api/matches?date=${this.date.format("YYYYMMDD")}`
        // `https://fotmob.com/api/matches?date=${this.date.format("YYYYMMDD")}`
      )
      .then((response) => {
        console.log(response);
        let worldCupData = response.data.leagues.filter((leagues: any) => leagues.parentLeagueName === "World Cup");
        worldCupData.forEach((l: any) => {
          l.matches.forEach((match: any) => {
            this.matches.push(new Match(match.home.name, match.away.name, match.status.started, match.home.score, match.away.score));
          });
        });
      })
      .catch((error: any) => {
        alert(JSON.stringify(error));
      });
  }

  private savePrediction() {
    let bodyJson: any = [];
    this.matches.forEach((match) => {
      if (match.predHomeTeamScore && match.predAwayTeamScore) {
        bodyJson.push({
          match: `${match.homeTeam}${match.awayTeam}`,
          user: this.$store.state.username,
          predictedHomeScore: Number(match.predHomeTeamScore),
          predictedAwayScore: Number(match.predAwayTeamScore),
        });
      }
    });

    this.axios
      .post(`https://wcpredictor.fun/api/predict`, bodyJson)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.matches = [];
  }

  private updateMatches() {
    let bodyJson: any = [];
    this.matches.forEach((match) =>
      bodyJson.push({
        match: `${match.homeTeam}${match.awayTeam}`,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeTeamScore,
        awayScore: match.awayTeamScore,
      })
    );
    console.log(JSON.stringify(bodyJson));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team-text {
  font-size: 15px;
  padding: 0px;
}

.ht-card {
  float: right;
}

.at-card {
  float: left;
}

.ht-card,
.at-card {
  border: 0px;
}
</style>
