import { useAchievers } from "@hooks/awards/useAchievers";
import { UserInterface } from "@models/User/User";
import AwardItem from "./AwardItem";
import GenerateButtons from "./GenerateButtons";

interface Props {
  remoteUser?: UserInterface;
}

const AwardsView: React.FC<Props> = ({ remoteUser }) => {
  const { achievers, awards } = useAchievers(remoteUser?.uid);
  return (
    <div>
      <p className="p-4 pb-0 font-medium text-lg">Awards</p>
      {remoteUser ? (
        <div className="px-4 pb-4 pt-2">
          <GenerateButtons remoteUser={remoteUser} />
        </div>
      ) : null}
      <div className="flex flex-wrap w-full">
        {achievers.map((item) => {
          console.log("item", item.title, item.awardStatus, item.progress);

          // item.progress;
          const award = awards[item.awardId];
          if (award) {
            return (
              <div key={item.id} className="w-1/2 sm:w-1/5">
                <AwardItem award={award} achiever={item} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default AwardsView;
