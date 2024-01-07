import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
// import TrackListBtn from "./TrackListBtn";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  canEdit?: boolean;
  hasMedia: boolean;
  // setIsVisible: (val: boolean) => void;
}

const CardHeader: React.FC<Props> = ({
  img,
  name,
  canEdit,
  hasMedia,
  // setIsVisible,
}) => {
  return (
    <div className="flex justify-between items-center pb-2">
      <div className="flex justify-between items-center">
        <img
          className="w-8 h-8 object-cover rounded-full"
          src={
            img
              ? getURLToFetch(img, 200, 200)
              : `https://avatars.dicebear.com/api/initials/${name}.svg`
          }
        />
        <h2 className="text-2xl font-bold pl-2">{name}</h2>
      </div>
      {hasMedia && canEdit ? (
        <div className="pl-4">
          <img src="https://img.icons8.com/windows/32/EB7963/add-camera.png" />
        </div>
      ) : null}
      {/* {hasMedia ? null : (
                <div className="flex items-center">
                    <TrackListBtn
                        classStr="p-2 ml-4"
                        setIsVisible={setIsVisible}
                    />
                </div>
            )} */}
    </div>
  );
};

export default CardHeader;
