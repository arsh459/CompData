import Divider from "@components/divider/Divider";
import { Activity } from "@models/Activities/Activity";
import { TerraUser } from "@models/Terra/TerraUser";
import clsx from "clsx";
import DetailedTerra from "./DetailedTerra";

interface Props {
  activity: Activity;
  uid: string;
  terraUser?: TerraUser;
  canEdit?: boolean;
}

const ProfileActivityCard: React.FC<Props> = ({
  uid,
  activity,
  terraUser,
  canEdit,
}) => {
  // console.log("terra", terraUser);
  return (
    <div className="px-4 pt-4 bg-white">
      <div className="pb-0">
        {activity.createdOn ? (
          <p className="text-xl text-gray-700 font-medium">
            {new Date(activity.createdOn).toLocaleDateString("default", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </p>
        ) : null}
        <div className="flex pt-0.5">
          <img
            className={clsx("w-6 h-6 object-cover")}
            src={
              "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-fire-emergency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
            }
          />
          <p className="text-gray-700 text-lg pl-2 font-medium">
            {Math.round(activity.calories ? activity.calories : 0)} calories
          </p>
        </div>

        <div className="flex items-center">
          <p className="text-base text-gray-500 font-medium pr-1">
            {activity.source === "terra" ? "Logged with" : "Logged"}
          </p>
          <p className="text-blue-500 text-lg font-semibold capitalize">
            {terraUser ? `${terraUser?.provider.toLowerCase()}` : "Manually"}
          </p>
        </div>
      </div>

      {activity.updatedOn ? (
        <div className="flex items-center pt-2">
          <img
            className="w-6 h-6 object-cover"
            src="https://img.icons8.com/ios-glyphs/90/000000/refresh--v2.png"
          />
          <p className="text-base pl-2 underline cursor-pointer text-gray-500">{`Last synced ${new Date(
            activity.updatedOn
          ).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
        </div>
      ) : null}

      <DetailedTerra
        activityId={activity.id ? activity.id : activity.postId}
        uid={uid}
      />

      <div className="pt-4">
        <Divider />
      </div>
    </div>
  );
};

export default ProfileActivityCard;
