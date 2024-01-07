import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { mediatype } from "@hooks/tasks/useTask";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";

export const uppyButtonValues: { [key: string]: string } = {
  avatar: "Workout Video",
  thumbnails: "Card Full Image",
  lowResMedia: "Low Res Video",
  videoThumbnail: "Video Thmbnail",
  bgImage: "Transparent Card Image", // dep
  previewMedia: "Workout teaser",
  reelMedia: "Reel Video",
  reelThumbnail: "Reel Thmbnail",
};

interface Props {
  user: UserInterface;
  task?: Task;
  onMediaDelete: (key: mediatype) => void;
  onMediaUpload: (
    key: mediatype,
    value: (CloudinaryMedia | AWSMedia)[]
  ) => void;
  collectionArray: mediatype[];
}

const MediaContainer: React.FC<Props> = ({
  user,
  onMediaDelete,
  onMediaUpload,
  task,
  collectionArray,
}) => {
  return (
    <div>
      {collectionArray.map((each) => (
        <div key={each} className="p-4">
          <UppyWidgetContainer
            media={task && task[each] ? [task[each]] : []}
            leftButtonText={`Add ${
              uppyButtonValues[each] ? uppyButtonValues[each] : each
            }`}
            onDelete={() => onMediaDelete(each)}
            uid={user.uid}
            onUpload={(newFiles) => onMediaUpload(each, newFiles)}
            onRemove={() => onMediaDelete(each)}
            screenName="admin"
            taskName="admin"
            heading=""
            helperText=""
            height="none"
            filterButton={true}
            tileHeight="small"
            bgWhite={true}
            styles="rounded-none bg-red-500 border-none text-white"
            containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            // id="avatarUpload"
          />
        </div>
      ))}
    </div>
  );
};

export default MediaContainer;
