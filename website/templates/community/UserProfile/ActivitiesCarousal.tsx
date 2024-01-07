// import { TerraUser } from "@models/Terra/TerraUser";
import clsx from "clsx";
import { useState } from "react";
import { MonthlyProgressGraph } from "@components/MonthlyProgressGraph";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import ActivitiesCardsJounral from "./ActivitiesCardsJounral";
import PostCardsJournal from "./PostCardsJournal";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  uid: string;
  // signedIn: boolean;
  // terraUser?: TerraUser;
  canEdit?: boolean;
  color?: string;
  viewerId?: string;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  viewerIsCreator?: boolean;
  // level: number;
}

const ActivitiesCarousal: React.FC<Props> = ({
  uid,
  img,
  name,
  // terraUser,
  canEdit,
  // signedIn,
  color,
  viewerId,
  authStatus,
  viewerIsCreator,
  // level,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <div className="flex p-4 justify-between items-center bg-[#F4F4F5] text-[#919191]">
        <p className="text-3xl font-bold">My Progress</p>
        <img
          className={clsx(
            "w-6 h-6 mx-4 object-cover cursor-pointer",
            "transition ease-in-out duration-300",
            isCollapsed ? "" : "rotate-180"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          src="https://img.icons8.com/material-outlined/24/919191/circled-chevron-down.png"
        />
      </div>
      {authStatus === "SUCCESS" ? (
        <>
          <div
            className={clsx(
              "bg-[#F4F4F5] border-y border-white py-8 pl-2 pr-10",
              "relative transition ease-in-out duration-300",
              isCollapsed ? "-translate-y-full hidden" : ""
            )}
          >
            <MonthlyProgressGraph
              // level={level}
              uid={uid}
              color={color ? color : "#000000"}
            />
          </div>

          <PostCardsJournal
            uid={uid}
            img={img}
            name={name}
            canEdit={canEdit}
            color={color}
            viewerId={viewerId}
            viewerIsCreator={viewerIsCreator}
          />
        </>
      ) : authStatus === "FAILED" ? (
        <div>
          <div className="flex flex-col justify-center items-center pt-8">
            <img
              src="https://img.icons8.com/color/96/000000/lazy.png"
              className="w-36 h-46 object-cover"
            />
            <p className="text-center text-xl text-gray-700">
              This requires you to sign up
            </p>
            <p className="text-center text-base text-gray-500">
              Join Socialboat to see this information
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActivitiesCarousal;
