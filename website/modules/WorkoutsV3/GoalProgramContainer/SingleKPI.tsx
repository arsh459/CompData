import clsx from "clsx";
import React from "react";

import { KPIConfig } from "@models/Tasks/SystemKPIs";
import IconSelector from "./SvgIcons";
import { getPace, GoalKPIList } from "./utils";
interface Props {
  // value?: number;
  // kpi: SystemKPIs;
  // index: number;
  // target: number;

  kpiValue: GoalKPIList;
  //   value: number;
  //   color: "red" | "yellow" | "blue";

  //   icon: iconGoalType;
  //   label: string;
  //   time?: number;
  //   pace?: number;
  //   distance?: number;
}
const SingleKPI: React.FC<Props> = ({ kpiValue }) => {
  //   ?const svgColor =
  //    ? color === "red" ? "#F15454" : color === "blue" ? "#2096E8" : "#F19B38";
  const kpi = kpiValue.systemKPI;
  const iconType = KPIConfig[kpi]?.icon ? KPIConfig[kpi]?.icon : "time";
  const unit = KPIConfig[kpi]?.unit ? KPIConfig[kpi]?.unit : "Days";
  const color = kpiValue.color;
  const value = kpiValue.actualValue;
  const target = kpiValue.targetVal;

  // console.log("kpi", kpiValue.color);
  // const label = KPIConfig[kpi].label;
  return (
    <div
      className={clsx(
        color === "#FF9933"
          ? "text-[#FF9933]"
          : color === "#FFFFFF"
          ? "text-[#FFFFFF]"
          : color === "#138808"
          ? "text-[#138808]"
          : color === "#F15454"
          ? "text-[#F15454]"
          : color === "#2096E8"
          ? "text-[#2096E8]"
          : "text-[#F19B38]",
        ""
      )}
    >
      <div className="iphoneX:text-xl w-full flex">
        {iconType ? (
          <div className="mt-0.5">
            <IconSelector iconType={iconType} color={color} size="small" />
          </div>
        ) : null}
        <div className="ml-2 iphoneX:ml-4">
          <span className="iphoneX:text-xl ">
            {kpi === "running_pace" && value
              ? `${getPace(value)}`
              : kpi === "running_pace"
              ? "0:00"
              : value
              ? value
              : "0"}
            {kpi === "running_pace" ? ` / ${getPace(target)}` : ` / ${target}`}
          </span>
          <h6 className="text-xs iphoneX:text-sm line-clamp font-light capitalize">
            {unit}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SingleKPI;
