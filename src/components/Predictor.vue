<template>
  <v-container>
    <v-btn @click="date.subtract(1, 'days'); loadData();"> yesterday </v-btn>
    <span class="pa-2"> {{ date.format("DD-MM-YYYY") }}</span>
    <v-btn @click="date.add(1, 'days'); loadData();"> tomorrow </v-btn>
    <v-list>
      <v-list-item
        v-for="match in matches"
        :key="`${match.homeTeam}${match.awayTeam}`"
      >
        <v-list-item-content>
          <v-card>
            <v-row no-gutters>
              <v-col
                v-for="str in [match.homeTeam, 'vs', match.awayTeam]"
                :key="str"
                sm="4"
                align-self="center"
              >
                <v-card class="pa-2" outlined tile>
                  <v-card-text class="team-text">
                    <p class="text-h1 text--primary">{{ str }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
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
        `https://www.fotmob.com/api/matches?timezone=Europe/Tirane&countryCode=AL&ccode3=ALB&date=${this.date.format(
          "YYYYMMDD"
        )}&sortOnClient=true`
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
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team-text {
  font-size: 20px;
}
</style>
