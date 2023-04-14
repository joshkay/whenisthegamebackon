import { getTeamLogo } from "src/api/nhl.api";
import type { NHLApiTeam } from "src/api/nhl.api";

interface TeamLogoProps {
  team: NHLApiTeam;
  className?: string;
}

const TeamLogo = ({ team, className }: TeamLogoProps) => {
  const teamLogoUrl = getTeamLogo(team.id);

  return <img className={className} src={teamLogoUrl} alt={team.name} />;
};

export default TeamLogo;
