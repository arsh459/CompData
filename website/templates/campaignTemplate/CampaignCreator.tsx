import Button from "@components/button";
import { useState } from "react";
// import Script from "next/script";
import CampaignCreateModal from "./CampaignCreateModal";
import { UserInterface } from "@models/User/User";
import { CampaignPost } from "@models/Event/Campaign";

interface Props {
  ownerUID: string;
  eventId: string;
  parentId?: string;
  uid: string;
  user?: UserInterface;
  editingPost?: CampaignPost;
  editingFlag?: boolean;
  // onToggleEdit: () => void;
}

const CampaignCreator: React.FC<Props> = ({
  ownerUID,
  eventId,
  editingPost,
  editingFlag,
  // onToggleEdit,
  uid,
  user,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onClose = () => {
    setIsVisible(false);
  };

  const onOpen = () => {
    setIsVisible(true);
    // onToggleEdit();
  };

  return (
    <>
      <CampaignCreateModal
        isOpen={isVisible}
        onBackdrop={onClose}
        onButtonPress={() => {}}
        onCloseModal={onClose}
        eventId={eventId}
        uid={uid}
        editingPost={editingPost}
        editFlag={editingFlag}
      />

      <div>
        {user?.role === "admin" || ownerUID === uid ? (
          <div className="flex justify-center flex-col">
            <div className="flex justify-center">
              <Button appearance="contained" onClick={onOpen}>
                Create campaign post
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center pt-1">
              *only visible to admin
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CampaignCreator;
