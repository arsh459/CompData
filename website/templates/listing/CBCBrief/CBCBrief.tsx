import { eventTypes } from "@models/Event/Event";
import { ListItem } from "../NumberedList/NumberedList";
import CBCCreative from "./CBCCreative";

interface Props {
  viewStyle?: "mobile" | "desktop";
  eventType?: eventTypes;
  creativeList: ListItem[];
  noHeading?: boolean;
  //   courseGoal: string;
}

const CBCBrief: React.FC<Props> = ({
  viewStyle,
  eventType,
  creativeList,
  noHeading,
}) => {
  return (
    <div>
      <CBCCreative
        viewStyle={viewStyle}
        eventType={eventType}
        heading={
          noHeading
            ? ""
            : eventType === "challenge"
            ? "How does it work?"
            : "Introducing cohort based courses"
        }
        pointers={creativeList}
      />
    </div>
  );
};

export default CBCBrief;
