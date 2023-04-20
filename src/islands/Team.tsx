import TeamLogo from "@components/TeamLogo";
import App from "../App";
import { getNextGameForTeam, nhlLogoUrl } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import TeamNextGame from "@components/TeamNextGame";

interface TeamProps {
  team: NHLApiTeam;
}

const Team = ({ team }: TeamProps) => {
  return (
    <App>
      <header className="absolute top-0 left-0 w-14 h-14 z-10">
        <a href={`/`}>
          <img src={nhlLogoUrl} alt="NHL logo" className="m-2" />
        </a>
      </header>

      <main className="h-full w-full flex overflow-y-auto overflow-x-hidden">
        <aside className="flex overflow-hidden absolute top-0 right-0 bottom-0">
          <TeamLogo className="scale-125 translate-x-1/4" team={team} />
        </aside>
        <section className="flex flex-1 absolute top-0 left-0 bottom-0 lg:right-1/2 pl-8 lg:pl-20 pt-20">
          <TeamNextGame team={team} />
        </section>
      </main>
    </App>
  );
};

export default Team;
