import { CampaignPost } from "@models/Event/Campaign";
import { deleteCampaignPost } from "@models/Event/createCampaignUtils";
import MediaCarouselV2 from "@templates/listing/HeaderImage/MediaCarouselV2";
import CampaignPostText from "./CampaignPostText";
// import MediaCarouselV3 from "@templates/listing/HeaderImage/MediaCarouselV3";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import EditPostSection from "./EditPostSection";
// import CampaignCreator from "./CampaignCreator";
// import ComeBackLater from "./ComeBackLater";

interface Props {
  post: CampaignPost;
  uid: string;
  onEdit: (post: CampaignPost) => void;
}

const CampaignPostView: React.FC<Props> = ({ post, uid, onEdit }) => {
  return (
    <div className="w-[320px] rounded-lg">
      <div className="shadow-sm rounded-lg">
        <MediaCarouselV2
          media={post.media}
          size="card"
          live={true}
          paused={true}
          rounded={false}
        />
      </div>

      <div className="pt-2">
        <CampaignPostText label="Caption" text={post.caption} />
      </div>

      <div>
        <CampaignPostText label="tags" text={post.tags} />
      </div>

      <div>
        <CampaignPostText label="hashtags" text={post.hashtags} />
      </div>

      {uid === post.creatorId ? (
        <div className="pt-2">
          <EditPostSection
            onEdit={() => onEdit(post)}
            onDelete={() => deleteCampaignPost(post.id, post.eventId)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CampaignPostView;
