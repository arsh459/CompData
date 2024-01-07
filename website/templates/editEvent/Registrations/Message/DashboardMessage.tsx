// import clsx from "clsx";
import MessageContent from "./MessageContent";

export interface MessageInterface {
  img: string;
  eventName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amount: string | undefined;
  registrationType: "invite" | "paid";
  dateString: string;
  currency: string | undefined;
  cohortId: string;
  createdUnix: number;
  eventId: string;
  cohortName?: string;
  registrationId: string;
}

interface DashboardInterface extends MessageInterface {
  onCohortChangeClick: () => void;
}

const DashboardMessage: React.FC<DashboardInterface> = ({
  img,
  eventName,
  userEmail,
  userName,
  userPhone,
  amount,
  currency,
  dateString,
  registrationType,
  cohortName,
  onCohortChangeClick,
}) => {
  // console.log("e", cohortId);
  // console.log("cohortName", cohortName);
  return (
    <div className="flex shadow-xl p-2 pl-4 pr-4 rounded-md hover:shadow-2xl bg-white">
      <div className="flex-none">
        <img
          src={img}
          className="w-14 h-14 rounded-full object-cover shadow-md"
        />
      </div>
      <div className="flex-grow">
        <MessageContent
          onCohortChangeClick={onCohortChangeClick}
          eventName={eventName}
          userName={userName}
          registrationType={registrationType}
          userEmail={userEmail}
          userPhone={userPhone}
          amount={amount}
          currency={currency}
          cohortName={cohortName}
        />
        <div className="flex justify-end pt-1">
          <p className="text-xs text-gray-500 font-light">{dateString}</p>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default DashboardMessage;

// Ragini
// Ragini
// Dancer to entrepreneur
// Ragini
// Girl who rededined dance
//
//
