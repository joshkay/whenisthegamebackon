const BASE_URL = "https://statsapi.web.nhl.com/api/v1";
const LOGO_BASE_URL =
  "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light";

export const nhlLogoUrl =
  "https://www-league.nhlstatic.com/images/logos/league-light/133.svg";

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
}

export const getTeams = async (): Promise<NHLApiTeam[]> => {
  const response = await fetch(`${BASE_URL}/teams/`);
  const data = await response.json();
  return data.teams;
};

export const getTeamLogo = (teamId: number) => {
  return `${LOGO_BASE_URL}/${teamId}.svg`;
};
