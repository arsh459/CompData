// import { useJoinChallenge } from "@hooks/community/useJoinChallenge";
// import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import clsx from "clsx";
// import { useRouter } from "next/router";
import ChallengeCard from "./ChallengeCard";
// import ChallengeCardV2 from "./ChallengeCardV2";
// import ChallengeCardsHolder from "./ChallengeCardsHolder";
// import JoinChallengeWidget from "./JoinChallengeWidget";

interface Props {
  childEvents: EventInterface[];
  // presentId?: string;
  // setSelectedUserKey?: (key: string) => void;
  justifyStyle?: "justify-evenly";
}

const ChildEventHolder: React.FC<Props> = ({
  childEvents,
  // setSelectedUserKey,
  // presentId,
  justifyStyle,
}) => {
  //   const { childEvents } = useJoinChallenge(props.selectedEvent.id);

  //   const router = useRouter();

  return (
    <div
      className={clsx(
        justifyStyle ? justifyStyle : "justify-evenly md:justify-start",
        "flex flex-wrap w-full "
      )}
    >
      {childEvents.map((item) => {
        return (
          <div key={item.id} className="w-1/2 md:w-1/3 max-w-[200px] pr-4 pb-8">
            <ChallengeCard
              boatEvent={item}
              selected={false}
              // onSelectFire={setSelectedUserKey}
              //   router={router}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChildEventHolder;
