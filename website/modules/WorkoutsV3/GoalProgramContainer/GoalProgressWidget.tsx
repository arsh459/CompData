// import { goalResolutionStrategy, iconGoalType } from "@models/Tasks/Task";
// import { UserRank } from "@models/Activities/Activity";
// import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import React from "react";
import CirclePercentV2 from "../CircleRings/CirclePercentV2";
import { GoalKPIList } from "./utils";
import YourGoalKpi from "./YourGoalKpi";
interface Props {
  // isOpen: boolean;
  // setIsOpen: (val: boolean) => void;
  // circleSize?: number;
  // kpis: SystemKPIs[];
  // userRank?: UserRank;
  // time?: number;
  // pace?: number;
  // distance?: number;
  data?: GoalKPIList[];
}

const GoalProgressWidget: React.FC<Props> = ({
  // circleSize,
  data,
  // kpis,
  // userRank,
  // distance,
  // pace,
  // time,
}) => {
  // const [circleWidth, setCircleWidth] = useState(0);
  // const targetElement = useCallback((node) => {
  //   if (node !== null) {
  //     setCircleWidth(node.clientWidth);
  //   }
  // }, []);
  // console.log("d", data);

  return (
    <>
      {data ? (
        <div className="flex justify-evenly">
          <div className=" flex-none ">
            <CirclePercentV2 circleSize={180} data={data} />
          </div>
          {/* <div className="w-1 iphoneX:w-2" /> */}
          <div className="ml-2   ">
            <YourGoalKpi kpis={data} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GoalProgressWidget;
