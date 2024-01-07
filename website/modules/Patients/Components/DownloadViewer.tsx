import { XIcon } from "@heroicons/react/solid";
import { UserInterface } from "@models/User/User";
import React from "react";
import "react-circular-progressbar/dist/styles.css";

import DownloadHelper from "./DownloadHelper";

interface Props {
  color: string;
  onClickExpander: () => void;
  user?: UserInterface;
}

const DownloadViewer: React.FC<Props> = ({ color, onClickExpander, user }) => {
  return (
    <div
      className="    rounded-3xl   overflow-y-scroll"
      style={{
        // backgroundColor: `${color}1a`,
        color,
        borderColor: `${color}1a`,
      }}
    >
      <div className="md:bg-white  py-4  rounded-2xl  md:rounded-[45px]  md:m-4">
        <div
          onClick={onClickExpander}
          className="flex items-center justify-between cursor-pointer  px-4 pb-2 border-b-[1px]"
          style={{ borderColor: `${color}1a` }}
        >
          <p className="hidden md:block"></p>
          <p
            className="   font-popM  text-base flex justify-self-center "
            style={{ borderColor: `${color}1a` }}
          >
            View past reports
          </p>
          <div className="">
            <XIcon className="w-5 h-5" color={color} />
          </div>
        </div>
        {user?.dietForm?.uploadedReports?.map((item, idx) => {
          return (
            <DownloadHelper
              key={item.id}
              color={color}
              item={item}
              user={user}
              hideBorder={
                user?.dietForm?.uploadedReports &&
                user?.dietForm?.uploadedReports?.length - 1 === idx
                  ? true
                  : false
              }
            />
            // </a>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadViewer;
