<template>
  <v-container class="py-6" style="max-width: 520px">
    <v-card outlined class="mb-4 pa-2">
      <v-card-text class="d-flex align-center justify-center py-2">
        <v-btn icon small @click="prevDay">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="mx-4 font-weight-medium">{{ date.format("ddd, D MMM YYYY") }}</span>
        <v-btn icon small @click="nextDay">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>

    <v-progress-linear v-if="loading" indeterminate color="green darken-3" class="mb-4" />

    <v-alert v-if="!loading && matches.length === 0" type="info" text dense class="mb-4">
      No World Cup matches on this day.
    </v-alert>

    <div
      v-for="match in matches"
      :key="`${match.homeTeam}${match.awayTeam}`"
      class="match-block mb-5"
    >
      <div v-if="match.started" class="started-banner">
        Match started · {{ match.homeTeamScore }} – {{ match.awayTeamScore }}
      </div>

      <v-row align="center" justify="center" class="match-row" no-gutters>
        <v-col cols="4" class="team-col">
          <v-card class="team-card ht-card" outlined>
            <v-card-text class="team-text pa-2">
              {{ match.homeTeam }}
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4" class="score-col">
          <div class="score-box">
            <v-text-field
              v-model="match.predHomeTeamScore"
              hide-details
              filled
              dense
              single-line
              maxlength="2"
              inputmode="numeric"
              :disabled="match.started"
              :placeholder="match.started ? String(match.homeTeamScore) : ''"
              class="score-field"
            />
            <span class="score-sep">–</span>
            <v-text-field
              v-model="match.predAwayTeamScore"
              hide-details
              filled
              dense
              single-line
              maxlength="2"
              inputmode="numeric"
              :disabled="match.started"
              :placeholder="match.started ? String(match.awayTeamScore) : ''"
              class="score-field"
            />
          </div>
        </v-col>

        <v-col cols="4" class="team-col">
          <v-card class="team-card at-card" outlined>
            <v-card-text class="team-text pa-2">
              {{ match.awayTeam }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="match.started && othersForMatch(match).length" class="predictions-reveal">
        <div v-for="p in othersForMatch(match)" :key="p.user" class="prediction-row">
          <span class="font-weight-medium">{{ p.user }}</span>
          <span>{{ p.home }} – {{ p.away }}</span>
        </div>
      </div>
    </div>

    <div v-if="matches.length > 0" class="mt-4 d-flex flex-column align-center">
      <v-btn color="green darken-2" depressed dark large @click="savePrediction" :loading="saving">
        Save predictions
      </v-btn>

      <v-btn
        v-if="isAdmin && startedCount > 0"
        text
        small
        color="grey darken-1"
        class="mt-3"
        @click="updateMatches"
        :loading="updatingResults"
      >
        Post {{ startedCount }} result{{ startedCount > 1 ? "s" : "" }} to standings
      </v-btn>
    </div>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" bottom>
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "@/models/Match";
import axios from "axios";
import moment from "moment";

type StoredPrediction = {
  match: string;
  user: string;
  predictionHomeScore: number;
  predictionAwayScore: number;
};

@Component
export default class Predictor extends Vue {
  private axios = axios.create({});
  private matches: Array<Match> = [];
  private allPredictions: Array<StoredPrediction> = [];
  private date = moment();
  private loading = false;
  private saving = false;
  private updatingResults = false;
  private snackbar = false;
  private snackbarText = "";
  private snackbarColor = "success";

  get isAdmin(): boolean {
    return this.$store.state.username === "vigan";
  }

  get startedCount(): number {
    return this.matches.filter((m) => m.started).length;
  }

  private matchId(match: Match): string {
    return `${match.homeTeam}${match.awayTeam}`;
  }

  private hasScore(value: string | number | null): boolean {
    return value !== null && value !== undefined && value !== "";
  }

  private showSnackbar(text: string, color = "success") {
    this.snackbarText = text;
    this.snackbarColor = color;
    this.snackbar = true;
  }

  private othersForMatch(match: Match): Array<{ user: string; home: number; away: number }> {
    const id = this.matchId(match);
    return this.allPredictions
      .filter((p) => p.match === id)
      .map((p) => ({
        user: p.user,
        home: p.predictionHomeScore,
        away: p.predictionAwayScore,
      }));
  }

  private applyPredictions() {
    this.matches.forEach((match) => {
      const id = this.matchId(match);
      const mine = this.allPredictions.find((p) => p.match === id && p.user === this.$store.state.username);
      if (mine && !match.started) {
        match.predHomeTeamScore = mine.predictionHomeScore;
        match.predAwayTeamScore = mine.predictionAwayScore;
      }
    });
  }

  private loadPredictions() {
    return this.axios.get("/api/predictions").then((response) => {
      this.allPredictions = response.data;
      this.applyPredictions();
    });
  }

  private prevDay() {
    this.date.subtract(1, "days");
    this.loadData();
  }

  private nextDay() {
    this.date.add(1, "days");
    this.loadData();
  }

  private loadData() {
    this.matches = [];
    this.loading = true;
    this.axios
      .get(`/api/matches?date=${this.date.format("YYYYMMDD")}`)
      .then((response) => {
        const worldCupData = response.data.leagues.filter(
          (leagues: any) => leagues.parentLeagueName === "World Cup" || leagues.primaryId === 77
        );
        worldCupData.forEach((l: any) => {
          l.matches.forEach((match: any) => {
            this.matches.push(
              new Match(match.home.name, match.away.name, match.status.started, match.home.score, match.away.score)
            );
          });
        });
        return this.loadPredictions().then(() => this.postResults(false));
      })
      .catch(() => {
        this.showSnackbar("Could not load matches", "error");
      })
      .finally(() => {
        this.loading = false;
      });
  }

  mounted() {
    this.loadData();
  }

  private savePrediction() {
    const bodyJson: Array<{
      match: string;
      user: string;
      predictionHomeScore: number;
      predictionAwayScore: number;
    }> = [];

    this.matches.forEach((match) => {
      if (this.hasScore(match.predHomeTeamScore) && this.hasScore(match.predAwayTeamScore)) {
        bodyJson.push({
          match: this.matchId(match),
          user: this.$store.state.username,
          predictionHomeScore: Number(match.predHomeTeamScore),
          predictionAwayScore: Number(match.predAwayTeamScore),
        });
      }
    });

    if (bodyJson.length === 0) {
      this.showSnackbar("Enter at least one score before saving", "warning");
      return;
    }

    this.saving = true;
    this.axios
      .post(`/api/predict`, bodyJson)
      .then(() => {
        this.showSnackbar("Predictions saved");
        return this.loadPredictions();
      })
      .catch(() => {
        this.showSnackbar("Failed to save — try again", "error");
      })
      .finally(() => {
        this.saving = false;
      });
  }

  private buildResultsPayload() {
    const bodyJson: Array<{
      match: string;
      homeTeam: string;
      awayTeam: string;
      homeScore: number;
      awayScore: number;
    }> = [];

    this.matches.forEach((match) => {
      if (match.started) {
        bodyJson.push({
          match: this.matchId(match),
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeScore: match.homeTeamScore as number,
          awayScore: match.awayTeamScore as number,
        });
      }
    });

    return bodyJson;
  }

  private postResults(notify: boolean) {
    const bodyJson = this.buildResultsPayload();
    if (bodyJson.length === 0) {
      if (notify) {
        this.showSnackbar("No started matches on this day", "warning");
      }
      return Promise.resolve();
    }

    this.updatingResults = true;
    return this.axios
      .post(`/api/results`, bodyJson)
      .then(() => {
        if (notify) {
          this.showSnackbar(`${bodyJson.length} result(s) posted to standings`);
        }
      })
      .catch(() => {
        if (notify) {
          this.showSnackbar("Failed to post results", "error");
        }
      })
      .finally(() => {
        this.updatingResults = false;
      });
  }

  private updateMatches() {
    this.postResults(true);
  }
}
</script>

<style scoped>
.match-block {
  text-align: center;
}

.started-banner {
  background: #ffebee;
  color: #c62828;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.match-row {
  flex-wrap: nowrap;
}

.team-col {
  display: flex;
  align-items: center;
}

.team-card {
  width: 100%;
  max-width: 130px;
  border: 0 !important;
  box-shadow: none !important;
}

.ht-card {
  margin-left: auto;
}

.at-card {
  margin-right: auto;
}

.team-text {
  font-size: 15px;
  line-height: 1.3;
  word-break: break-word;
}

.score-col {
  padding: 0 8px !important;
  overflow: visible;
}

.score-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.score-field {
  flex: 0 0 44px;
  width: 44px;
  font-size: 15px;
}

.score-field >>> .v-input {
  width: 44px;
}

.score-field >>> .v-input__control {
  width: 44px;
}

.score-field >>> .v-input__slot {
  min-height: 36px !important;
  padding: 0 4px !important;
}

.score-field >>> input {
  text-align: center;
  padding: 0 !important;
}

.score-sep {
  margin: 0 6px;
  color: #666;
  font-size: 16px;
  flex-shrink: 0;
}

.predictions-reveal {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 10px auto 0;
  max-width: 320px;
  text-align: left;
}

.prediction-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 3px 0;
}
</style>
