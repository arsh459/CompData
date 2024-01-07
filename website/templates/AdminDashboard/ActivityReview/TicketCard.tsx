// import { useActivityTickets } from "@hooks/tickets/useActivityTickets";
import { Button } from "@mui/material";
import {
  ActivityTicket,
  //   reviewTicketStatus,
} from "@models/Activities/Activity";
// import { onMarkTicket } from "@models/Activities/reportUtils";
import { format } from "date-fns";

// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  item: ActivityTicket;
  onRespondToTicket: (item: ActivityTicket) => void;
  onClearTicket: (item: ActivityTicket) => void;
}

const TicketCard: React.FC<Props> = ({
  item,
  onRespondToTicket,
  onClearTicket,
}) => {
  return (
    <>
      <div
        className="px-4 mr-4 py-4 border shadow-sm min-w-[300px]"
        // key={item.id}
      >
        <p className="font-bold">{item.userMessage}</p>
        <p className="text-red-500">{item.createdByName}</p>
        <p>{item.createdByPhone}</p>
        <p className="text-sm">
          {format(new Date(item.createdOn), "h:mm a dd-MM-yyyy")}
        </p>
        <p className="text-gray-700 pt-2 font-medium">{item.judgeMessage}</p>

        <div className="pt-2 flex">
          <Button
            variant={
              item.reviewStatus === "REVIEWED" ? "contained" : "outlined"
            }
            onClick={() => onRespondToTicket(item)}
          >
            {item.reviewStatus === "PENDING" ? "Add Review" : "Edit Review"}
          </Button>

          {/* <div className="pl-2">
            <Button variant={"outlined"} onClick={() => onClearTicket(item)}>
              {item.isActive ? "Clear" : "Cleared"}
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TicketCard;
