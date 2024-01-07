// import clsx from "clsx";
import React from "react";

interface Props {}

const MobileHome: React.FC<Props> = () => {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="flex-grow" /> */}
      <div className="md:pt-28">
        {/* <div className={clsx("bg-indigo-100")}> */}
        <img className="object-cover" src="/images/iphone.png" alt="phone" />
        {/* </div> */}
      </div>
      {/* <div className="flex-grow" /> */}
    </div>
  );
};

export default MobileHome;
