import { ArrowDownIcon } from "@heroicons/react/solid";
import { uploadReport, UserInterface } from "@models/User/User";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
interface Props {
  color: string;

  hideBorder: boolean;

  item: uploadReport;

  user: UserInterface;
}
const DownloadHelper: React.FC<Props> = ({ color, hideBorder, item, user }) => {
  return (
    <div
      className={clsx(
        "items-center flex-1   border-b-[2px]   p-3 px-4 flex justify-between ",
        user?.dietForm?.uploadedReports && hideBorder && "border-none"
      )}
      style={{ borderColor: `${color}1a` }}
    >
      <p className="hidden md:block"></p>
      <p className="text-[#383838] font-popR  text-xs  flex justify-self-center ">
        {item?.filename || `{Report}`}
      </p>
      {item?.url ? (
        <Link href={item.url} target="_blank">
          <div className="cursor-pointer">
            <ArrowDownIcon className="w-5 h-5" color={color} />
          </div>
        </Link>
      ) : (
        <div className="cursor-pointer">
          <ArrowDownIcon className="w-5 h-5" color={color} />
        </div>
      )}
    </div>
  );
};

export default DownloadHelper;
