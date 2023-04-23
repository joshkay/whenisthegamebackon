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

  if (!standings || !teams) return null;

  return (
    <>
      {standings.map(({ division, teamRecords }: any) => (
        <div
          key={division.name}
          //className="flex flex-1 flex-wrap items-center justify-baseline px-2"
          className="grid grid-cols-4 md:grid-cols-8"
        >
          {teamRecords?.map(({ team: { id } }: any) => {
            const team = teams.find((team: NHLApiTeam) => team.id === id);
            if (!team) return null;

            return (
              <div key={team.id} className="py-2">
                <div
                  title={team.name}
                  className="w-24 lg:w-28 xl:w-36 object-cover"
                >
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
