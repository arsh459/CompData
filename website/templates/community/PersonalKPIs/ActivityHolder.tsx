import { formatWithCommas } from "@utils/number";
import clsx from "clsx";

interface Props {
  cal?: number;
  dateString: string;
  day?: number;
  size?: "small";
  suffix?: string;
}

const ActivityHolder: React.FC<Props> = ({ suffix, cal, size, dateString }) => {
  return (
    <div
      className={clsx(
        size === "small" ? "" : "w-1/3 pb-4",
        "flex justify-center items-center"
      )}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          className={clsx(
            size === "small"
              ? "w-8 sm:w-8 h-8 sm:h-8"
              : "w-12 sm:w-10 h-12 sm:h-10",
            " object-cover"
          )}
          src={
            cal
              ? "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-fire-emergency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
              : "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-fire-emergency-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
          }
        />

        <p
          className={clsx(
            size === "small" ? "text-xs sm:text-sm" : "text-lg sm:text-sm",
            cal
              ? "text-center text-gray-600 font-medium"
              : "text-center text-gray-500"
          )}
        >
          {formatWithCommas(Math.round(cal ? cal : 0))}{" "}
          {suffix ? suffix : "cals"}
        </p>
        <p className={clsx("text-gray-500 text-xs font-medium")}>
          {new Date(dateString).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default ActivityHolder;
