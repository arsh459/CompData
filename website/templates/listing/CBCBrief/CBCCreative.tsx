// import clsx from "clsx";
import { eventTypes } from "@models/Event/Event";
import NumberedList, { ListItem } from "../NumberedList/NumberedList";

interface Props {
  viewStyle?: "mobile" | "desktop";
  heading: string;
  pointers: ListItem[];
  eventType?: eventTypes;
}

const CBCCreative: React.FC<Props> = ({
  eventType,
  viewStyle,
  heading,
  pointers,
}) => {
  return (
    <div>
      <div className="flex justify-center">
        {/* <div
          className={clsx("w-full h-96 shadow-lg hover:shadow-xl rounded-lg")}
        ></div> */}
      </div>
      <p className="text-center pt-2 text-2xl text-gray-500">{heading}</p>
      <div className={heading ? "pt-8" : ""}>
        <NumberedList
          //   vertical={true}

          viewStyle={viewStyle}
          headingSeparateLine={true}
          separator={eventType === "challenge" ? "number" : "tick"}
          // border={true}
          heading=""
          listItems={pointers}
        />
      </div>
    </div>
  );
};

export default CBCCreative;
