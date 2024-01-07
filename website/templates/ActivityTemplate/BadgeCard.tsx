import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";

interface Props {
  id: string;
}

const BadgeCard: React.FC<Props> = ({ id }) => {
  const { badge } = useBadge(TEAM_ALPHABET_GAME, id);
  return (
    <div className="p-2">
      <p>{badge?.name}</p>
    </div>
  );
};

export default BadgeCard;
