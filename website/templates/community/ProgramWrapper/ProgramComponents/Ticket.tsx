import clsx from "clsx";
import { useState } from "react";
import TicketModal from "./TicketModal";
// import { UserInterface } from "@models/User/User";
import { Activity } from "@models/Activities/Activity";
// import { clearTicket } from "@models/Activities/reportUtils";

interface Props {
  ticket: Activity;
  signedInId: string;
  teamKey: string;
  eventKey: string;
}

const Ticket: React.FC<Props> = ({ ticket, signedInId, teamKey, eventKey }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const id = ticket.id ? ticket.id : ticket.postId;
  const isOwner = ticket.authorUID === signedInId;
  // const ticketStatus =
  // ticket.reviewStatus === "REVIEW_REQUEST" ? "In Progress" : "Done";

  // const onCloseTicket = async () => {
  // setIsOpen(false);
  // await clearTicket(ticket.authorUID, id, signedInId);
  // };

  const onOpenClick = async () => setIsOpen(true);

  return (
    <>
      <div
        className={clsx(
          "w-full",
          "bg-gradient-to-b from-[#EEEEEE] to-[#EAE8E8] text-[#203C51]",
          "border border-[#D9D9D9] rounded-xl text-xl px-4 py-2"
        )}
      >
        <div className="text-[#0085E0] flex justify-between items-center">
          <p>{isOwner ? "Re-evaluation" : "Report"} Ticket</p>
          <p>#{id.slice(0, 5)}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p>
            <span className="font-bold">Status: </span>
            In Progress
            {/* {ticketStatus} */}
          </p>
          <button
            className={clsx(
              "bg-gradient-to-r from-[#F19B38] to-[#FD6F6F]",
              "text-white text-lg rounded-full px-8 py-0.5"
            )}
            onClick={onOpenClick}
          >
            Open
          </button>
        </div>
      </div>
      {ticket ? (
        <TicketModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          ticket={ticket}
          signedInUserId={signedInId}
          teamKey={teamKey}
          eventKey={eventKey}
          // onClearTicket={onCloseTicket}
        />
      ) : null}
    </>
  );
};

export default Ticket;
