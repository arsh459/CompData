import { GoalKPIList } from "@utils/goalprogram/utils";
import { View } from "react-native";
import SingleKPI from "./SingleKpi";

interface Props {
  kpis: GoalKPIList[];
}
const YourGoalKpi: React.FC<Props> = ({ kpis }) => {
  return (
    <View className=" flex flex-col justify-evenly rounded-2xl flex-1">
      {kpis.map((item, index) => {
        return (
          <View key={`${item}-${index}`} className="py-1">
            <SingleKPI
              kpiValue={item}
              // value={val}
              // kpi={kpi}
              // target={target}
              // index={index}
            />
          </View>
        );
      })}
    </View>
  );
};
export default YourGoalKpi;
