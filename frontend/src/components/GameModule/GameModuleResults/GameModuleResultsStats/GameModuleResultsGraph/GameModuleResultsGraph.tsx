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

interface GameModuleResultsGraphProps {
  userScore: number;
}

export default function GameModuleResultsGraph({
  userScore,
}: GameModuleResultsGraphProps) {

  const [usersData, setUsersData] = useState([]);

  useEffect(() => { // TODO: Temp, later use backend. First update scores, then fetch
    const getScores = () => {
      const data = [
        { score: 0, users: 0 },
        { score: 1, users: 1 },
        { score: 2, users: 1 },
        { score: 3, users: 2 },
        { score: 4, users: 8 },
        { score: 5, users: 25 },
        { score: 6, users: 70 },
        { score: 7, users: 120 },
        { score: 8, users: 132 },
        { score: 9, users: 92 },
        { score: 10, users: 28 },
      ];
      return data
    }
    setUsersData(getScores());

  }, [])

  return (
    <div className="w-full">

      <ResponsiveContainer className="w-full" height={350}>
        <AreaChart
          data={usersData}
          responsive
        >
          <XAxis dataKey="score" domain={[0, 10]} />
          <YAxis hide />
          <Tooltip
            labelClassName="text-black"
          />
          <Area
            type="monotone"
            dataKey="users"
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