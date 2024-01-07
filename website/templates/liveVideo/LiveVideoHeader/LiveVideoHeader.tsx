// import { personURLs } from "@constants/landing/live";
import clsx from "clsx";
// import Avatar from "./Avatar";
// import AvatarHolder from "./AvatarHolder";
import LiveLabel from "./LiveLabel";

interface LiveVideoProps {
  mainURL: string;
  height: "full" | "large";
  persons: string[];
}

const LiveVideoHeader: React.FC<LiveVideoProps> = ({
  mainURL,
  height,
  // persons,
}) => {
  return (
    <div className="relative">
      <video
        preload="auto"
        autoPlay
        playsInline
        loop
        muted={true}
        controls={false}
        src={mainURL}
        className={clsx(
          "w-full h-full object-cover rounded-t-xl",
          height === "large" ? "h-52" : "h-full"
        )}
      />

      <div className="absolute left-2 bottom-1">
        <LiveLabel />
      </div>

      {/* {persons.length > 0 ? (
        <div className="absolute top-2 right-2">
          <AvatarHolder urls={persons} />
        </div>
      ) : null} */}
    </div>
  );
};

export default LiveVideoHeader;
