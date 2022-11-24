type Prediction = {
    username: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
}


export default function calculateScore(prediction: any): number {
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
    return score;
}