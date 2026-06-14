type Prediction = {
    username: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
}


function predictedOutcome(home: number, away: number): "home" | "draw" | "away" {
    if (home > away) return "home";
    if (home < away) return "away";
    return "draw";
}


export default function calculateScore(prediction: any, allPredictions?: any[]): number {
    let score = 0;
    let predictedHeuristics = prediction.predictedHomeScore - prediction.predictedAwayScore;
    let realHeuristics = prediction.homeScore - prediction.awayScore;

    if (predictedHeuristics * realHeuristics > 0 || (predictedHeuristics === 0 && realHeuristics === 0)) {
      // if both heuristics have the same sign (multiply to zero), winner is correctly predicted
      // if both are zero, draw is correctly predicted
      score += 3;
    }

    if (predictedHeuristics === realHeuristics) {
      // if difference between score is correctly predicted, extra +1
      score += 1;
    }

    if (prediction.homeScore === prediction.predictedHomeScore && prediction.awayScore === prediction.predictedAwayScore) {
      // exact score, +1
      score += 1;
    }

    const correctOutcome = predictedHeuristics * realHeuristics > 0 || (predictedHeuristics === 0 && realHeuristics === 0);
    if (correctOutcome && allPredictions) {
      const picked = predictedOutcome(prediction.predictedHomeScore, prediction.predictedAwayScore);
      const onThisMatch = allPredictions.filter((p) => p.match === prediction.match);
      const samePickCount = onThisMatch.filter(
        (p) => predictedOutcome(p.predictedHomeScore, p.predictedAwayScore) === picked
      ).length;
      if (samePickCount === 1) {
        score += 5;
      }
    }

    return score;
}
