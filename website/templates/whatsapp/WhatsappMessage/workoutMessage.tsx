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
const WorkoutMessage: React.FC<Props> = ({
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
      <div className="rounded-t-md">
        {img ? (
          <div className="w-full">
            <img src={img} width={400} alt="img" className="rounded-t-lg" />
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className={clsx("bg-gray-50 p-2 rounded-b-md shadow-md")}>
        <p className="text-xs">
          Hi {nameOfPerson ? nameOfPerson : "Boat member"},
        </p>
        <div className="flex break-words flex-wrap">
          <p className="text-xs">This is your workout for today</p>
        </div>
        <div className="pt-1">
          {pointers?.map((item, index) => {
            return (
              <div key={`item-${index}`} className="flex items-center">
                <p className="text-xs">
                  {index === 0
                    ? "1️⃣"
                    : index === 1
                    ? "2️⃣"
                    : index === 2
                    ? "3️⃣"
                    : index === 3
                    ? "4️⃣"
                    : index + 1}
                </p>

                <p className="text-xs text-gray-800 pl-2">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="pt-2 flex items-center">
          <p className="text-xs">{"Let's get fit together"}</p>
          <p className="text-xs pl-1">💪</p>
        </div>
      </div>

      <div className="pt-1">
        <Button appearance="control" size="small">
          <div className="">
            <p className="capitalize text-blue-500">Check in</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WorkoutMessage;
