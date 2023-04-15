import { useQuery } from "@tanstack/react-query";
import { NHLApiTeam, getStandings, getTeams } from "../api/nhl.api";
import TeamLogo from "./TeamLogo";

const Teams = () => {
  const { data: standings } = useQuery({
    queryKey: ["standings"],
    queryFn: getStandings,
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  console.log(standings, teams);
  if (!standings || !teams) return null;

  return (
    <>
      {standings.map(({ teamRecords }: any) => (
        <div className="flex flex-1 flex-wrap">
          {teamRecords?.map(({ team: { id } }: any) => {
            const team = teams.find((team: NHLApiTeam) => team.id === id);
            if (!team) return null;

            return (
              <div key={team.id}>
                <div title={team.name} className="w-32 object-cover">
                  <a href={`/${team.abbreviation.toLowerCase()}`}>
                    <TeamLogo team={team} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Teams;
