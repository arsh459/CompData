import clsx from "clsx";
import React from "react";
// import Divider from "@components/divider/Divider";
import IconRow from "@templates/listing/IconSection/IconRow";

interface Props {
  visible: boolean;
  visbleText: string;
  icon: string;
  editing?: boolean;
  active: boolean;
  placeholderText: string;
  subtext: string;
  viewStyle?: "mobile" | "desktop";
}
const RowKPI: React.FC<Props> = ({
  visible,
  visbleText,
  icon,
  editing,
  active,
  subtext,
  viewStyle,
  placeholderText,
}) => {
  return (
    <div>
      {visible ? (
        <IconRow subtext={subtext} text={visbleText} viewStyle={viewStyle}>
          <img src={icon} className="w-8 h-8" alt={icon} />
        </IconRow>
      ) : editing ? (
        <p
          className={clsx(
            "break-words",
            "whitespace-pre-wrap",
            editing && !active ? "text-gray-400" : "text-gray-600",
            "text-sm"
          )}
        >
          {placeholderText}
        </p>
      ) : null}
    </div>
  );
};

export default RowKPI;
