// import { NotificationInterface } from "@templates/dashboard/constants";
// import KPIContainer from "@templates/dashboard/KPIContainer";
// import clsx from "clsx";
import { Cohort, EventInterface } from "@models/Event/Event";
import DashboardMessage, { MessageInterface } from "./Message/DashboardMessage";
import { getCohortName } from "./Message/getCohortName";

interface Props {
  messages: MessageInterface[];
  remoteEvents: { [eventId: string]: EventInterface };
  remoteCohorts: { [eventId: string]: { [cohortId: string]: Cohort } };
  onCohortChangeClick: (msg: MessageInterface) => void;
}

// const earnings = 999;
// const currency = "₹";
// const views = 234;
// const students = 24;

const RegistrationsMessages: React.FC<Props> = ({
  messages,
  remoteEvents,
  remoteCohorts,
  onCohortChangeClick,
}) => {
  return (
    <div className="sm:flex sm:flex-wrap">
      {messages.map((item, index) => {
        return (
          <div key={`${item.userName}-${index}`} className="p-2">
            <DashboardMessage
              {...item}
              cohortName={getCohortName(
                item.eventId,
                remoteCohorts,
                item.cohortId
              )}
              onCohortChangeClick={() => onCohortChangeClick(item)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationsMessages;

// Ragini
// Ragini
// Dancer to entrepreneur
// Ragini
// Girl who rededined dance
//
//
