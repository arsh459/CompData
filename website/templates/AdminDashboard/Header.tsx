import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";

interface Props {
  name?: string;
  img?: CloudinaryMedia | AWSMedia;
  //   uid: string;
  headingText?: string;
}

const Header: React.FC<Props> = ({ name, img, headingText }) => {
  return (
    <div className="flex justify-between items-center shadow-sm pb-4 px-4">
      <div>
        <p className="text-3xl font-semibold text-gray-700">
          {headingText ? headingText : "Admin Dashboard"}
        </p>
      </div>

      <Link href={`/editUserProfileV2`}>
        <div className="flex items-center">
          <UserPhoto
            // nameInvisible={true}
            img={img}
            name={name}
            onImgClick={() => {}}
          />
        </div>
      </Link>
    </div>
  );
};

export default Header;
