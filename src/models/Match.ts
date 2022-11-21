export class Match {
    homeTeam: string;
    awayTeam: string;
    homeTeamScore: number | null;
    awayTeamScore: number | null;

    constructor(homeTeam: string, awayTeam: string, homeTeamScore?: number, awayTeamScore?: number) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeTeamScore = null;
        this.awayTeamScore = null;
    }

}