import { getNextGameForTeam } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";
import dayjsPluginLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsPluginDuration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(dayjsPluginLocalizedFormat);
dayjs.extend(dayjsPluginDuration);

interface TeamProps {
  team: NHLApiTeam;
}

const TeamNextGame = ({ team }: TeamProps) => {
  const { data: nextGame, isLoading } = useQuery({
    queryKey: ["nextGame"],
    queryFn: () => getNextGameForTeam(team.id),
  });

  const [timeUntilGame, setTimeUntilGame] = useState<string | null>(null);

  useEffect(() => {
    if (!nextGame) return;

    const updateTimer = () => {
      const durationUntilGame = dayjs.duration(dayjs(nextGame).diff(dayjs()));
      setTimeUntilGame(
        durationUntilGame.format(
          "D [days], H [hours], m [minutes], s [seconds]"
        )
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextGame]);

  if (isLoading) return null;

  if (!nextGame)
    return (
      <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-8xl">
        There's always next year
      </h1>
    );

  return (
    <div>
      <div className="font-extrabold text-4xl sm:text-5xl lg:text-6xl">
        <h1>{dayjs(nextGame).format("LL")}</h1>
        <h1>{dayjs(nextGame).format("LT")}</h1>
      </div>
      <h2>{timeUntilGame}</h2>
    </div>
  );
};

export default TeamNextGame;
