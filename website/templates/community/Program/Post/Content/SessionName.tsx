import clsx from "clsx";

interface Props {
  day?: number;
  sessionName?: string;
  pin?: boolean;
  lineClamp?: number;
}

const SessionName: React.FC<Props> = ({ day, sessionName, lineClamp, pin }) => {
  return (
    <>
      {day && sessionName ? (
        <div className="flex items-center">
          <p
            className={clsx(
              "text-gray-700 font-semibold pr-2",
              pin && !lineClamp ? "text-lg" : "",
              "flex-none"
            )}
          >
            {"Session"} {day}
          </p>
          <p className="pr-3">👉</p>
          <p
            className={clsx(
              lineClamp ? "line-clamp-1" : "",
              "text-gray-700 font-semibold",
              pin && !lineClamp ? "text-lg" : ""
            )}
          >
            {sessionName}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default SessionName;
