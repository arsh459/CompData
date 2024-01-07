import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { EventInterface } from "@models/Event/Event";
import EventBriefLocked from "../EventBrief/EventBriefLocked";
import BadgesContainer from "../Prizes/BadgesContainer";
import SelectTeam from "@templates/selectTeam/SelectTeam";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import Section from "./Section";
import HowToWin from "../HowToPlay/HowToWin";
import LockedProgramWrapper from "./LockedProgramWrapper";
import { useState } from "react";
import TestimonialContainerV2 from "@templates/community/Transformations/TestimonialContainerV2";
import { UserInterface } from "@models/User/User";
import { getGamePricingHandler } from "server/payments/getSubscriptionPlan";
interface Props {
  selectedEvent: EventInterface;
  leader: UserInterface;
  parentEvent: EventInterface | null;
  paddingTop?: boolean;
  urlState: communityQueryV3;
  queryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const LockedProgramV3: React.FC<Props> = ({
  selectedEvent,
  urlState,
  parentEvent,
  leader,
  queryChange,
  paddingTop,
}) => {
  const onNextClick = () => {
    if (selectedEvent.parentId) {
      window.location.replace(
        `/joinBoatV3/${encodeURI(
          selectedEvent.eventKey ? selectedEvent.eventKey : ""
        )}`
      );
    } else {
      queryChange({ ...urlState, teamSelect: "1" }, undefined, true);
      weEventTrack("game_next_click", {});
    }
  };
  const [showImg, setShowImg] = useState<boolean>(true);

  // get game cost
  const { cost, moneyBackDays, freeAccessDays } = getGamePricingHandler(
    parentEvent ? parentEvent : selectedEvent
  );
  // console.log("cost", cost);
  return (
    <div
      id={"targetDivEle"}
      className="max-w-md mx-auto fixed inset-0 z-20 bg-black text-white overflow-y-scroll snap-mandatory snap-y"
    >
      {!urlState.teamSelect ? (
        <LockedProgramWrapper
          headText={selectedEvent.name}
          moneyBackDays={moneyBackDays}
          freeTrialDays={freeAccessDays}
          showImg={showImg}
          cost={cost}
          onClick={onNextClick}
        >
          <Section target="intro">
            <EventBriefLocked
              leader={leader}
              game={parentEvent ? parentEvent : selectedEvent}
              team={parentEvent ? selectedEvent : undefined}
              setShowImg={setShowImg}
            />
          </Section>
          <Section target="rewards">
            <BadgesContainer
              parentEvent={parentEvent ? parentEvent : selectedEvent}
              paddingTop={paddingTop}
            />
          </Section>
          <Section target="transform">
            <TestimonialContainerV2 />
          </Section>
          <HowToWin />
        </LockedProgramWrapper>
      ) : (
        <div className="pt-16 h-full bg-white">
          <SelectTeam
            parentId={
              selectedEvent.parentId ? selectedEvent.parentId : selectedEvent.id
            }
            parentKey={
              parentEvent?.eventKey
                ? parentEvent?.eventKey
                : selectedEvent.eventKey
            }
            game={parentEvent ? parentEvent : selectedEvent}
            // leaderboardMonth={urlState.leaderboardMonth}
            // leaderboardWeek={urlState.leaderboardWeek}
            lpg={urlState.lpg}
            ls={urlState.lS}
            queryChange={queryChange}
          />
        </div>
      )}
    </div>
  );
};

export default LockedProgramV3;
