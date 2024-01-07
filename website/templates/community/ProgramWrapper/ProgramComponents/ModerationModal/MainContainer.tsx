// import { reviewStatus } from "@models/Activities/Activity";
import clsx from "clsx";
import { format } from "date-fns";

interface Props {
  expiry: number;
  isUserActivity: boolean;
  onReport: () => void;
  // reviewStatus?: reviewStatus;
  hasTicket?: boolean | undefined;
  // onRevaluate: () => void;
}

const now = Date.now();

const MainContainer: React.FC<Props> = ({
  expiry,
  isUserActivity,
  onReport,
  // reviewStatus,
  hasTicket,
  // onRevaluate,
}) => {
  const dtExpiry = new Date(expiry);
  const status = expiry >= now;
  // const isTicketNext = reviewStatus === "REVIEW_REQUEST"; //|| reviewStatus === "TICKET_REVIEWED";

  return (
    <>
      <p className="iphoneX:text-lg py-6">
        {hasTicket
          ? "You have requested a review for this task. You can click below to see the status."
          : status
          ? "If you think there is a discrepancy in the review, please report. All users have 24 hours after the review to report issues. After that the score is frozen."
          : "Time to report has expired. All scores after 24 hours of posting are frozen. Hope you understand!"}
      </p>
      {hasTicket ? null : (
        <>
          <div className="text-2xl iphoneX:text-4xl">
            {` ${format(dtExpiry, "dMMM")}, `}
            <span className="font-extrabold">{`${format(
              dtExpiry,
              "hh"
            )} :`}</span>
            {` ${format(dtExpiry, "mm")} `}
            <span className="iphoneX:text-lg uppercase">
              {format(dtExpiry, "aaa")}
            </span>
          </div>
          <p className="iphoneX:text-lg pt-1 pb-2">Deadline to report</p>
        </>
      )}
      {hasTicket ? (
        <button className={clsx("flex items-center my-4")} onClick={onReport}>
          <h2
            className={clsx(
              "text-[#0085E0]",
              "text-lg iphoneX:text-2xl font-extrabold"
            )}
          >
            Open Ticket
          </h2>
        </button>
      ) : (
        <button
          disabled={!status}
          className={clsx("flex items-center my-4")}
          onClick={onReport}
        >
          <img
            src={
              isUserActivity
                ? `https://ik.imagekit.io/socialboat/Vector__3__tmNXIKpTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653737909544`
                : `https://ik.imagekit.io/socialboat/Group_181_xvqWxR7Py.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653724850315`
            }
            alt="caution icon"
            className={clsx(!status ? "grayscale" : "", "mr-2")}
          />
          <h2
            className={clsx(
              !status
                ? "text-[#6e6e6e]"
                : isUserActivity
                ? "text-[#0085E0]"
                : "text-[#FD6F6F]]",
              "text-lg iphoneX:text-2xl font-extrabold"
            )}
          >
            {isUserActivity ? "Revaluate" : "Report"}
          </h2>
        </button>
      )}
      {/* ) : (
        <button
          disabled={!status}
          className="flex items-center my-4"
          onClick={onReport}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Group_181_xvqWxR7Py.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653724850315`}
            alt="caution icon"
            className={clsx(!status ? "grayscale" : "", "mr-2")}
          />
          <h2
            className={clsx(
              !status ? "text-[#6e6e6e]" : "text-[#FD6F6F]]",
              " text-2xl font-extrabold"
            )}
          >
            Report
          </h2>
        </button>
      )} */}
    </>
  );
};

export default MainContainer;
