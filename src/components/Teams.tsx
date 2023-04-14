import { useQuery } from "@tanstack/react-query";
import { NHLApiTeam, getTeams } from "../api/nhl.api";
import TeamLogo from "./TeamLogo";

const Teams = () => {
  const { data: teams } = useQuery({ queryKey: ["teams"], queryFn: getTeams });
  ``;

  return (
    <>
      {teams?.map((team: NHLApiTeam) => (
        <div key={team.id}>
          <div title={team.name} className="w-20 object-cover">
            <a href={`/${team.abbreviation.toLowerCase()}`}>
              <TeamLogo team={team} />
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Teams;
