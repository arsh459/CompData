import { useAuth } from "@hooks/auth/useAuth";
import { useCampaignPosts } from "@hooks/campaign/useCampaignPosts";
// import Script from "next/script";
// import { CampaignPost } from "@models/Event/Campaign";
import CampaignCreator from "./CampaignCreator";
import CampaignViewer from "./CampaignViewer";
import ComeBackLater from "./ComeBackLater";

interface Props {
  // uid: string;
  ownerUID: string;
  eventId: string;
  parentId?: string;
}

const CampaignTemplate: React.FC<Props> = ({
  // posts,
  ownerUID,
  eventId,
  parentId,
  // uid,
}) => {
  const { uid, user } = useAuth();
  const { campaingPosts } = useCampaignPosts(eventId);
  const parentPosts = useCampaignPosts(parentId);

  // const onToggleEdit = () => setEditingFlag(false);

  return (
    <div>
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      {campaingPosts.length === 0 && parentPosts.campaingPosts.length === 0 ? (
        <div className="h-screen w-full flex flex-col justify-center">
          <CampaignCreator
            ownerUID={ownerUID}
            eventId={eventId}
            parentId={parentId}
            uid={uid}
            user={user}
          />
          <ComeBackLater />
        </div>
      ) : (
        <div className="p-4">
          <CampaignCreator
            ownerUID={ownerUID}
            eventId={eventId}
            parentId={parentId}
            uid={uid}
            user={user}
          />
          <div className="pt-4">
            <CampaignViewer
              posts={[...campaingPosts, ...parentPosts.campaingPosts]}
              uid={uid}
              // onEditPost={editPost}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTemplate;
