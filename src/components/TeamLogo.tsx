import { getTeamLogo } from "src/api/nhl.api";
import type { NHLApiTeam } from "src/api/nhl.api";

interface TeamLogoProps {
  team: NHLApiTeam;
  className?: string;
}

const TeamLogo = ({ team, className }: TeamLogoProps) => {
  const teamLogoUrl = getTeamLogo(team.id);

  return (
    <img
      src={teamLogoUrl}
      alt={team.name}
      className={`${className} ${
        !team.nextGameSchedule &&
        "grayscale opacity-30 hover:opacity-100 hover:grayscale-0"
      }`}
    />
  );
};

export default TeamLogo;
