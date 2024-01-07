import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";

interface Props {
  id?: string;
  keyStr: string;
}

const BadgeName: React.FC<Props> = ({ id, keyStr }) => {
  const { badge } = useBadge(TEAM_ALPHABET_GAME, id);

  return (
    <div>
      {badge?.name ? (
        <p className="text-green-700 text-sm font-medium">
          {keyStr}: {badge?.name}
        </p>
      ) : (
        <p className="text-red-700 text-sm">{keyStr}: Not here</p>
      )}
    </div>
  );
};

export default BadgeName;
