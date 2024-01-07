import { Activity } from "@models/Activities/Activity";
import Ticket from "../Ticket";

interface Props {
  tickets: Activity[];
  signedInId: string;
  teamKey: string;
  eventKey: string;
  // tryAgainURL: string;
}

const TicketsHolder: React.FC<Props> = ({
  tickets,
  signedInId,
  teamKey,
  eventKey,
}) => {
  return (
    <div className="flex overflow-scroll no-scrollbar ml-4">
      {tickets.map((item) => {
        return (
          <div key={item.id} className="mr-2 min-w-[340px] ">
            <Ticket
              signedInId={signedInId}
              ticket={item}
              teamKey={teamKey}
              eventKey={eventKey}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TicketsHolder;
