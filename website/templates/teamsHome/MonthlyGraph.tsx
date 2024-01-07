// import { useGraphParameters } from "@components/MonthlyProgressGraph/useGraphParameters";
// import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   XAxis,
//   YAxis,
//   Area,
//   Tooltip,
// } from "recharts";
// import GraphDot from "./GraphDot";
// import GraphTooltip from "./GraphTooltip";

// const data = [
//   { points: 0, dayMili: 1652639400000 },
//   { points: 5, dayMili: 1652725800000 },
//   { points: 10, dayMili: 1652812200000 },
//   { points: 15, dayMili: 1652898600000 },
//   { points: 20, dayMili: 1652985000000 },
//   { points: 15, dayMili: 1653071400000 },
//   { points: 10, dayMili: 1653157800000 },
//   { points: 15, dayMili: 1653244200000 },
//   { points: 20, dayMili: 1653330600000 },
//   { points: 25, dayMili: 1653417000000 },
//   { points: 30, dayMili: 1653503400000 },
//   { points: 25, dayMili: 1653589800000 },
//   { points: 20, dayMili: 1653676200000 },
//   { points: 15, dayMili: 1653762600000 },
//   { points: 10, dayMili: 1653849000000 },
//   { points: 15, dayMili: 1653935400000 },
//   { points: 20, dayMili: 1654021800000 },
//   { points: 15, dayMili: 1654108200000 },
//   { points: 10, dayMili: 1654194600000 },
//   { points: 5, dayMili: 1654281000000 },
//   { points: 0, dayMili: 1654367400000 },
//   { points: 5, dayMili: 1654453800000 },
//   { points: 10, dayMili: 1654540200000 },
//   { points: 15, dayMili: 1654626600000 },
//   { points: 20, dayMili: 1654713000000 },
//   { points: 25, dayMili: 1654799400000 },
//   { points: 20, dayMili: 1654885800000 },
//   { points: 25, dayMili: 1654972200000 },
//   { points: 30, dayMili: 1655058600000 },
//   { points: 35, dayMili: 1655145000000 },
// ];

interface Props {
  userLvl?: number;
}

const MonthlyGraph: React.FC<Props> = ({ userLvl }) => {
  // const levelData = getLevelColorV2(userLvl ? userLvl : 0);
  // const { XAxisTicks, YAxisTicks } = useGraphParameters(data);

  return (
    <div className="py-4 relative z-0">
      <span className="absolute left-0 top-1/2 z-10 text-sm text-[#AFAFAF]/25 -translate-x-1/4 -translate-y-1/2 -rotate-90">
        Fitpoints
      </span>
      {/* <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0.5" y1="0" x="0.5" y2="1">
              <stop
                offset="0%"
                stopColor={levelData.color}
                stopOpacity={0.75}
              />
              <stop
                offset="100%"
                stopColor={levelData.color}
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          <Area
            dataKey="points"
            type="monotone"
            stroke={levelData.color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="url(#gradient)"
            activeDot={(props) => (
              <GraphDot props={props} color={levelData.color} />
            )}
          />

          <Tooltip cursor={false} content={<GraphTooltip />} />

          <XAxis
            dataKey="dayMili"
            type="number"
            axisLine={{
              strokeDasharray: "25 10",
              stroke: "rgba(175, 175, 175, 0.25)",
            }}
            tickLine={false}
            domain={[XAxisTicks[0], XAxisTicks[XAxisTicks.length - 1]]}
            tickFormatter={(tick) =>
              new Date(tick).toLocaleDateString("default", {
                day: "numeric",
                month: "short",
              })
            }
            ticks={XAxisTicks.slice(0, -1)}
            tick={{
              fill: "rgba(175, 175, 175, 0.25)",
              fontSize: 14,
              dy: 8,
            }}
          />

          <YAxis
            dataKey="points"
            type="number"
            axisLine={{
              strokeDasharray: "25 10",
              stroke: "rgba(175, 175, 175, 0.25)",
            }}
            tickLine={false}
            domain={[0, YAxisTicks[YAxisTicks.length - 1]]}
            ticks={YAxisTicks}
            tick={{
              fill: "rgba(175, 175, 175, 0.25)",
              fontSize: 14,
              dx: -12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer> */}
      <div className="h-5" />
      <span className="absolute left-1/2 bottom-0 text-sm text-[#AFAFAF]/25 -translate-x-1/2 -translate-y-1/2">
        30 Day Cycle
      </span>
    </div>
  );
};

export default MonthlyGraph;
