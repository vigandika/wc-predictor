<template>
  <v-container class="py-6" style="max-width: 480px">
    <h2 class="text-h6 font-weight-medium text-center mb-4">Standings</h2>

    <v-progress-linear v-if="loading && rankings.length === 0" indeterminate color="green darken-3" class="mb-4" />

    <v-alert v-if="!loading && rankings.length === 0" type="info" text dense>
      No scored matches yet. Predictions will appear here once results are posted.
    </v-alert>

    <v-card v-else outlined>
      <v-simple-table dense>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Player</th>
            <th class="text-center">Played</th>
            <th class="text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rankings" :key="row.username" :class="rowClass(index)">
            <td>{{ index + 1 }}</td>
            <td class="font-weight-medium">{{ row.username }}</td>
            <td class="text-center">{{ row.matchesPredicted }}</td>
            <td class="text-right font-weight-bold">{{ row.points }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <p v-if="lastChecked" class="caption grey--text text-center mt-3">
      Last checked {{ lastChecked }}
    </p>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import calculateScore from '@/helper/scoreHelper';

@Component
export default class Rankings extends Vue {
  private axios = axios.create({});
  private rankings: Array<{ username: string; matchesPredicted: number; points: number }> = [];
  private predictions: Array<any> = [];
  private loading = false;
  private lastChecked: string | null = null;

  mounted() {
    this.fetchRankings();
  }

  private rowClass(index: number): string {
    if (index === 0) return "gold-row";
    if (index === 1) return "silver-row";
    if (index === 2) return "bronze-row";
    return "";
  }

  private fetchRankings() {
    this.loading = true;
    this.axios.get(`/api/predictionOutcomes`).then(response => {
      this.predictions = response.data;
      this.calculatePoints();
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.loading = false;
      this.lastChecked = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    });
  }

  private calculatePoints() {
    const map: Record<string, { username: string; matchesPredicted: number; points: number }> = {};
    this.predictions.forEach((prediction) => {
      const score = calculateScore(prediction);

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

    this.rankings = Object.values(map).sort((a, b) => b.points - a.points);
  }
}
</script>

<style scoped>
.gold-row {
  background: #fff8e1;
}

.silver-row {
  background: #f5f5f5;
}

.bronze-row {
  background: #fbe9e7;
}
</style>
