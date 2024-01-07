import Divider from "@components/divider/Divider";
// import { useNewPost } from "@hooks/community/useNewPost";
// import { useNewSession } from "@hooks/community/useNewSession";
// import { updateProgram } from "@models/Event/createUtils";
import { EventInterface } from "@models/Event/Event";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { saveNewPost } from "@models/Posts/createUtils";
// import { Post } from "@models/Posts/Post";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import ChildEventHolder from "@templates/community/Program/JoinWrapper/ChildEventHolder";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
// import FilterButton from "@templates/editEvent/Form/FilterButton";
// import CreateModal from "../CreateModal/CreateModal";
// import UserPhoto from "../Feed/PostView/UserPhoto";
// import TopClose from "../Feed/TopClose";
// import PostText from "../PostText";
// import LiveSelector from "./LiveSelector";
// import { imageButton } from "./constants";
// import LiveSelector from "./LiveSelector";
// import PostButton from "./PostButton";
// import PostIcons from "./PostIcons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  //   eventId: string;
  //   cohortId: string;
  //   communityId: string;
  //   authorName: string;
  onBackdrop: () => void;
  childEvents: EventInterface[];
  //   authorUID: string;
  //   authorImage?: CloudinaryMedia;
  //   initalSessionType: sessionTypes;
  //   heading?: string;
  //   submitOverride?: (newPost: Post) => void;
}

const BoatSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  childEvents,
}) => {
  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onBackdrop}
        onCloseModal={onClose}
        onButtonPress={() => {}}
        heading={""}
        maxW="max-w-5xl"
      >
        <div className="px-4 py-4 h-[90vh] flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="pb-2 cursor-pointer">
                <TopClose onCloseModal={onClose} />
              </div>
              <p className="text-center font-medium text-gray-700">
                Select your boat
              </p>
              <div />
            </div>

            <div>
              <Divider />
            </div>

            <div className="pt-4 flex flex-wrap overflow-y-scroll h-[75vh]">
              <ChildEventHolder
                childEvents={childEvents}
                justifyStyle="justify-evenly"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              {"Cancel"}
            </button>
          </div>
        </div>
      </CreateModal>
    </>
  );
};

export default BoatSelectModal;
