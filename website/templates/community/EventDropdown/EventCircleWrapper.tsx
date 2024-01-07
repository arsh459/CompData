import { eventVisibility } from "@hooks/community/useCommunityEvent";
import { useUnlockedEvent } from "@hooks/useUnlockedEvent";
// import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
// import { useEffect } from "react";
// import EventCircle from "./EventCircle";
import EventCircleV2 from "./EventCircleV2";

interface Props {
  item: EventInterface;
  // enrolled: boolean;
  selected: boolean;
  // setEventViewState: (newState: eventVisibility) => void;
  onClick: (newId: string, cohortId: string) => void;
  subtitle?: string;
  cohortId?: string;
  communityId: string;
  signedInUser?: UserInterface;
  signedInUID?: string;
}

const EventCircleWrapper: React.FC<Props> = ({
  item,
  // enrolled,
  onClick,
  subtitle,
  selected,
  cohortId,
  // signedInUID,
  // setEventViewState,
  communityId,
  signedInUser,
}) => {
  const { enrolled } = useUnlockedEvent(
    signedInUser,
    item.id,
    communityId,
    cohortId,
    item.cost,
    item.needsRegistration
  );

  const onEventClick = (access: eventVisibility, eId: string, cId?: string) => {
    // console.log("eId", eId, "cId", cId);
    onClick(eId, cId ? cId : "");
    // setEventViewState(access);
  };

  // useEffect(() => {
  //   if (enrolled && selected) {
  //     setEventViewState("community");
  //   } else if (selected) {
  //     setEventViewState("preview");
  //   }
  // }, [enrolled, selected, setEventViewState]);

  // console.log("item", item.cost);
  // console.log("enrolled", enrolled, selected);

  if (
    item.name &&
    item.eventKey &&
    enrolled
    // ||
    // (item.cost === 0 && !item.needsRegistration)
  )
    return (
      <div key={item.id}>
        <EventCircleV2
          onClick={() => onEventClick("community", item.id, cohortId)}
          // userEvent={item}
          eventName={item.name}
          eventMedia={item.media}
          selected={selected}
          enrolled={true}
          subtitle={subtitle}
        />
      </div>
    );
  else if (item.name && item.eventKey) {
    return (
      // <Link key={item.id} href={`/events/${item.eventKey}`} target="_blank">
      <div>
        <EventCircleV2
          onClick={() => onEventClick("preview", item.id, cohortId)}
          // userEvent={item}
          eventName={item.name}
          eventMedia={item.media}
          selected={selected}
          enrolled={enrolled}
          subtitle={subtitle}
        />
      </div>
      // </Link>
    );
  } else {
    return <div />;
  }
};

export default EventCircleWrapper;
