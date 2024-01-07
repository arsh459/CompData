import { GoalKPIList } from "@utils/goalprogram/utils";
import { View } from "react-native";
import YourGoalKpi from "./YourGoalKpi";
// import { ProgressChart } from "react-native-chart-kit";
import { useState } from "react";
// import { Dimensions } from "react-native";

// const windowWidth = Dimensions.get("window").width;
interface Props {
  data?: GoalKPIList[];
}

// const chartConfig = {
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientToOpacity: 0,

//   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
// };

// const getCircleData = (dataI?: GoalKPIList[]) => {
//   if (dataI) {
//     const dataRev = dataI.slice().reverse();

//     const progress = dataRev.map((item) =>
//       item.progress > 1 ? 1 : item.progress
//     );
//     const colors = dataRev.map((item) => item.color);
//     return {
//       data: progress,
//       colors,
//     };
//   } else {
//     return {
//       data: [1, 1, 1],
//       colors: ["#F1545433", "#2096E833", "#F19B3833"],
//     };
//   }
// };

// interface Props {}

const GoalProgressWidget: React.FC<Props> = ({ data }) => {
  const [_, setCircleSize] = useState(0);

  return (
    <>
      {data ? (
        <View
          className="flex flex-1 flex-row justify-between "
          onLayout={(e) => setCircleSize(e.nativeEvent.layout.width / 2)}
        >
          {/* <ProgressChart
            data={getCircleData(data)}
            width={circleSize}
            height={circleSize}
            strokeWidth={windowWidth <= 320 ? 10 : 15}
            radius={30}
            chartConfig={chartConfig}
            hideLegend={true}
            withCustomBarColorFromData={true}
          /> */}

          <View className="mx-2   ">
            <YourGoalKpi kpis={data} />
          </View>
        </View>
      ) : null}
    </>
  );
};
export default GoalProgressWidget;
