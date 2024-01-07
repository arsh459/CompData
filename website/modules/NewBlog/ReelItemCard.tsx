import React from "react";
import { Task } from "@models/Tasks/Task";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import MediaCard from "@components/MediaCard";
import { useUserV2 } from "@hooks/auth/useUserV2";
import UserImage from "@templates/listing/Header/UserImage";
import { formatTimeFromSeconds } from "./utils";

interface Props {
  index: number;
  item: Task;
}
const ReelItemCard: React.FC<Props> = ({ item, index }) => {
  const { user } = useUserV2(item.userId);

  return (
    <div className="w-full aspect-[183/277] sm:aspect-[323/382]  rounded-2xl relative z-0">
      <div className="absolute inset-0 rounded-2xl  -z-10">
        {item.reelThumbnail ? (
          <MediaTile
            media={item.reelThumbnail}
            alt={item?.name ? item.name : `reel image_${index}`}
            width={323}
            height={382}
            roundedString="rounded-2xl"
          />
        ) : (
          <MediaCard media={item.reelMedia} roundedString="rounded-2xl" />
        )}
      </div>
      {/* <p>#</p> */}
      <div className="flex flex-col h-full justify-between overflow-hidden rounded-2xl pb-2 ">
        {item.reelMedia?.duration ? (
          <div className="bg-[#5D588CB2] w-fit px-4 py-1 m-2 self-end rounded-3xl">
            <p className="text-white text-xs font-nunitoM shadow-sm">
              {formatTimeFromSeconds(item.reelMedia?.duration)}
            </p>
          </div>
        ) : null}

        <div className="">
          <div className="flex px-4 items-center ">
            {user?.profileImage || user?.name ? (
              <UserImage
                boxHeight="h-4"
                boxWidth="w-4"
                image={user?.profileImage || undefined}
                name={user?.name}
              />
            ) : null}
            <p className="text-white pl-2">{user?.name}</p>
          </div>
          <p className="text-white pl-4">{item?.name}</p>
        </div>
      </div>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Group_1327_PVUcBr8-B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677506140902"
          className="w-12 aspect-1"
        />
      </div>
    </div>
  );
};

export default ReelItemCard;
