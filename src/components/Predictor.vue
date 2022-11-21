<template>
  <v-container>
    <v-btn plain
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
    <v-btn plain
      @click="
        date.add(1, 'days');
        loadData();
      "
    >
      tomorrow
    </v-btn>
    <v-list>
      <v-list-item
        v-for="match in matches"
        :key="`${match.homeTeam}${match.awayTeam}`"
      >
        <v-list-item-content>
          <!-- <v-card> -->
          <v-row style="flex-wrap: nowrap">
            <v-col sm="5">
              <v-card class="ht-card" outlined width="110px">
                <v-container fill-height class="padding: 12px 0px 0px 0px;">
                  <v-card-text class="team-text pa-0">
                    {{ match.homeTeam }}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
            <v-col sm="2" style="display:inline-flex; justify-content:center;padding: 12px 0px 0px 0px;" width="40px">
              <span>
                <v-text-field
                  v-model="match.homeTeamScore"
                  hide-details
                  filled
                  dense
                  single-line
                  class="shrink"
                  style="width: 40px; padding: 0px"
                >
                </v-text-field>
              </span>
                <p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</p>
              <span>
                <v-text-field
                  v-model="match.awayTeamScore"
                  hide-details
                  filled
                  dense
                  single-line
                  class="shrink"
                  style="width: 40px; padding: 0px"
                >
                </v-text-field>
              </span>
            </v-col>
            <v-col sm="5">
              <v-card class="at-card" outlined tile width="110px">
                <v-container fill-height class="padding: 12px 0px 0px 0px;">
                  <v-card-text class="team-text pa-0">
                    {{ match.awayTeam }}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <!-- </v-card> -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import axios from "axios";
import moment from "moment";

@Component
export default class Predictor extends Vue {
  private axios = axios.create({});
  private matches: Array<Match> = [];
  private date = moment();

  mounted() {
    this.loadData();
  }

  private loadData() {
    this.matches = [];
    this.axios
      .get(
        `138.68.109.195:8080/api/matches?date=20221121${this.date.format("YYYYMMDD")}`,
      )
      .then((response) => {
        console.log(response);
        let worldCupData = response.data.leagues.filter(
          (leagues: any) => leagues.parentLeagueName === "World Cup"
        );
        worldCupData.forEach((l: any) => {
          l.matches.forEach((match: any) => {
            this.matches.push(new Match(match.home.name, match.away.name));
          });
        });
      })
      .catch((error: any) => {
        alert(JSON.stringify(error));
      });
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
