import clsx from "clsx";
import React from "react";
// import { icons } from "./constants";
import IconRow from "./IconRow";

export interface IconEl {
  icon: string;
  text: string;
}

interface Props {
  icons: IconEl[];
}
const IconSection: React.FC<Props> = ({ icons }) => {
  return (
    <div className={clsx("flex flex-col gap-y-4")}>
      {icons.map((item) => {
        return (
          <div key={item.icon}>
            <IconRow text={item.text}>
              <div>
                <img src={item.icon} className="w-6 h-6" />
              </div>
            </IconRow>
          </div>
        );
      })}
    </div>
  );
};

export default IconSection;
