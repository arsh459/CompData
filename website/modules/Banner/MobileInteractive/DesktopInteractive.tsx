import clsx from "clsx";
import React from "react";
import CommunityHomeWrapper, {
  CommunityHomeWrapperProps,
} from "@templates/communityWrapper/CommunityHomeWrapper";

export interface MobileViewProps {
  screen: "community-home";
  communityWrapperProps?: CommunityHomeWrapperProps;
}

const DesktopInteractive: React.FC<MobileViewProps> = ({
  screen,
  communityWrapperProps,
}) => {
  // console.log("communityWrapperProps", communityWrapperProps);
  return (
    <div
      className={clsx(
        // "w-full",
        // "w-[90vw]",
        "max-w-[90vw] lg:max-w-[75vw]",
        // "max-h-[85vh]",
        "rounded-xl shadow-2xl ring-gray-100",
        // "overscroll-auto",
        "h-[640px]",
        "overflow-y-auto",
        "no-scrollbar",
        "z-0"
        // "bg-red-100"
      )}
    >
      {screen === "community-home" && communityWrapperProps ? (
        <div className="w-full">
          {/* <p className="text-7xl">Hismsmsmsmsmsmsmsms</p>
          <p className="text-7xl">Hismsmsmsmsmsmsmsms</p>
          <p className="text-7xl">Hismsmsmsmsmsmsmsms</p> */}
          <CommunityHomeWrapper {...communityWrapperProps} />
        </div>
      ) : //
      null}
    </div>
  );
};

export default DesktopInteractive;
