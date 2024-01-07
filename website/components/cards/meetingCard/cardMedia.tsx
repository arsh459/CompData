import { MediaInterface } from "@models/Media/media";
import { zoomLogo } from "@modules/illustrations/VideoProviders";
import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";

interface Props {
  media: MediaInterface[];
}

const CardMedia: React.FC<Props> = ({ media }) => {
  if (media.length > 0) {
    return (
      <div className={clsx("relative")}>
        {media.map((item, index) => {
          if (item.type === "cloud_photo" || item.type === "photo") {
            return (
              <div key={`meetingcard-${index}`}>
                <img
                  loading="lazy"
                  alt={`creator-media-${item.type}`}
                  src={getCloudinaryURLWithParams(item.url, 80, 100, "c_fill")}
                  className={clsx(
                    "rounded-xl shadow-2xl w-36 h-48 object-cover"
                  )}
                />
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div>
        <img
          loading="lazy"
          alt={`zoom logo`}
          src={getCloudinaryURLWithParams(zoomLogo, 120, 120, "c_fill")}
          className={clsx("w-36 h-36 object-cover")}
        />
      </div>
    );
  }
};

export default CardMedia;
