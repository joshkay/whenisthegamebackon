import { getLiveGameStatus, getNextGameForTeam } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import dayjs from "dayjs";
import dayjsPluginLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsPluginDuration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(dayjsPluginLocalizedFormat);
dayjs.extend(dayjsPluginDuration);

interface TeamLiveGameProps {
  team: NHLApiTeam;
  gameId: number;
}

const TeamLiveGame = ({ team, gameId }: TeamLiveGameProps) => {
  const { data: liveGame, isLoading } = useQuery({
    queryKey: ["liveGame"],
    queryFn: () => getLiveGameStatus(gameId),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateTimer = () => {
      queryClient.invalidateQueries(["liveGame"]);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [liveGame]);

  console.log(liveGame);

  return (
    <div>
      <h1
        className="font-extrabold text-5xl sm:text-5xl lg:text-8xl"
        style={{ WebkitTextStroke: "2px black" }}
      >
        {liveGame?.description}
      </h1>

      <h2
        className="font-extrabold text-5xl sm:text-5xl lg:text-8xl"
        style={{ WebkitTextStroke: "2px black" }}
      >
        {liveGame?.timeLeft}
        {liveGame?.timeLeft &&
          dayjs.duration(liveGame?.timeLeft).format("m [minutes],s [seconds]")}
      </h2>
      <h2
        className="font-extrabold text-5xl sm:text-5xl lg:text-8xl"
        style={{ WebkitTextStroke: "2px black" }}
      >
        {liveGame?.timeLeft}
      </h2>
    </div>
  );
};

export default TeamLiveGame;
