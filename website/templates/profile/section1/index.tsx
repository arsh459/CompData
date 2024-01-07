// import { liveClassURL, liveClassPhotoURL } from "./constants";
import VideoCard from "@components/cards/videoCard";
import clsx from "clsx";
import IconButton from "@components/button/iconButton";

interface Props {
  edit?: boolean;
  liveURL: string;
  photoURL: string;
  courseName: string;
  courseLive: boolean;
}

const Section1: React.FC<Props> = ({
  edit,
  liveURL,
  photoURL,
  courseName,
  courseLive,
}) => {
  return (
    <div
      className={clsx(
        edit ? "animate-wiggle p-4 shadow-xl rounded-md" : "",
        "relative"
      )}
    >
      <p className={clsx("font-semibold text-sm text-gray-700")}>
        Live right now
      </p>
      <div className={clsx("flex justify-center pt-1")}>
        <VideoCard
          url={edit ? photoURL : liveURL}
          imgMode={edit}
          name={courseName}
          live={courseLive}
          // paused={edit}
        />
      </div>
      {edit ? (
        <div className="absolute -right-2 -top-2">
          <IconButton />
        </div>
      ) : null}
    </div>
  );
};

export default Section1;
