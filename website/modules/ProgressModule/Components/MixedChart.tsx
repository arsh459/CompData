import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getEmojiByMood } from "../MoodTracker/utils";
import { getEmojiByEnergy } from "../EnergyTracker/utils";
import { graphDataInterface } from "../interface";

const CustomizedYAxisMoodTick: React.FC<{
  payload?: { value?: number };
  x?: number;
  y?: number;
}> = ({ payload, x, y }) => {
  return (
    <>
      {payload?.value && payload.value > 0 ? (
        <g transform={`translate(${x},${y})`}>
          <image
            x={-20}
            y={-36}
            href={getEmojiByMood(payload.value).icon}
            width={20}
            height={20}
          />
        </g>
      ) : null}
    </>
  );
};
const CustomizedYAxisEnergyTick: React.FC<{
  payload?: { value?: number };
  x?: number;
  y?: number;
}> = ({ payload, x, y }) => {
  return (
    <>
      {payload?.value && payload.value > 0 ? (
        <g transform={`translate(${x},${y})`}>
          <image
            x={-10}
            y={-56}
            href={getEmojiByEnergy(payload.value).icon}
            width={16}
            height={32}
          />
        </g>
      ) : null}
    </>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      default: number;
      bar: number;
      startDate: string;
      endDate: string;
      weekStr: string;
      averageValue: number;
      weekNumber: number;
      totalOfWeek: number;
      count: number;
    };
    value: number;
  }[];
  label?: string;
  chartType?: "mood" | "energy" | "weight";
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  chartType,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip  flex flex-col items-center py-2">
        {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
        <div className="w-5 h-5 rounded-full border-2 border-white flex justify-center items-center">
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
        <p className="desc font-nunitoEL text-xs text-center pt-2">
          {payload[0]?.payload?.weekStr}
        </p>
        <p className="desc font-nunitoB text-base">
          {" "}
          {/* getEmojiByEnergy */}
          {chartType === "mood" && getEmojiByMood(payload[0].value).text}
          {chartType === "energy" && getEmojiByEnergy(payload[0].value).text}
          {chartType === "weight" ? payload[0].value : ""}
        </p>
      </div>
    );
  }

  return null;
};

interface Props {
  chartType?: "mood" | "energy" | "weight";
  data: graphDataInterface[];
  maxWeight?: number;
}

const MixedChart: React.FC<Props> = ({ chartType, data, maxWeight }) => {
  const { width } = useWindowDimensions();

  const domain = chartType === "mood" ? [0, 5] : [1, 3];
  return (
    <ComposedChart
      width={
        width
          ? width > 1000
            ? Math.min(width * 0.3, 490)
            : Math.min(width * 0.9, 500)
          : 500
      }
      height={400}
      data={data}
      margin={{
        top: 20,
        left: 0,
        right: 0,
        bottom: 20,
      }}
      // className="w-1/2 aspect-1"
    >
      <CartesianGrid stroke="transparent" />
      <XAxis dataKey="weekStr" padding={{ left: 0, right: 0 }} />

      {chartType === "mood" || chartType === "energy" ? (
        <>
          <YAxis
            dataKey="default"
            type="category"
            yAxisId="right-axis"
            orientation="left"
            tick={
              chartType === "mood" ? (
                <CustomizedYAxisMoodTick />
              ) : (
                <CustomizedYAxisEnergyTick />
              )
            }
            tickSize={0}
            domain={domain}
            tickMargin={10}
          />
          <YAxis dataKey={"averageValue"} hide={true} domain={domain} />
        </>
      ) : chartType === "weight" && maxWeight ? (
        <YAxis domain={[0, maxWeight]} />
      ) : (
        <YAxis />
      )}
      <Tooltip content={<CustomTooltip chartType={chartType} />} />

      {/* <YAxis dataKey={"default"} tickMargin={5} axisLine={false} /> */}

      {/* <Tooltip
        wrapperStyle={{
          width: 100,
          backgroundColor: "#ff0",
          alignSelf: "center",
          zIndex: 20,
        }}
      /> */}

      {/* <Tooltip /> */}
      <Area type="monotone" dataKey="averageValue" fill="#FEAFD6" />
      <Bar dataKey={"bar"} barSize={20} fill="#FF60991A" />
      <Line type="monotone" dataKey="averageValue" stroke="#f0f" />
      {/* <Scatter dataKey="averageValue" fill="red" /> */}
    </ComposedChart>
  );
};

export default MixedChart;
