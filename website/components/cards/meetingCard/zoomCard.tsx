import { MediaInterface } from "@models/Media/media";
// import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";
import { Meeting } from "@utils/zoom/getMeetings";
import CardMedia from "./cardMedia";

interface Props {
  zoomMeeting: Meeting;
  images: MediaInterface[];
  cost: number;
  currency: "₹";
  suffix: string;
}

const ZoomCard: React.FC<Props> = ({
  zoomMeeting,
  images,
  cost,
  currency,
  suffix,
}) => {
  //   console.log("zoom", zoomMeeting);
  return (
    <div
      className={clsx(
        "flex flex-col items-center w-52 rounded-lg shadow-xl",
        "hover:shadow-2xl cursor-pointer",
        "p-2"
      )}
    >
      <CardMedia media={images} />
      <div className={clsx("pt-1")}>
        <p className={clsx("text-sm font-medium text-gray-800")}>
          {zoomMeeting.topic}
        </p>
      </div>
    </div>
  );
};

export default ZoomCard;
