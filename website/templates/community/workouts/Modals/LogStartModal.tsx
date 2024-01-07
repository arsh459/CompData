// import Button from "@components/button";
// import { Link } from "@mui/material";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import ContentLive from "./ContentLive";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  joinStatus: boolean;
  onJoinClick: () => void;
  onLeaveLiveVideo: () => void;
  joinURL?: string;
  userStream?: Object;
}

const LogStartModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  joinStatus,
  onJoinClick,
  joinURL,
  onLeaveLiveVideo,
  userStream,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={() => {}}
      onCloseModal={onCloseModal}
      heading=""
      onButtonPress={() => {}}
    >
      <div className="px-4 py-4 max-h-[75vh] overflow-y-auto relative">
        <ContentLive
          heading="Your workout has begun!"
          subtitle="On this page you can see your calories update live"
          img="https://img.icons8.com/color/144/000000/zoom.png"
          buttonText="Go to live"
          onJoinClick={onJoinClick}
          joinStatus={true}
          joinURL={joinURL}
        />
      </div>
    </CreateModal>
  );
};

export default LogStartModal;
