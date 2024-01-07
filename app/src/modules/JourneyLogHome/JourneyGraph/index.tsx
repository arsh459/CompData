import { useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import DotContent, { graphHeight } from "./DotContent";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { WeekDataObj } from "../utils";

// const data = {
//   labels: ["", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
//   datasets: [
//     {
//       data: [50, 80, 45, 28, 80, 99, 43, 60],
//       color: () => "#5D588C",
//       strokeWidth: 0.1,
//     },
//   ],
// };

const chartConfig: AbstractChartConfig = {
  fillShadowGradientFrom: "#473A86",
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientTo: "#2D2A4500",
  fillShadowGradientToOpacity: 0,
  color: () => "#FFFFFF73",
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForDots: { r: "6" },

  propsForBackgroundLines: {
    stroke: "#FFFFFF1F",
    strokeDasharray: "1000",
    strokeWidth: 1,
  },
  propsForVerticalLabels: {
    fontSize: 12,
  },
};
interface Props {
  data: LineChartData;
  weekData?: WeekDataObj[];
}

const JourneyGraph: React.FC<Props> = ({ data, weekData }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { width } = useWindowDimensions();
  useEffect(() => {
    setActiveIndex(data.labels.length - 1);
  }, [data.labels.length]);

  return (
    <LineChart
      data={data}
      width={width}
      height={graphHeight}
      chartConfig={chartConfig}
      yAxisSuffix="kg"
      getDotColor={(dataPoint, index) =>
        dataPoint ? "#58588C" : "transparent"
      }
      bezier
      withInnerLines={false}
      style={{ marginRight: 28 }}
      transparent={true}
      fromZero={true}
      hidePointsAtIndex={[0]}
      onDataPointClick={({ index, value }) =>
        value !== 0 && setActiveIndex(index)
      }
      renderDotContent={({ x, y, index, indexData }) => {
        const value = weekData && [{ date: "", weight: 0 }, ...weekData];

        return (
          <DotContent
            key={`DotContent-${index}`}
            activeIndex={activeIndex}
            // activeIndex={2}
            index={index}
            x={x}
            y={y}
            weight={indexData}
            date={value && indexData ? value[activeIndex]?.date : ""}
          />
        );
      }}
    />
  );
};

export default JourneyGraph;
