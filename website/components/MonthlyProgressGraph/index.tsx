// import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from "recharts";
// import CustomizedDot from "./CustomizedDot";
// import { useGraphData } from "./useGraphData";

interface Props {
  uid: string;
  color: string;
  //   level: number;
}

export const MonthlyProgressGraph: React.FC<Props> = ({
  uid,
  color,
  //   level,
}) => {
  // const { data, peak, XAxisTicks, YAxisTicks } = useGraphData(uid);

  return (
    <>
      <span className="absolute left-6 top-1/2 grid place-items-center text-[#393939]/[.40] -translate-x-1/2 -translate-y-1/2 -rotate-90">
        Fitpoints
      </span>
      {/* <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="75%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey="points"
            type="monotone"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="url(#gradient)"
            dot={(props) => (
              <CustomizedDot
                key={props.key}
                // level={level}
                props={props}
                peak={peak && peak}
                color={color}
              />
            )}
          />
          <XAxis
            dataKey="dayMili"
            type="number"
            axisLine={false}
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
              fill: "rgba(57, 57, 57, 0.4)",
              fontSize: 14,
              dy: 8,
            }}
          />

          <YAxis
            dataKey="points"
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[0, YAxisTicks[YAxisTicks.length - 1]]}
            ticks={YAxisTicks}
            tick={{
              fill: "rgba(57, 57, 57, 0.4)",
              fontSize: 14,
              dx: -12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer> */}
      <span className="absolute left-1/2 bottom-0 text-[#393939]/[.40] -translate-x-1/2 -translate-y-1/2">
        Days
      </span>
    </>
  );
};
