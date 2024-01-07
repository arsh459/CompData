import { SessionV2 } from "@models/Event/Event";
import { zoomLogo } from "@modules/illustrations/VideoProviders";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { getAspectRatio, getHeight } from "./getAspectRatio";

interface Props {
  session: SessionV2;
  unlocked?: boolean;
}

const SessionMedia: React.FC<Props> = ({ session, unlocked }) => {
  return (
    <div className="h-full">
      {session.media ? (
        <div
          className={clsx(
            getAspectRatio(session.media),
            // "aspect-w-3 aspect-h-2",
            // "h-full",
            // "pt-0",
            session.media.format === "pdf" && unlocked ? "pb-0" : ""
          )}
        >
          <MediaTile
            media={session.media}
            width={400}
            height={getHeight(session.media, 400)}
            rounded={true}
            alt="course-media"
            // widthString="w-32"
            // heightString="h-full"
            unlocked={unlocked}
          />
        </div>
      ) : session.sessionType === "live" && false ? (
        <div className="flex flex-col justify-center items-center h-full">
          <img src={zoomLogo} className="w-32 object-cover" alt="zoom" />
        </div>
      ) : session.sessionType === "activity" && false ? (
        <div className="flex flex-col justify-center items-center h-full p-2">
          <p className="text-gray-500 text-sm text-center">
            Program video will be added before the session
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SessionMedia;
