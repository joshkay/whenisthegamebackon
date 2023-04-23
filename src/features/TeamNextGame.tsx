import { getNextGameForTeam } from "../api/nhl.api";
import type { NHLApiTeam } from "../api/nhl.api";
import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";
import dayjsPluginLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsPluginDuration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import TeamLiveGame from "./TeamLiveGame";

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

  const nextGameDate = nextGame?.gameDate;

  const [timeUntilGame, setTimeUntilGame] = useState<string | null>(null);
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    if (!nextGameDate || gameOn) return;

    const updateTimer = () => {
      const durationUntilGame = dayjs.duration(
        dayjs(nextGameDate).diff(dayjs())
      );

      if (dayjs(nextGameDate).isBefore(dayjs())) {
        setGameOn(true);
        return;
      }

      setTimeUntilGame(
        durationUntilGame.format("D [days],H [hours],m [minutes],s [seconds]")
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextGameDate, gameOn]);

  if (isLoading) return null;

  if (!nextGame)
    return (
      <h1
        className="font-extrabold text-5xl sm:text-5xl lg:text-8xl"
        style={{ WebkitTextStroke: "2px black" }}
      >
        There's always next year
      </h1>
    );

  console.log(nextGame);

  if (gameOn) {
    return (
      <div>
        <TeamLiveGame
          gameId={nextGame.gamePk}
          onGameOver={() => setGameOn(false)}
          team={team}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        className="font-extrabold text-5xl sm:text-5xl lg:text-6xl"
        style={{ WebkitTextStroke: "2px black" }}
      >
        <h1>{dayjs(nextGameDate).format("LL")}</h1>
        <h1>{dayjs(nextGameDate).format("LT")}</h1>
      </div>
      <div className="mt-4">
        {timeUntilGame?.split(",").map((time) => (
          <h2
            key={time}
            className="text-2xl"
            style={{ WebkitTextStroke: "1px black" }}
          >
            {time}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default TeamNextGame;
