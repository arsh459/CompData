import { CheckIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";
interface Props {
  text?: string;
  hideBorder?: boolean;
}
const FreeForeverListCard: React.FC<Props> = ({ text, hideBorder }) => {
  return (
    <div className={clsx("my-3", hideBorder && "mb-2")}>
      <div
        className={clsx(
          " text-xs  text-white/70 font-popR pb-2.5 flex  justify-between "
        )}
      >
        <p className="flex-1 px-2">{text}</p>
        <div className="flex items-center justify-end flex-1 pr-2">
          <CheckIcon className="w-5  aspect-[10/7]" />

          <span className="pl-1">Yes</span>
        </div>
      </div>
      {hideBorder ? null : <div className="h-px bg-white/20 flex-1 " />}
    </div>
  );
};

export default FreeForeverListCard;
