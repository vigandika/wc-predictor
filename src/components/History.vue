<template>
  <v-container class="py-6" style="max-width: 520px">
    <h2 class="text-h6 font-weight-medium text-center mb-4">Match history</h2>

    <v-progress-linear v-if="loading && matchList.length === 0" indeterminate color="green darken-3" class="mb-4" />

    <v-alert v-if="!loading && matchList.length === 0" type="info" text dense>
      No completed matches yet.
    </v-alert>

    <v-expansion-panels v-else accordion>
      <v-expansion-panel v-for="match in matchList" :key="match.id">
        <v-expansion-panel-header class="match-panel-header">
          <div v-if="match.isWcWinner" class="wc-winner-title">
            World Cup Winner
          </div>
          <div v-else class="match-header">
            <span class="match-header__team">{{ match.homeTeam }}</span>
            <span class="match-header__score">{{ match.homeScore }} – {{ match.awayScore }}</span>
            <span class="match-header__team">{{ match.awayTeam }}</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="match.isWcWinner">
            <p class="wc-winner-info mb-3">
              20 pts will be added to the rankings at the end for everyone who correctly predicts the winner.
            </p>
            <div
              v-for="entry in match.wcWinnerEntries"
              :key="entry.username"
              class="wc-winner-row"
            >
              <span>{{ entry.username }}</span>
              <span :class="entry.pick ? 'wc-winner-pick' : 'wc-winner-missed'">
                {{ entry.pick || "No prediction" }}
              </span>
            </div>
          </template>
          <template v-else>
            <div
              v-for="entry in match.entries"
              :key="entry.username"
              class="d-flex justify-space-between align-center py-1"
            >
              <span>{{ entry.username }}</span>
              <span class="grey--text">{{ entry.predictedHomeScore }} – {{ entry.predictedAwayScore }}</span>
              <v-chip
                small
                class="points-chip"
                :color="entry.points >= 5 ? 'green' : entry.points >= 3 ? 'orange' : 'grey'"
                dark
              >
                {{ entry.points }} pts
              </v-chip>
            </div>
          </template>
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

const ALL_USERS = [
  "jona",
  "vigan",
  "asdren",
  // "andi",
  "ardian",
  "dard",
  "diart",
  "dielli",
  "hana",
  "ilir",
  // "joni",
  // "kastri",
  // "laid",
  // "ardita",
  "moza",
  "myrteza",
  // "rozi",
  "artan",
];

const WC_WINNER_PICKS: Record<string, string> = {
  dielli: "France",
  diart: "France",
  dard: "France",
  moza: "Spain",
  asdren: "Portugal",
  vigan: "Portugal",
  myrteza: "Germany",
};

type HistoryEntry = {
  username: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
};

type WcWinnerEntry = {
  username: string;
  pick: string | null;
};

type MatchListItem = {
  id: string;
  isWcWinner?: boolean;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  entries: HistoryEntry[];
  wcWinnerEntries?: WcWinnerEntry[];
};

@Component({})
export default class History extends Vue {
  private matchList: MatchListItem[] = [];
  private predictions: Array<any> = [];
  private axios = axios.create({});
  private loading = false;
  private lastChecked: string | null = null;

  mounted() {
    this.fetchHistory();
  }

  private buildWcWinnerEntry(): MatchListItem {
    const wcWinnerEntries = ALL_USERS.map((username) => ({
      username,
      pick: WC_WINNER_PICKS[username] ?? null,
    })).sort((a, b) => {
      const aHas = a.pick ? 0 : 1;
      const bHas = b.pick ? 0 : 1;
      if (aHas !== bHas) {
        return aHas - bHas;
      }
      return a.username.localeCompare(b.username);
    });

    return {
      id: "wc-winner",
      isWcWinner: true,
      homeTeam: "",
      awayTeam: "",
      homeScore: 0,
      awayScore: 0,
      entries: [],
      wcWinnerEntries,
    };
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
      const points = calculateScore(prediction, this.predictions);
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

    const matches = Object.values(grouped).map((match) => ({
      ...match,
      entries: match.entries.sort((a, b) => b.points - a.points),
    }));

    this.matchList = [this.buildWcWinnerEntry(), ...matches];
  }
}
</script>

<style scoped>
.match-panel-header >>> .v-expansion-panel-header__icon {
  margin-left: 8px;
}

.wc-winner-title {
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  color: #b8860b;
}

.wc-winner-info {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.6);
}

.wc-winner-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.wc-winner-pick {
  font-weight: 600;
  color: #b8860b;
}

.wc-winner-missed {
  font-style: italic;
  color: rgba(0, 0, 0, 0.38);
}

.match-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  font-weight: 500;
  line-height: 1.3;
}

.match-header__team {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

.match-header__team:first-child {
  text-align: right;
}

.match-header__team:last-child {
  text-align: left;
}

.match-header__score {
  flex-shrink: 0;
  padding: 2px 10px;
  font-weight: 700;
  color: #1b5e20;
  white-space: nowrap;
}

.points-chip {
  font-size: 13px !important;
  font-weight: 600;
  height: 26px !important;
  padding: 0 10px !important;
}
</style>
