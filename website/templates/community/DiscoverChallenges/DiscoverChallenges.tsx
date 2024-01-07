import { useDiscoverChallenges } from "@hooks/community/useDiscoverChallenges";
import ChildEventHolder from "../Program/JoinWrapper/ChildEventHolder";

interface Props {}

const DiscoverChallenges: React.FC<Props> = ({}) => {
  const { challenges } = useDiscoverChallenges();
  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 text-center">
          Discover challenges on SocialBoat
        </p>
        <p className="text-gray-500 text-center">
          Win rewards. Drive transformations
        </p>
      </div>

      <div className="pt-8">
        <ChildEventHolder
          childEvents={challenges}
          justifyStyle="justify-evenly"
        />
      </div>
    </div>
  );
};

export default DiscoverChallenges;
