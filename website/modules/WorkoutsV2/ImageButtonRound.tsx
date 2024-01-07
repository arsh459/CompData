import { CameraIcon, VideoCameraIcon, TrashIcon } from "@heroicons/react/solid";

interface Props {
  icon: "camera" | "record" | "delete";
  text: string;
  onClick: () => void;
}

const ImageButtonRound: React.FC<Props> = ({ icon, text, onClick }) => {
  return (
    <div
      className="shadow cursor-pointer rounded-full border border-gray-600 text-base text-gray-600 flex items-center justify-center p-4 m-2"
      onClick={onClick}
    >
      <span className="mr-2 inline-block">
        {icon === "delete" ? (
          <TrashIcon style={{ height: "30", width: "30" }} />
        ) : icon === "camera" ? (
          <CameraIcon style={{ height: "30", width: "30" }} />
        ) : (
          <VideoCameraIcon style={{ height: "30", width: "30" }} />
        )}
      </span>
      <span>{text}</span>
    </div>
  );
};

export default ImageButtonRound;
