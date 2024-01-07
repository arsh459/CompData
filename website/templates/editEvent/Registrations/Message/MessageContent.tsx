// import clsx from "clsx";

export interface MessageContentInterface {
  eventName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amount: string | undefined;
  currency: string | undefined;
  registrationType: "invite" | "paid";
  cohortName?: string;
  onCohortChangeClick: () => void;
}

const MessageContent: React.FC<MessageContentInterface> = ({
  eventName,
  userName,
  userEmail,
  userPhone,
  amount,
  registrationType,
  currency,
  cohortName,
  onCohortChangeClick,
}) => {
  return (
    <div className="">
      <div>
        <div className="pl-2 flex">
          <p className="text-sm text-gray-500">Sign up:</p>
          <p className="text-sm text-gray-700 font-semibold pl-1">
            {eventName}
          </p>
        </div>
        <div className="pl-2">
          <div className="flex">
            <p className="text-sm text-green-500 capitalize">
              {registrationType}
            </p>
            {amount && registrationType === "paid" ? (
              <>
                <p className="text-sm text-gray-500 pl-1">
                  {currency ? currency : ""}
                </p>
                <p className="text-sm text-gray-500 pl-1">{amount}</p>
              </>
            ) : null}
          </div>
        </div>
        <div className="pl-2 flex">
          {/* <p className="text-sm text-gray-500">Name:</p> */}
          <p className="text-sm text-gray-700 font-normal pl-0">{userName}</p>
          <p className="text-sm text-gray-500 font-normal pl-1">
            ({userPhone})
          </p>
        </div>
      </div>
      <div>
        {/* <div className="pl-2 flex"> */}
        {/* <p className="text-sm text-gray-500">Phone:</p> */}
        {/* <p className="text-sm text-gray-700 font-normal pl-0">{userPhone}</p> */}
        {/* </div> */}
        <div className="pl-2 flex">
          <p className="text-sm text-gray-500">Email:</p>
          <p className="text-sm text-gray-500 font-normal pl-1">{userEmail}</p>
        </div>

        <div className="pl-2 flex">
          <p className="text-sm text-gray-500">Cohort:</p>
          {cohortName ? (
            <>
              <p className="text-sm text-gray-500 font-semibold pl-1">
                {cohortName}
              </p>
              <div className="cursor-pointer" onClick={onCohortChangeClick}>
                <p className="text-sm text-orange-500 underline font-normal pl-1">
                  {"Change"}
                </p>
              </div>
            </>
          ) : (
            <div className="cursor-pointer" onClick={onCohortChangeClick}>
              <p className="text-sm text-orange-500 underline font-normal pl-1">
                {"Assign"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageContent;

// Ragini
// Ragini
// Dancer to entrepreneur
// Ragini
// Girl who rededined dance
//
//
