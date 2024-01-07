import Button from "@components/button";
import { Link } from "@mui/material";
// import CreateModal from "@templates/community/Program/CreateModal/CreateModal";

interface Props {
  //   isOpen: boolean;
  //   onCloseModal: () => void;
  joinStatus: boolean;
  onJoinClick: () => void;
  //   onLeaveLiveVideo: () => void;
  joinURL?: string;
  img: string;
  heading: string;
  subtitle: string;
  buttonText: string;
}

const ContentLive: React.FC<Props> = ({
  joinStatus,
  onJoinClick,
  joinURL,
  heading,
  subtitle,
  buttonText,
  img,
}) => {
  return (
    <div className="">
      {joinStatus ? (
        <div className="flex flex-col justify-center items-center">
          <img src={img} className="w-36 h-36 object-cover" />
          <p className="text-gray-700 font-semibold text-2xl text-center">
            {heading}
          </p>
          <p className="text-gray-500 text-lg text-center">{subtitle}</p>
          <div className="pt-4">
            {joinURL ? (
              <Link href={joinURL} target="_blank">
                <Button
                  appearance="contained"
                  type="submit"
                  onClick={onJoinClick}
                >
                  {buttonText}
                </Button>
              </Link>
            ) : (
              <Button
                appearance="contained"
                type="submit"
                onClick={onJoinClick}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContentLive;
