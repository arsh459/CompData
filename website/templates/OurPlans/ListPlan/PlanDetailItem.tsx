import { CheckIcon, XIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";
interface Props {
  label: string;
  value?: string | number;
  suffix?: string;
  showRight?: boolean;
  showWrong?: boolean;
  showBorder?: boolean;
  styleTw?: string;
}
const PlanDetailItem: React.FC<Props> = ({
  label,
  value,
  suffix,
  showRight,
  showWrong,
  showBorder,
  styleTw,
}) => {
  const shouldShowRight =
    showRight ??
    ((typeof value === "number" && value > 0) ||
      (typeof value == "boolean" && value === true) ||
      (typeof value == "string" && value === "Yes"));
  const shouldShowWrong =
    showWrong ??
    ((typeof value === "number" && value === 0) ||
      (typeof value == "boolean" && value === true) ||
      (typeof value == "string" && value === "No"));

  return (
    <div
      className={clsx(
        "px-4",
        "py-4 text-xs h-16 sm:h-12 text-white/70 font-popL ",
        showBorder && "sm:border-b sm:border-white/20",
        styleTw
      )}
    >
      <div className="flex items-center">
        {shouldShowRight && <CheckIcon className="w-5  aspect-[10/7]" />}
        {shouldShowWrong && <XIcon className="w-5 aspect-[10/7]" />}
        <p className="pl-1">{value}</p>
      </div>
      <p>{suffix}</p>
    </div>
  );
};

export default PlanDetailItem;
