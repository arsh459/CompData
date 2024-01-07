import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import ListHolder from "./ListHolder";

interface Props {
  heading: string;
  listItems?: ListItem[];
  border?: boolean;
  vertical?: boolean;
  separator: "bullet" | "tick" | "number" | "none";
  headingSeparateLine?: boolean;
  viewStyle?: "mobile" | "desktop";
  placeholderList?: ListItem[];
  paddingString?: string;
}

export type whatYouGainIcon = "speed" | "lung" | "muscle";

export interface ListItem {
  text: string;
  heading?: string;
  icon?: whatYouGainIcon;

  media?: CloudinaryMedia | AWSMedia;
  starts?: number;
  ends?: number;
  pointers?: string[];
  subtitle?: string;
  prizeLabel?: string;
  rank?: number;
  rankEnd?: number;
  coach?: boolean;
  worth?: number;
  linkObj?: { text: string; link: string };
  duration?: "weekly";
}

const NumberedList: React.FC<Props> = ({
  heading,
  viewStyle,
  listItems,
  border,
  vertical,
  separator,
  headingSeparateLine,
  placeholderList,
  paddingString,
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg",
        border ? "border border-gray-300 hover:shadow-lg p-4" : ""
        // "bg-red-50"
      )}
    >
      <p className="text-gray-700 font-semibold text-xl">{heading}</p>
      <div
        className={clsx(vertical ? "w-full " : "flex flex-wrap w-full", "pt-2")}
      >
        {listItems && listItems.length > 0 ? (
          <ListHolder
            viewStyle={viewStyle}
            vertical={vertical}
            paddingString={paddingString}
            listItems={listItems}
            separator={separator}
            headingSeparateLine={headingSeparateLine}
          />
        ) : placeholderList ? (
          <ListHolder
            viewStyle={viewStyle}
            vertical={vertical}
            paddingString={paddingString}
            listItems={placeholderList}
            separator={separator}
            headingSeparateLine={headingSeparateLine}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NumberedList;
