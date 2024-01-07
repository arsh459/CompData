import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import ChildEventHolder from "./ChildEventHolder";
import JoinChallengeWidget from "./JoinChallengeWidget";

interface Props {
  // participatingCommunity?: string;
  // setSelectedUserKey: (key: string) => void;
  childEvents: EventInterface[];
}

const JoinWrapper: React.FC<Props> = ({
  childEvents,
  // participatingCommunity,
  // setSelectedUserKey,
}) => {
  return (
    <>
      <div
        id="participate"
        className={clsx(
          "pt-2 pb-2",
          childEvents.length === 0 ? "justify-center" : "justify-start"
        )}
      >
        <JoinChallengeWidget
          // participatingCommunity={participatingCommunity}
          childEventsPresent={childEvents.length > 0}
        />
      </div>
      <ChildEventHolder
        // presentId={participatingCommunity}
        childEvents={childEvents}
        // setSelectedUserKey={setSelectedUserKey}
      />
    </>
  );
};

export default JoinWrapper;
