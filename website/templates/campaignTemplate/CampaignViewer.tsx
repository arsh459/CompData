import { CampaignPost } from "@models/Event/Campaign";
import { useState } from "react";
import CampaignCreateModal from "./CampaignCreateModal";
import CampaignPostView from "./CampaignPostView";

interface Props {
  posts: CampaignPost[];
  uid: string;
  // onEditPost: (newPost: CampaignPost) => void;
}

const CampaignViewer: React.FC<Props> = ({ posts, uid }) => {
  const [editingPost, setEditingPost] = useState<CampaignPost>();
  const [editingFlag, setEditingFlag] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const editPost = (newPost: CampaignPost) => {
    setIsVisible(true);
    setEditingPost(newPost);
    setEditingFlag(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <CampaignCreateModal
        isOpen={isVisible}
        onBackdrop={onClose}
        onButtonPress={() => {}}
        onCloseModal={onClose}
        eventId={editingPost?.eventId}
        uid={uid}
        editingPost={editingPost}
        editFlag={editingFlag}
      />
      <div>
        <div className="pb-8">
          <p className="text-xl md:text-3xl text-gray-700 font-medium text-center">
            Campaign posts
          </p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start">
          {posts.map((item) => {
            return (
              <div key={item.id} className="pb-4 sm:pr-4 md:pr-8">
                <CampaignPostView post={item} uid={uid} onEdit={editPost} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CampaignViewer;
