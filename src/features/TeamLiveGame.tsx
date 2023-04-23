import { getLiveGameStatus, getNextGameForTeam } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import dayjs from "dayjs";
import dayjsPluginLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsPluginDuration from "dayjs/plugin/duration";
import { useEffect, useRef, useState } from "react";
import OutlinedText from "../components/OutlinedText";

dayjs.extend(dayjsPluginLocalizedFormat);
dayjs.extend(dayjsPluginDuration);

interface TeamLiveGameProps {
  team: NHLApiTeam;
  gameId: number;
  onGameOver: () => void;
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

  const intermissionTimeLeft = liveGame?.timeLeft
    ? dayjs.duration(liveGame?.timeLeft, "seconds").format("m:ss")
    : null;

  console.log(liveGame?.stoppageTime);
  const durationUntilGame = liveGame?.stoppageTime
    ? dayjs.duration(dayjs().diff(dayjs(liveGame?.stoppageTime)))
    : null;
  const intermissionTimeLeftLive = durationUntilGame?.format("m:ss");

  return (
    <div>
      <h1 className="font-extrabold text-5xl sm:text-5xl lg:text-8xl">
        <OutlinedText text={liveGame?.description} strokeWidth={3} />
      </h1>
      <h2 className="font-extrabold text-5xl sm:text-5xl lg:text-8xl">
        <OutlinedText text={liveGame?.currentTime} strokeWidth={3} />
      </h2>

      {liveGame?.stoppage && (
        <div className="text-xl text-shadow-sm flex">
          <OutlinedText text="Stoppage" className="mr-2" />
          <OutlinedText text={liveGame?.stoppage} />
        </div>
      )}

      {intermissionTimeLeft && (
        <h2 className="font-extrabold text-5xl sm:text-5xl lg:text-8xl text-shadow-md">
          <OutlinedText
            text={`${intermissionTimeLeft} remaining`}
            strokeWidth={3}
          />
        </h2>
      )}
      {intermissionTimeLeftLive && (
        <h2 className="font-extrabold text-5xl sm:text-5xl lg:text-8xl text-shadow-md">
          <OutlinedText
            text={`${intermissionTimeLeftLive} remaining`}
            strokeWidth={3}
          />
        </h2>
      )}
    </div>
  );
};

export default TeamLiveGame;
