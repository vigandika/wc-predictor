<template>
  <v-container class="py-6" style="max-width: 520px">
    <h2 class="text-h6 font-weight-medium text-center mb-4">Match history</h2>

    <v-progress-linear v-if="loading && matchList.length === 0" indeterminate color="green darken-3" class="mb-4" />

    <v-alert v-if="!loading && matchList.length === 0" type="info" text dense>
      No completed matches yet.
    </v-alert>

    <v-expansion-panels v-else accordion>
      <v-expansion-panel v-for="match in matchList" :key="match.id">
        <v-expansion-panel-header class="font-weight-medium">
          {{ match.homeTeam }}
          <span class="mx-2 primary--text">{{ match.homeScore }} – {{ match.awayScore }}</span>
          {{ match.awayTeam }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div
            v-for="entry in match.entries"
            :key="entry.username"
            class="d-flex justify-space-between align-center py-1"
          >
            <span>{{ entry.username }}</span>
            <span class="grey--text">{{ entry.predictedHomeScore }} – {{ entry.predictedAwayScore }}</span>
            <v-chip x-small :color="entry.points >= 4 ? 'green' : entry.points >= 2 ? 'orange' : 'grey'" dark>
              {{ entry.points }} pts
            </v-chip>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <p v-if="lastChecked" class="caption grey--text text-center mt-3">
      Last checked {{ lastChecked }}
    </p>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import calculateScore from "@/helper/scoreHelper";
import axios from "axios";

type HistoryEntry = {
  username: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
};

type MatchListItem = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  entries: HistoryEntry[];
};

@Component({})
export default class History extends Vue {
  private matchList: MatchListItem[] = [];
  private predictions: Array<any> = [];
  private axios = axios.create({});
  private refreshTimer: number | null = null;
  private loading = false;
  private lastChecked: string | null = null;

  mounted() {
    this.fetchHistory();
    this.refreshTimer = window.setInterval(this.fetchHistory, 30000);
  }

  beforeDestroy() {
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
    }
  }

  private fetchHistory() {
    this.loading = true;
    this.axios
      .get(`/api/predictionOutcomes`)
      .then((response) => {
        this.predictions = response.data;
        this.buildMatchList();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
        this.lastChecked = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      });
  }

  private buildMatchList() {
    const grouped: Record<string, MatchListItem> = {};

    this.predictions.forEach((prediction) => {
      const points = calculateScore(prediction);
      const entry: HistoryEntry = {
        username: prediction.username,
        predictedHomeScore: prediction.predictedHomeScore,
        predictedAwayScore: prediction.predictedAwayScore,
        points,
      };

      if (prediction.match in grouped) {
        grouped[prediction.match].entries.push(entry);
      } else {
        grouped[prediction.match] = {
          id: prediction.match,
          homeTeam: prediction.homeTeam,
          awayTeam: prediction.awayTeam,
          homeScore: prediction.homeScore,
          awayScore: prediction.awayScore,
          entries: [entry],
        };
      }
    });

    this.matchList = Object.values(grouped).map((match) => ({
      ...match,
      entries: match.entries.sort((a, b) => b.points - a.points),
    }));
  }
}
</script>
