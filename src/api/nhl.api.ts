const BASE_URL = "https://statsapi.web.nhl.com/api/v1";
const LOGO_BASE_URL =
  "https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark";

export const nhlLogoUrl =
  "https://www-league.nhlstatic.com/images/logos/league-dark/133.svg";

export interface NHLApiTeam {
  id: number;
  name: string;
  link: string;
  venue: {
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: number;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
  nextGameSchedule: {
    dates: [
      {
        date: string;
        games: [
          {
            gamePk: number;
            link: string;
            gameType: string;
            season: string;
            gameDate: string;
            status: {
              abstractGameState: string;
              codedGameState: string;
              detailedState: string;
              statusCode: string;
              startTimeTBD: boolean;
            };
            teams: {
              away: {
                leagueRecord: {
                  wins: number;
                  losses: number;
                  ot: number;
                  type: string;
                };
                score: number;
                team: {
                  id: number;
                  name: string;
                  link: string;
                };
              };
              home: {
                leagueRecord: {
                  wins: number;
                  losses: number;
                  ot: number;
                  type: string;
                };
                score: number;
                team: {
                  id: number;
                  name: string;
                  link: string;
                };
              };
            };
            venue: {
              name: string;
              link: string;
              city: string;
              timeZone: {
                id: string;
                offset: number;
                tz: string;
              };
            };
            content: {
              link: string;
            };
          }
        ];
      }
    ];
  };
  teamStats: {
    type: {
      displayName: string;
    };
    splits: [
      {
        season: string;
        stat: {
          gamesPlayed: number;
          wins: number;
          losses: number;
          ot: number;
          pts: number;
          ptPctg: string;
          goalsPerGame: string;
          goalsAgainstPerGame: string;
          evGGARatio: string;
          powerPlayPercentage: string;
          powerPlayGoals: number;
          powerPlayGoalsAgainst: number;
          powerPlayOpportunities: number;
          penaltyKillPercentage: string;
          shotsPerGame: string;
          shotsAllowed: number;
          winScoreFirst: number;
          winOppScoreFirst: number;
          winLeadFirstPer: number;
          winLeadSecondPer: number;
          winOutshootOpp: number;
          winOutshotByOpp: number;
          faceOffsTaken: number;
          faceOffsWon: number;
          faceOffsLost: number;
          faceOffWinPercentage: string;
          shootingPctg: string;
          savePctg: string;
        };
      }
    ];
  }[];
}

export enum NhlGameStatus {
  InProgress = "InProgress",
  Commercial = "Commercial",
  Intermission = "Intermission",
  PreGame = "PreGame",
  PostGame = "PostGame",
}

export const getTeams = async (): Promise<NHLApiTeam[]> => {
  const response = await fetch(
    `${BASE_URL}/teams/?expand=team.schedule.next,team.stats`
  );
  const data = await response.json();
  return data.teams;
};

export const getTeamLogo = (teamId: number) => {
  return `${LOGO_BASE_URL}/${teamId}.svg`;
};

export const getStandings = async () => {
  const response = await fetch(`${BASE_URL}/standings`);
  const data = await response.json();
  return data.records;
};

export const getNextGameForTeam = async (teamId: number) => {
  const response = await fetch(
    `${BASE_URL}/teams/${teamId}?expand=team.schedule.next`
  );
  const data = await response.json();
  return data.teams[0].nextGameSchedule?.dates[0].games[0] ?? null;
};
export const getLiveGameStatus = async (
  gameId: number
): Promise<{
  status: NhlGameStatus;
  description?: string;
  stoppage?: string;
  timeLeft?: number;
  currentTime?: string;
  stoppageTime?: string;
  linescore?: any;
}> => {
  const response = await fetch(`${BASE_URL}/game/${gameId}/feed/live`);
  const data = await response.json();
  console.log(data);

  const playsDescending = data.liveData.plays.allPlays.reverse();
  const lastStoppage = playsDescending.find(
    (play: any) =>
      play.result.eventTypeId === "STOP" ||
      play.result.eventTypeId === "GOAL" ||
      play.result.eventTypeId === "PERIOD_END"
  );

  const inIntermission =
    data.liveData.linescore.intermissionInfo.inIntermission;

  if (inIntermission) {
    return {
      status: NhlGameStatus.Intermission,
      stoppage: lastStoppage?.about?.dateTime,
      description: lastStoppage?.result?.description,
      timeLeft:
        data.liveData.linescore.intermissionInfo.intermissionTimeRemaining,
      linescore: data.liveData.linescore,
    };
  }

  if (lastStoppage === playsDescending[0]) {
    return {
      status: NhlGameStatus.InProgress,
      description: `${data.liveData.linescore.currentPeriodOrdinal} Period`,
      stoppage: lastStoppage?.result?.description,
      stoppageTime: lastStoppage?.about?.dateTime,
      currentTime:
        data.liveData.linescore.currentPeriodTimeRemaining === "END"
          ? "0:00"
          : data.liveData.linescore.currentPeriodTimeRemaining,
      linescore: data.liveData.linescore,
    };
  }

  return {
    status: NhlGameStatus.InProgress,
    description: `${data.liveData.linescore.currentPeriodOrdinal} Period`,
    currentTime: data.liveData.linescore.currentPeriodTimeRemaining,
    linescore: data.liveData.linescore,
  };
};
