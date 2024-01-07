import { fundingCampaign } from "./constants";
import VideoCard from "@components/cards/videoCard";
import clsx from "clsx";

interface Props {
  campaign: fundingCampaign;
}

const SectionCrowd: React.FC<Props> = ({ campaign }) => {
  return (
    <div>
      <p className={clsx("font-semibold text-sm text-gray-700 pb-1")}>
        Sponsor ambition
      </p>

      <div className={clsx("")}>
        <VideoCard
          name={campaign.name}
          url={campaign.url}
          live={false}
          // paused={true}
          imgMode={true}
          cost={campaign.pledged}
          currency={campaign.currency}
          campaign={true}
          funded={campaign.funded}
        />
      </div>
    </div>
  );
};

export default SectionCrowd;
