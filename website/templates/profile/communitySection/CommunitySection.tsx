import { community } from "./constants";
import clsx from "clsx";
import CommunityCard from "@components/cards/communityCard";

interface Props {
  communities: community[];
}

const CommunitySection: React.FC<Props> = ({ communities }) => {
  return (
    <div>
      <p className={clsx("font-semibold text-sm text-gray-700 pb-1")}>
        Community
      </p>
      <div className={clsx("flex justify-start", "")}>
        {communities.map((item) => {
          return (
            <div key={item.name} className={clsx("mr-4")}>
              <CommunityCard
                subtext={item.subtext}
                name={item.name}
                url={item.url}
                text={item.text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunitySection;
