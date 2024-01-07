import clsx from "clsx";
import React from "react";
// import { nameOfPerson, course, toStartIn, instructorName } from "./constants";
import Button from "@components/button/index";

interface Props {
  nameOfPerson: string;
  course: string;
  toStartIn: string;
  instructorName: string;
}
const WhatsappMessage: React.FC<Props> = ({
  nameOfPerson,
  course,
  toStartIn,
  instructorName,
}) => {
  return (
    <div>
      <div className={clsx("bg-gray-50 p-2 rounded-md shadow-md")}>
        <p className="text-xs">Hi {nameOfPerson},</p>
        <div className="flex break-words flex-wrap">
          <p className="text-xs">Your upcoming class - </p>
          <p className="text-xs font-semibold pl-1">{course}</p>
          <p className="text-xs">will begin in</p>
          <p className="text-xs font-semibold pl-1">{toStartIn}.</p>

          <div className="flex w-full pt-2">
            <p className="text-xs ">Reply 1️⃣</p>
            <p className="text-xs pl-2">to confirm</p>
          </div>

          <div className="flex w-full pt-1">
            <p className="text-xs ">Reply 2️⃣</p>
            <p className="text-xs pl-2">to mark absent</p>
          </div>

          <div className="flex w-full pt-4">
            <p className="text-xs ">To talk to</p>
            <p className="text-xs font-semibold pl-0.5">{instructorName}</p>
            <p className="text-xs pl-0.5">(instructor), reply</p>
            <p className="text-xs pl-0.5">to this message</p>
          </div>
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
              <p className="capitalize text-blue-500">Call</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappMessage;
