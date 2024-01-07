import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Badge } from "@models/Prizes/PrizeV2";

interface Props {
  uid: string;
  badge: Badge;
  setBadge: (data: Badge) => void;
}

const BadgeImages: React.FC<Props> = ({ uid, badge, setBadge }) => {
  const onUpload = (
    key:
      | "athleteImage"
      | "brandImage"
      | "marketImage"
      | "bgImageMale"
      | "bgImageFemale"
      | "badgeImage"
      | "badgeBGImage"
      | "marketingImage"
      | "courseDecorImage"
      | "headingIcon"
      | "textIcon",

    media: (CloudinaryMedia | AWSMedia | undefined)[]
  ) => {
    setBadge({ ...badge, [key]: media[0] });
  };

  const onDelete = (
    key:
      | "athleteImage"
      | "brandImage"
      | "marketImage"
      | "bgImageMale"
      | "bgImageFemale"
      | "badgeImage"
      | "badgeBGImage"
      | "marketingImage"
      | "courseDecorImage"
      | "headingIcon"
      | "textIcon",
    media: CloudinaryMedia | AWSMedia
  ) => {
    setBadge({ ...badge, [key]: undefined });
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center border py-4 my-4">
      {/* <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Brand Image :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("brandImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("brandImage", media)}
          media={[badge?.brandImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div> */}
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Badge Image :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("badgeImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("badgeImage", media)}
          media={[badge?.badgeImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Background Image Male :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("bgImageMale", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("bgImageMale", media)}
          media={[badge?.bgImageMale]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Background Image Female :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("bgImageFemale", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("bgImageFemale", media)}
          media={[badge?.bgImageFemale]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      {/* <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Market Image :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("marketImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("marketImage", media)}
          media={[badge?.marketImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div> */}
      {/* <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Athlete Image :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("athleteImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("athleteImage", media)}
          media={[badge?.athleteImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div> */}
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Course Image / Video :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("badgeBGImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("badgeBGImage", media)}
          media={[badge?.badgeBGImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Course Thimbnail :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("marketingImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("marketingImage", media)}
          media={[badge?.marketingImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Course Decor Image :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("courseDecorImage", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("courseDecorImage", media)}
          media={[badge?.courseDecorImage]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Heading Icon :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("headingIcon", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("headingIcon", media)}
          media={[badge?.headingIcon]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">BottomText Icon :</label>
        <UppyWidgetContainer
          onUpload={(media) => onUpload("textIcon", media)}
          screenName="admin"
          taskName="admin"
          onDelete={(media) => onDelete("textIcon", media)}
          media={[badge?.textIcon]}
          uid={uid}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
    </div>
  );
};

export default BadgeImages;
