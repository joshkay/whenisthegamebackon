import TeamLogo from "@components/TeamLogo";
import App from "../App";
import { getTeamLogo } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import Teams from "@components/Teams";

interface TeamProps {
  team: NHLApiTeam;
}

const Team = ({ team }: TeamProps) => {
  return (
    <App>
      <main className="h-full w-full flex overflow-y-auto overflow-x-hidden">
        <aside className="flex overflow-hidden">
          <TeamLogo className="scale-125 -translate-x-1/4" team={team} />
        </aside>
        <section className="flex flex-1 items-center justify-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-9xl">
            NOT YET
          </h1>
        </section>
      </main>
    </App>
  );
};

export default Team;
