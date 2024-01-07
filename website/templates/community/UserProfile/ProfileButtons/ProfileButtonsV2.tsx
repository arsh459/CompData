import { Link } from "@mui/material";
import clsx from "clsx";

interface Props {
  canEdit?: boolean;
  isCoach?: boolean;
  number?: string;
  viewerIsCoach?: boolean;
  isAdmin?: boolean;
}

const ProfileButtonsV2: React.FC<Props> = ({
  canEdit,
  number,
  isCoach,
  viewerIsCoach,
  isAdmin,
}) => {
  return (
    <div className="flex">
      {canEdit ? (
        <div className="border-gray-400 border cursor-pointer rounded-md px-4 py-1.5 w-full">
          <Link href={`/editUserProfileV2`}>
            <p className="text-gray-700 text-center font-medium">
              Edit Profile
            </p>
          </Link>
        </div>
      ) : null}
      {isAdmin ? (
        <div
          className={clsx(
            canEdit ? "ml-2 " : "",
            "border-gray-500 border cursor-pointer rounded-md px-4 py-1.5 w-full"
          )}
        >
          <Link href={`https://wa.me/${number}?text=Hi!`}>
            <p className="text-gray-500 text-center font-semibold">Message</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileButtonsV2;
