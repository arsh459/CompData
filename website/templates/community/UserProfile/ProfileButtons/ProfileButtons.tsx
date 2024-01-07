// import Button from "@components/button";

import { Link } from "@mui/material";
import clsx from "clsx";

interface Props {
  canEdit?: boolean;
  isCoach?: boolean;
  editUID: string;
  number?: string;
  viewerIsCoach?: boolean;
  communityKey?: string;
}

const ProfileButtons: React.FC<Props> = ({
  canEdit,
  number,
  isCoach,
  viewerIsCoach,
  editUID,
  communityKey,
}) => {
  return (
    <div className="flex">
      {canEdit ? (
        <div className="border-gray-400 border cursor-pointer rounded-md px-4 py-1.5 w-full">
          <Link href={`/editUserProfile/${editUID}?leaderKey=${communityKey}`}>
            <p className="text-gray-700 text-center font-medium">
              Edit Profile
            </p>
          </Link>
        </div>
      ) : null}
      {isCoach || viewerIsCoach ? (
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

export default ProfileButtons;
