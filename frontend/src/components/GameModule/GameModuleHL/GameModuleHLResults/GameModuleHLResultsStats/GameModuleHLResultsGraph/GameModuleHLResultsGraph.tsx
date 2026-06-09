"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

interface GameModuleHLResultsGraphProps {
  userScore: number;
}

type ScoreData = {
  score: number;
  Users: number;
};

export default function GameModuleHLResultsGraph({
  userScore,
}: GameModuleHLResultsGraphProps) {
  const [usersData, setUsersData] = useState<ScoreData[]>([]);

  useEffect(() => {
    // TODO: Temp, later use backend. First update scores, then fetch
    const getScores = (): ScoreData[] => {
      return [
        { score: 0, Users: 0 },
        { score: 1, Users: 1 },
        { score: 2, Users: 1 },
        { score: 3, Users: 2 },
        { score: 4, Users: 8 },
        { score: 5, Users: 25 },
        { score: 6, Users: 70 },
        { score: 7, Users: 120 },
        { score: 8, Users: 132 },
        { score: 9, Users: 92 },
        { score: 10, Users: 28 },
      ];
    };

    setUsersData(getScores());
  }, []);

  return (
    <div className="w-full">
      <ResponsiveContainer className="w-full" height={350}>
        <AreaChart data={usersData}>
          <XAxis dataKey="score" domain={[0, 10]} />
          <YAxis hide />
          <Tooltip labelClassName="text-black" />
          <Area
            type="monotone"
            dataKey="Users"
            stroke="#198754"
            fill="#198754"
            fillOpacity={0.25}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}