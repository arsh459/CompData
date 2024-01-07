import React from "react";
// import { Cell, Pie, PieChart } from "recharts";
import { GoalKPIList } from "../GoalProgramContainer/utils";

interface Props {
  circleSize: number;

  data: GoalKPIList[];
}

const CirclePercentV2: React.FC<Props> = ({ circleSize, data }) => {
  // const radius = circleSize / 2;
  // const strokeWidth = radius / 10;
  return (
    <div />
    // <PieChart width={circleSize} height={circleSize}>
    //   {data.map((pie, index) => {
    //     const progress = Math.round(pie.progress * 100);
    //     // const progress = 150;
    //     // console.log(pie);

    //     const pieData = [
    //       { id: "1", name: "L1", value: progress },
    //       { id: "2", name: "L2", value: 100 - progress },
    //     ];
    //     const outerRadius = radius - index * strokeWidth * 2;
    //     const innerRadius = radius - strokeWidth - index * strokeWidth * 2;
    //     return (
    //       <Pie
    //         data={pieData}
    //         dataKey="value"
    //         outerRadius={`${outerRadius}%`}
    //         innerRadius={`${innerRadius}%`}
    //         fill={`${pie.color ? pie.color : "#FFFFFF"}4D`}
    //         cornerRadius={50}
    //         startAngle={90}
    //         endAngle={-270}
    //         paddingAngle={-5}
    //         strokeWidth={0}
    //         key={`${pie.color}-${index}`}
    //         // cornerRadius={50}
    //       >
    //         <Cell
    //           key="test"
    //           fill={pie.color ? pie.color : "#FFF"}
    //           // cornerRadius={50}
    //         />
    //       </Pie>
    //     );
    //   })}
    // </PieChart>
  );
};

export default CirclePercentV2;
