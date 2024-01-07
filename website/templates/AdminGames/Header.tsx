import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
// import BackIcon from "public/icons/BackIcon";

interface Props {
  name?: string;
  img?: CloudinaryMedia | AWSMedia;
  // onGoBack: () => void;
}

const Header: React.FC<Props> = ({ name, img }) => {
  return (
    <div className="flex justify-between items-center shadow-sm pb-4 px-4">
      <div className="flex items-center">
        {/* <div className="cursor-pointer" onClick={onGoBack}>
          <BackIcon style />
        </div> */}
        <p className="pl-4 text-3xl font-semibold text-gray-700">Admin Games</p>
      </div>

      <Link href={`/editUserProfileV2`}>
        <div className="flex items-center">
          <UserPhoto img={img} name={name} onImgClick={() => {}} />
        </div>
      </Link>
    </div>
  );
};

export default Header;
