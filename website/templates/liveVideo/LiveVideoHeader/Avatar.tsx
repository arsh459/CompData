import { getCloudinaryURLWithParams } from "@utils/cloudinary";

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  return (
    <div className="relative">
      <img
        src={getCloudinaryURLWithParams(url, 200, 200, "c_fill", "f_auto")}
        className="w-14 h-14 object-cover shadow-2xl rounded-full border-2 border-orange-500"
      />
      <div className="absolute bottom-0 left-1">
        {/* <img
          src="./images/volume-off-outline.svg"
          className="w-4 h-4 object-cover"
        /> */}
      </div>
    </div>
  );
};

export default Avatar;
