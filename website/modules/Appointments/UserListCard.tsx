import { AppointmentInterface } from "@models/Appintment";
import UserImage from "@templates/listing/Header/UserImage";
import clsx from "clsx";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { getUserFitnessGoal } from "@models/User/parseUtils";
import {
  formatUnixTimestamp,
  getUserAgentName,
  getUserListCardColors,
} from "./utils";
import Link from "next/link";

interface Props {
  className?: string;
  noBorder?: boolean;
  onClick?: () => void;
  isDetailCard?: boolean;
  appointment: AppointmentInterface;
  isSelected?: boolean;
  onStatysClick?: () => void;
  showDocName: boolean;
  navOnProfile: boolean;
}

const UserListCard: React.FC<Props> = ({
  className,
  noBorder,
  isDetailCard,
  onClick,
  appointment,
  isSelected,
  onStatysClick,
  showDocName,
  navOnProfile,
}) => {
  const { user } = useUserV2(appointment?.patientId);
  const goal = getUserFitnessGoal(user);
  const colorObj = getUserListCardColors(goal);
  const formattedTime = appointment?.startSlot
    ? formatUnixTimestamp(appointment.startSlot)
    : showDocName && appointment.createdOn
    ? `Attempted: ${formatUnixTimestamp(appointment.createdOn)}`
    : "";

  const docName = getUserAgentName(appointment.doctorId);

  return (
    <div
      className={clsx(
        `flex justify-between select-none py-3 px-4 mb-2.5 rounded-[20px] overflow-hidden`,
        onClick && "cursor-pointer",
        className
      )}
      style={{
        borderColor: colorObj.borderColor || "#F62088",
        borderWidth: isDetailCard || noBorder ? 0 : isSelected ? 2 : 1,
      }}
      onClick={onClick}
    >
      <div className="flex items-center ">
        {user?.profileImage || user?.name ? (
          navOnProfile ? (
            <Link href={`/admin/patients/${user.uid}`}>
              <UserImage
                boxHeight="h-12"
                boxWidth="w-12"
                image={user?.profileImage || undefined}
                name={user?.name}
              />
            </Link>
          ) : (
            <UserImage
              boxHeight="h-12"
              boxWidth="w-12"
              image={user?.profileImage || undefined}
              name={user?.name}
            />
          )
        ) : null}
        <div className="pl-2 text-xs font-popR ">
          {navOnProfile ? (
            <Link href={`/admin/patients/${user?.uid}`}>
              <p className="text-black underline font-popM text-base pb-1.5">
                {user?.name || "NA"}
              </p>
            </Link>
          ) : (
            <p className="text-black  font-popM text-base pb-1.5">
              {user?.name || "NA"}
            </p>
          )}

          <div className="flex items-center ">
            <p
              className="text-xs font-popR capitalize"
              style={{ color: colorObj.textColor || "#F62088" }}
            >
              {showDocName ? `${docName} | ` : ""}
              {showDocName && user?.phone ? `${user.phone} | ` : ""}
              {goal?.replaceAll("_", " ")}
            </p>

            {isDetailCard ? (
              <p className="text-xs font-popR text-[#474747] pl-2">
                {`${user?.age} years` || "NA"}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="text-xs font-popR flex flex-col justify-center items-center"
        style={{ color: colorObj.textColor || "#F62088" }}
      >
        <div
          className={clsx(
            "rounded-lg px-4",
            isDetailCard &&
              "h-full w-full rounded-xl flex items-center justify-center"
          )}
          style={{
            backgroundColor: isDetailCard
              ? "#FFFFFF8F"
              : `${colorObj.textColor}26` || "#F6208826",
          }}
        >
          <p
            className={clsx("text-center py-1", isDetailCard && "py-0 text-sm")}
          >
            {formattedTime}
          </p>
          {/* {appointment?.isFollowUp ? (
            <p className={clsx("text-center pt-2", isDetailCard && " text-sm")}>
              {isDetailCard ? "" : "Follow Up"}
            </p>
          ) : null} */}
        </div>
        <p className={clsx("text-center pt-2", isDetailCard && " text-sm")}>
          {appointment?.isFollowUp ? "Follow Up" : ""}
          {/* {isDetailCard && !appointment?.isFollowUp ? "" : "Follow Up"} */}
        </p>

        {isDetailCard ? null : showDocName ? (
          <Link href={`/admin/appointments/edit/${appointment.id}`}>
            <button className="text-center underline cursor-pointer p-2">
              {appointment.status || "UNKNOWN"}
            </button>
          </Link>
        ) : (
          <button
            onClick={onStatysClick}
            className="text-center underline cursor-pointer p-2"
          >
            {appointment.status || "UNKNOWN"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserListCard;
