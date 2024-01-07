// import { useJoinChallenge } from "@hooks/community/useJoinChallenge";
// import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import NextButton from "../NextButton";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import clsx from "clsx";
// import { useRouter } from "next/router";
// import ChallengeCard from "./ChallengeCard";
import ChallengeCardV2 from "./ChallengeCardV2";
// import ChallengeCardV2 from "./ChallengeCardV2";
// import ChallengeCardsHolder from "./ChallengeCardsHolder";
// import JoinChallengeWidget from "./JoinChallengeWidget";

interface Props {
  childEvents: EventInterface[];
  onNext: () => void;
  nextExists?: boolean;
  justifyStyle?: "justify-evenly";
}

const ChildEventHolderV2: React.FC<Props> = ({
  childEvents,
  nextExists,
  onNext,
  // presentId,
  justifyStyle,
}) => {
  //   const { childEvents } = useJoinChallenge(props.selectedEvent.id);

  //   const router = useRouter();

  return (
    <div>
      {childEvents.length ? (
        <p className="text-gray-700 font-semibold text-xl">
          Teams in the Challenge
        </p>
      ) : null}

      <div
        className={clsx(
          "pt-4",
          // "masonry"
          justifyStyle ? justifyStyle : "justify-evenly md:justify-start",
          "flex flex-wrap w-full "
        )}
      >
        {childEvents.map((item) => {
          return (
            <div key={item.id} className="w-1/3 max-w-[200px] pr-4 pb-4">
              <ChallengeCardV2
                boatEvent={item}
                selected={false}
                // onSelectFire={setSelectedUserKey}
                //   router={router}
              />
            </div>
          );
        })}
      </div>

      <div>
        {nextExists ? (
          <div className="bg-white w-full pb-4 md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChildEventHolderV2;
