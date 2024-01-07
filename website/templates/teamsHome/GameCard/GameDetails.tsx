import { weEventTrack } from "@analytics/webengage/user/userLog";
import { STUDENT_OLYMPICS, TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { nFormatter } from "@utils/number";
// import Link from "next/link";
import JoinBtn from "./JoinBtn";

interface Props {
  event?: EventInterface;
  parentEvent: EventInterface;
  leader?: LeaderBoard;
  isMember: boolean;
}

const GameDetails: React.FC<Props> = ({
  event,
  parentEvent,
  leader,
  isMember,
}) => {
  const rewardsWorth: number | undefined = parentEvent?.awardsWorth
    ? parentEvent.awardsWorth
    : 100000;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-1.5 iphoneX:p-2.5 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
      <div className="italic text-white bg-[#575757]/50 backdrop-blur border border-[#D4D4D4] rounded-xl w-full p-2">
        <h2 className="text-lg iphoneX:text-2xl font-extrabold">
          {parentEvent.id === TEAM_ALPHABET_GAME
            ? `SocialBoat FitVerse`
            : `BITS HYD Challenge`}
        </h2>
        <div className="w-full flex mt-1 iphoneX:mt-2">
          <div className="flex-1 flex justify-evenly border border-[#D4D4D4] rounded-lg mr-2">
            {rewardsWorth ? (
              <>
                <div className="flex justify-center items-center p-1.5">
                  <img
                    src={`https://ik.imagekit.io/socialboat/charm_gift_IeCsxoU2S.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654797831107`}
                    alt="gift icon"
                    className="w-3 iphoneX:w-4"
                  />
                  <p className="text-[10px] iphoneX:text-xs pl-2">
                    Upto {nFormatter(rewardsWorth)}
                  </p>
                </div>
                <div className="w-px bg-[#D4D4D4]" />
              </>
            ) : null}
            <div className="flex justify-center items-center p-1.5">
              <img
                src={`https://ik.imagekit.io/socialboat/Group_175_e-omM88Wk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654336040168`}
                alt="members icon"
                className="w-4 iphoneX:w-5"
              />
              <p className="text-[10px] iphoneX:text-xs pl-2">
                {parentEvent?.students} {"teams"}
              </p>
            </div>
          </div>
          {/* <div className="h-px bg-[#D4D4D4]" /> */}
          {isMember && leader?.userKey && event?.eventKey ? (
            <a
              href={
                parentEvent.id === STUDENT_OLYMPICS
                  ? "https://socialboat.page.link/FhSa"
                  : "https://socialboat.page.link/tTRV"
              }
              // href={`/${encodeURI(
              //   leader?.userKey ? leader.userKey : ""
              // )}/${encodeURI(event?.eventKey ? event.eventKey : "")}/workout`}
              onClick={() =>
                weEventTrack("teamsHome_gamePlayClick", {
                  userKey: leader?.userKey ? leader.userKey : "no_userKey",
                  eventKey: event?.eventKey ? event.eventKey : "no_eventKey",
                  pageName: "workout",
                })
              }
            >
              <button className="bg-gradient-to-r from-[#FD6F6F] to-[#F19B38] flex items-center px-2 py-0.5 rounded-lg">
                <img
                  src={`https://ik.imagekit.io/socialboat/Group_169_1kuIpP-W4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654796017893`}
                  alt="forword icon"
                  className="w-3 iphoneX:w-4"
                />
                <span className="textReflection font-bold text-sm ip first-letter:text-base mx-2">
                  Play
                </span>
                <img
                  src={`https://ik.imagekit.io/socialboat/Group_169_1kuIpP-W4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654796017893`}
                  alt="forword icon"
                  className="w-3 iphoneX:w-4"
                />
              </button>
            </a>
          ) : (
            <a
              href={
                parentEvent.id === STUDENT_OLYMPICS
                  ? "https://socialboat.page.link/FhSa"
                  : "https://socialboat.page.link/tTRV"
              }
              // href={`/teams/${encodeURI(
              //   parentEvent?.eventKey ? parentEvent?.eventKey : ""
              // )}`}
              onClick={() =>
                weEventTrack("teamsHome_gameJoinClick", {
                  gameName: parentEvent.name,
                })
              }
            >
              <button className="w-20 iphoneX:w-28 flex justify-center items-center">
                <JoinBtn />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
