import clsx from "clsx";
import React from "react";
// import { nameOfPerson, course, toStartIn, instructorName } from "./constants";
import Button from "@components/button/index";
import { formatWithCommas } from "@utils/number";
// import Link from "next/link";
import Linkify from "react-linkify";

interface Props {
  nameOfPerson?: string;
  joinLink?: string;
  courseName?: string;
  courseCost?: number;
  currency?: "₹";
}
const SignupMessage: React.FC<Props> = ({
  nameOfPerson,
  joinLink,
  courseName,
  courseCost,
  currency,
}) => {
  // console.log("join", joinLink);
  return (
    <div>
      <div className={clsx("bg-gray-50 p-2 rounded-md shadow-md")}>
        <p className="text-xs">
          Hi {nameOfPerson ? nameOfPerson : "Boat member"},
        </p>
        <div className="flex break-words flex-wrap">
          <p className="text-xs">Thank you for joining</p>
          <p className="text-xs font-semibold pl-1">
            {courseName ? `${courseName}.` : "event-name."}
          </p>
          <p className="text-xs">
            We have received your payment of{" "}
            {`${currency}${courseCost ? formatWithCommas(courseCost) : "0"}`}{" "}
            and would like to welcome you to the boat.
          </p>
          {/* <p className="text-xs font-semibold pl-1">{toStartIn}.</p> */}

          <div className="flex w-full pt-2">
            <p className="text-xs ">
              Please join the meeding on scheduled time by clicking:
            </p>
          </div>

          <div className="pt-2">
            <p
              className={clsx(
                "text-xs",
                "break-all",
                "whitespace-pre-wrap",
                "prose"
              )}
            >
              <Linkify>{joinLink ? joinLink : "Your invite link"}</Linkify>
            </p>
          </div>

          {/* <Link href={joinLink ? joinLink : "https://socialboat.live"}>
            <a target="_blank">
              <p className="text-xs pt-2 underline text-blue-500 font-semibold">
                {joinLink ? joinLink : "Your invite link"}
              </p>
            </a>
          </Link> */}

          {/* <div className="flex w-full pt-4"> */}
          {/* <p className="text-xs ">To talk to</p> */}
          {/* <p className="text-xs font-semibold pl-0.5">{instructorName}</p> */}
          {/* <p className="text-xs pl-0.5">(instructor), reply</p> */}
          {/* <p className="text-xs pl-0.5">to this message</p> */}
          {/* </div> */}
        </div>
      </div>
      <div className="pt-1">
        <Button appearance="control" size="small">
          <div className="">
            <p className="capitalize text-blue-500">Join class</p>
          </div>
        </Button>
        <div className="pt-1">
          <Button appearance="control" size="small">
            <div className="">
              <p className="capitalize text-blue-500">Call for help</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupMessage;
