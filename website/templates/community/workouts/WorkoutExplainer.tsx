// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import { getHeight } from "../Program/getAspectRatio";
import React, { useState } from "react";
// import SlidingPane from "react-sliding-pane";
// import MoreText from "@components/MoreText/MoreText";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "font-awesome/css/font-awesome.min.css";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  name: string;
  description: string;
  creatorName?: string;
  creatorKey?: string;
  signedInUserImage?: CloudinaryMedia;
  // workoutInfo: object;
}

const WorkoutDetails: React.FC<Props> = ({
  name,
  description,
  creatorName,
}) => {
  const views = "400";
  const duration = "1h 30m";
  const calories = "300";
  // const [everyday, setEveryday] = useState<boolean>(false);

  const [_, setDrawer] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center p-1 pb-3">
        <span className="text-gray-700 text-3xl font-semibold">{name}</span>
        <span
          onClick={() => setDrawer(true)}
          title="Details"
          className="border-4 border-zinc-200 rounded-t-lg p-2 pt-0 pb-0 cursor-pointer"
        >
          <i className="fa fa-angle-down fa-2x text-grey-400" />
        </span>
      </div>
      <div className="flex justify-between items-center text-lg p-2">
        <span>
          <i className="fa fa-free-code-camp"></i>&nbsp; {calories}
        </span>
        <span className="pl-4">
          <i className="fa fa-eye"></i>&nbsp; {views} views
        </span>
        <span className="pl-4">
          <i className="fa fa-clock-o"></i>&nbsp; {duration}
        </span>
      </div>

      {/* <SlidingPane
        className="customSlider rounded-t-lg"
        isOpen={isDrawerOpen}
        from="bottom"
        width="100%"
        onRequestClose={() => setDrawer(false)}
      >
        <div className="flex justify-between items-center border-b pb-1">
          <span className="text-nomral">Description</span>
        </div>
        <div>
          <div className="text-2xl text-dark mt-2 font-bold">{name}</div>
          <div className="flex justify-between items-center text-center text-lg p-2 mb-2 font-bold border-b">
            <span>
              <i className="fa fa-free-code-camp"></i>
              <br /> {calories}
            </span>
            <span className="pl-4">
              <i className="fa fa-eye"></i>
              <br /> {views} views
            </span>
            <span className="pl-4">
              <i className="fa fa-clock-o"></i>
              <br /> {duration}
            </span>
          </div>
          <MoreText
            text={`${description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`}
            numChars={120}
          />
          <div className="border-t p-2 pl-0 mt-3">
            <div>More from {creatorName}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="border pl-5 pr-5 p-3 text-lg w-1/2 text-center mr-2 drop-shadow-lg cursor-pointer">
              <i className="fa fa-play-circle" aria-hidden="true"></i> &nbsp;
              Videos
            </div>
            <div className="border pl-5 pr-5 p-3 text-lg w-1/2 ml-2 text-center drop-shadow-lg cursor-pointer">
              <i className="fa fa-user-circle" aria-hidden="true"></i> &nbsp;
              About
            </div>
          </div>
        </div>
      </SlidingPane> */}
    </>
  );
};

export default WorkoutDetails;
