import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";
import React from "react";
import { person, personYou } from "./constants";

interface Props {
  userImg?: boolean;
}
const WhatsappHeader: React.FC<Props> = ({ userImg }) => {
  return (
    <div
      className={clsx(
        "flex bg-gray-50 p-2 shadow-sm items-center rounded-t-xl"
      )}
    >
      <div>
        {userImg ? (
          <img src={personYou.img} className="w-8 h-8 rounded-full" />
        ) : (
          <img src={person.img} className="w-8 h-8 rounded-full" />
        )}
      </div>
      <div>
        <p className="text-gray-600 pl-2 text-sm font-semibold">
          {userImg ? "Jessica" : person.name}
        </p>
      </div>
      <div className="ml-1">
        <img
          src={getCloudinaryURLWithParams(person.verified, 100, 100, "c_fill")}
          className="w-4 h-4 flex-none rounded-full"
        />
      </div>
    </div>
  );
};

export default WhatsappHeader;
