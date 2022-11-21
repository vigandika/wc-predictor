export class Match {
    homeTeam: string;
    awayTeam: string;
    homeTeamScore: number | null;
    awayTeamScore: number | null;
    predHomeTeamScore: number | null;
    predAwayTeamScore: number | null;
    started: boolean;

    constructor(homeTeam: string, awayTeam: string, started: boolean, homeTeamScore: number, awayTeamScore: number, predHomeTeamScore?: number, predAwayTeamScore?: number) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeTeamScore = homeTeamScore;
        this.awayTeamScore = awayTeamScore;
        this.started = started;
        this.predHomeTeamScore = null;
        this.predAwayTeamScore = null;
    }

}