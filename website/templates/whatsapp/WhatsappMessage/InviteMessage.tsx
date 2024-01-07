import clsx from "clsx";
import React from "react";
// import { nameOfPerson, course, toStartIn, instructorName } from "./constants";
import Button from "@components/button/index";
// import { formatWithCommas } from "@utils/number";
// import Link from "next/link";
// import Linkify from "react-linkify";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { Pointer } from "..";

interface Props {
  nameOfPerson?: string;
  joinLink?: string;
  courseName?: string;
  courseCost?: number;
  currency?: "₹";
  img?: string;
  pointers?: Pointer[];
}
const InviteMessage: React.FC<Props> = ({
  nameOfPerson,
  joinLink,
  courseName,
  courseCost,
  currency,
  pointers,
  img,
}) => {
  // console.log("img", img);
  return (
    <div>
      <div className={clsx("bg-gray-50 p-2 rounded-b-md shadow-md")}>
        <p className="text-xs">
          Hi {nameOfPerson ? nameOfPerson : "Boat member"},
        </p>
        <div className="flex break-words flex-wrap">
          <p className="text-xs">I am launching my fitness studio today!</p>
        </div>
        <div className="pt-1">
          <p className="text-xs text-gray-800">
            If you are looking for daily workouts, working out with a community
            & a body transformation, check out the following link
          </p>
        </div>
        <div className=" rounded-md">
          <p className="text-xs text-blue-500 font-bold underline pt-2">
            https://jessica.socialboat.live
          </p>
        </div>
        <div className="pt-2 flex items-center">
          <p className="text-xs">{"Let's get fit together"}</p>
          <p className="text-xs pl-1">💪</p>
        </div>
      </div>

      <div className="pt-1">
        <Button appearance="control" size="small">
          <div className="">
            <p className="capitalize text-blue-500">Visit studio</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default InviteMessage;
