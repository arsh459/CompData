import CreateModal from "./CreateModal/CreateModal";
import { useClaps } from "@hooks/community/useClaps";
import TopClose from "./Feed/TopClose";
import { Divider, Link } from "@mui/material";
import ClapAvatar from "./ClapAvatar";
import { useUserClaps } from "@hooks/community/useUserClaps";
import { DocumentReference } from "@firebase/firestore";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  heading?: string;
  signedInUID?: string;
  // authorUID?: string;
  // authorKey?: string;
  // eventId?: string;
  // postId?: string;
  // parentPostId?: string;
  postRef?: DocumentReference;
  // onProfileNameClick: (uid: string) => void;
}

const ClapModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  signedInUID,
  // eventId,
  // postId,
  // parentPostId,
  // onProfileNameClick,
  postRef,
}) => {
  const { clappers } = useClaps(isOpen, postRef);

  const { userClappers } = useUserClaps(isOpen, signedInUID);

  const onImgClick = () => {
    // onCloseModal();
    // onProfileNameClick(id);
  };

  return (
    <div className="">
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onCloseModal}
        onCloseModal={onCloseModal}
        heading={""}
        onButtonPress={() => {}}
      >
        <>
          <div className="p-4 max-h-[85vh] overflow-y-auto scrollbar-hide relative">
            <div className="cursor-pointer">
              <TopClose onCloseModal={onCloseModal} />
              <div className="pt-2">
                <Divider />
              </div>
            </div>

            <div className="pt-4 pb-12">
              {[...clappers, ...userClappers].map((item, index) => {
                return (
                  <div key={item.id} className="pb-4">
                    <Link href={`/p/${item.clapperId}`}>
                      <ClapAvatar
                        name={item.clapperName}
                        img={item.clapperImage}
                        numClaps={item.numClaps}
                        onImgClick={() => onImgClick()}
                      />
                    </Link>
                    {index + 1 !== clappers.length ? (
                      <div className="pt-2">
                        <Divider />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </>
      </CreateModal>
    </div>
  );
};

export default ClapModal;
