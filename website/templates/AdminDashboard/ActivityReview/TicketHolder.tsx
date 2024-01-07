import { useActivityTickets } from "@hooks/tickets/useActivityTickets";
// import { Button } from "@mui/material";
import {
  ActivityTicket,
  // reviewTicketStatus,
} from "@models/Activities/Activity";
import { onMakeTicketInActive } from "@models/Activities/reportUtils";
// import { onMarkTicket } from "@models/Activities/reportUtils";
import { useState } from "react";
// import { format } from "date-fns";
import TicketCard from "./TicketCard";
import TicketResponseModal from "./TicketResponseModal";

// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  numTickets?: number;
  activityId: string;
  uid: string;
}

const TicketHolder: React.FC<Props> = ({ activityId, uid, numTickets }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentTicket, setCurrentTicket] = useState<ActivityTicket>();

  const { activityTicketArr } = useActivityTickets(uid, activityId);

  const onRespondToTicket = (item: ActivityTicket) => {
    setIsVisible(true);
    setCurrentTicket(item);
  };

  // console.log("currentTicket", currentTicket);

  const onClearTicket = async (item: ActivityTicket) => {
    await onMakeTicketInActive(uid, activityId, item.id);
  };

  const onCloseModal = () => setIsVisible(false);

  return (
    <>
      <TicketResponseModal
        ticket={currentTicket}
        isVisible={isVisible}
        onClose={onCloseModal}
        uid={uid}
        activityId={activityId}
      />
      <h1 className="text-3xl font-semibold pt-4">
        Tickets {numTickets ? `(${numTickets})` : "(0)"}
      </h1>
      <div className="py-2 flex overflow-x-auto">
        {activityTicketArr.map((item) => {
          return (
            <div
              // className="px-4 mr-4 py-4 border shadow-sm min-w-[240px]"
              key={item.id}
            >
              <TicketCard
                onClearTicket={onClearTicket}
                item={item}
                onRespondToTicket={onRespondToTicket}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TicketHolder;
