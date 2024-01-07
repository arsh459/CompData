import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";
import React from "react";
// import { profileImg, name } from "./constants";

interface Props {
  edit?: boolean;
  profileImg: string;
  profileName: string;
  website: string;
}

const ProfileHeader: React.FC<Props> = ({
  edit,
  profileImg,
  profileName,
  website,
}) => {
  return (
    <div className={clsx("relative", edit ? "pt-8" : "", "")}>
      <div className="p-4">
        {edit ? null : (
          <p className=" text-gray-50 text-base text-center underline font-medium">
            https://{website}
          </p>
        )}
      </div>

      <div className={clsx("flex justify-center ")}>
        <img
          loading="lazy"
          alt="profile-img"
          src={getCloudinaryURLWithParams(profileImg, 80, 80, "c_fill")}
          className={clsx("object-cover rounded-full w-20 h-20", "shadow-2xl")}
        />
      </div>
      <div className={clsx("pt-1")}>
        <p
          className={clsx(
            "text-base text-grey-700 font-medium flex justify-center"
          )}
        >
          {profileName}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
