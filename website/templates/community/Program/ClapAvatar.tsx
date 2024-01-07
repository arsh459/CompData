import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "./Feed/PostView/UserPhoto";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  numClaps?: number;
  onImgClick: () => void;
}

const ClapAvatar: React.FC<Props> = ({ img, name, numClaps, onImgClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="pt-2 flex flex-col items-center">
        <UserPhoto onImgClick={onImgClick} img={img} name={name} />
      </div>

      <div className="flex items-center">
        <div className="pr-2">
          <p className="text-gray-700 text-lg">{numClaps}</p>
        </div>
        <img
          src="https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png"
          className="w-14 h-14 object-cover"
        />
      </div>
    </div>
  );
};

export default ClapAvatar;
