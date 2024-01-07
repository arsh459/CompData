// import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import BarGraphTick from "./BarGraphTick";
// import GraphBar from "./GraphBar";
// import GraphTooltip from "./GraphTooltip";

// const data = [
//   {
//     name: "M",
//     points: 40,
//   },
//   {
//     name: "T",
//     points: 30,
//   },
//   {
//     name: "W",
//     points: 50,
//   },
//   {
//     name: "Th",
//     points: 0,
//   },
//   {
//     name: "Fr",
//     points: 70,
//   },
//   {
//     name: "St",
//     points: 40,
//   },
//   {
//     name: "Su",
//     points: 20,
//   },
// ];

interface Props {
  userLvl?: number;
}

const WeeklyGraph: React.FC<Props> = ({ userLvl }) => {
  // const levelData = getLevelColorV2(userLvl ? userLvl : 0);

  return (
    <div className="py-4 relative z-0">
      <span className="absolute left-0 top-1/2 z-10 text-sm text-[#AFAFAF]/25 -translate-x-1/4 -translate-y-1/2 -rotate-90">
        Fitpoints
      </span>
      {/* <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            type="category"
            axisLine={{
              stroke: "rgba(175, 175, 175, 0.25)",
            }}
            tick={(props) => <BarGraphTick props={props} />}
          />

          <YAxis
            dataKey="points"
            type="number"
            axisLine={{
              stroke: "rgba(175, 175, 175, 0.25)",
            }}
            tickLine={false}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
            tick={{
              fill: "rgba(175, 175, 175, 0.25)",
              fontSize: 14,
              dx: -12,
            }}
          />

          <Tooltip cursor={false} content={<GraphTooltip />} />
          <Bar
            dataKey="points"
            fill={levelData.color}
            barSize={15}
            radius={4}
            shape={(props) => <GraphBar props={props} />}
          />
        </BarChart>
      </ResponsiveContainer> */}
      <div className="h-5" />
      <span className="absolute left-1/2 bottom-0 text-sm text-[#AFAFAF]/25 -translate-x-1/2 -translate-y-1/2">
        Week Cycle
      </span>
    </div>
  );
};

export default WeeklyGraph;
