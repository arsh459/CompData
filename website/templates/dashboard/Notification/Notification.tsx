import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";
import React from "react";

interface Props {
  heading: string;
  text: string;
  img: string;
  timeLabel: string;
  unread?: number;
  label?: string;
}
const Notification: React.FC<Props> = ({
  heading,
  text,
  img,
  timeLabel,
  unread,
  label,
}) => {
  console.log(
    getCloudinaryURLWithParams(img, 100, 100, "c_fill", "f_auto", "q_80")
  );
  return (
    <div
      className={clsx(
        "p-2 pl-4 pr-4 ",
        "hover:-translate-y-1 transition-transform transform hover:shadow-2xl",
        unread
          ? "bg-gradient-to-b from-white to-gray-50 shadow-lg"
          : "bg-gradient-to-b from-white to-gray-100 shadow-sm"
      )}
    >
      <div className="flex">
        <div className="flex flex-col items-center flex-none">
          <img
            src={img}
            // src={getCloudinaryURLWithParams(
            //   img,
            //   100,
            //   100,
            //   "c_fill",
            //   "f_auto",
            //   "q_80"
            // )}
            className="w-10 h-10  object-cover rounded-full"
          />

          {unread ? (
            <div className="pt-1">
              <div className="flex justify-center items-center bg-orange-500 rounded-full w-5 h-5">
                <p className="text-white text-xs font-medium text-center">
                  {unread}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="pl-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-800 text-sm font-medium pr-1">{heading}</p>
            {label ? (
              <div className="p-1 pl-2 pr-2 flex justify-center items-center bg-green-500 rounded-md">
                <p className="p-[0.5] text-xs text-white font-bold">{label}</p>
              </div>
            ) : null}
          </div>
          <p className="text-sm font-light text-gray-500 break-words">{text}</p>
          <p className="text-xs text-gray-500 text-right font-light">
            {timeLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
