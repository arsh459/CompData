import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  numClaps?: number;
  onImgClick: () => void;
}

const CardClapper: React.FC<Props> = ({ img, name, numClaps, onImgClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center  text-[#335E7D]">
        <UserPhoto
          onImgClick={onImgClick}
          img={img}
          name={name}
          customWidthHeight={"w-8"}
          nameTextColor={"text-[#335E7D]"}
        />
      </div>

      <div className="flex items-center">
        <div className="pr-2">
          <p className="text-lg text-[#335E7D]">{numClaps}</p>
        </div>
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_clap_blue_yX8uBjqVo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655902188489`}
          alt="Clap Icon"
          className="pr-3"
        />
      </div>
    </div>
  );
};

export default CardClapper;
