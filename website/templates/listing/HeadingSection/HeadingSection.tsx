import clsx from "clsx";
import React from "react";
import TextLayout from "../Layout/TextLayout";

interface Props {
  heading?: string;
  // rating?: number;
  // numRatings?: number;
  // currency?: "₹";
  // price?: number;
  // registratinCloseDate?: string;
  viewStyle?: "mobile" | "desktop";
  editing?: boolean;
  active?: boolean;
}
const HeaderImage: React.FC<Props> = ({
  viewStyle,
  heading,
  editing,
  active,
}) => {
  return (
    <TextLayout editing={editing} active={active}>
      <div
        className={clsx(
          "pt-2"
          // "pl-4 pr-4"
        )}
      >
        <p
          className={clsx(
            editing && !active ? "text-gray-400" : "text-gray-700",
            viewStyle === "mobile" ? "text-2xl" : "text-2xl md:text-4xl",
            "font-semibold"
          )}
        >
          {heading ? heading : editing ? "Add heading" : "Your event name"}
        </p>
      </div>
    </TextLayout>
  );
};

export default HeaderImage;
