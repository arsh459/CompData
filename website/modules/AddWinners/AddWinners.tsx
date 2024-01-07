import Button from "@components/button";
import { db } from "@config/firebase";
import { useBadge } from "@hooks/badges/useBadge";
import { useBadgeUsers } from "@hooks/badges/useBadgeUsers";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import PlayerSearch from "@templates/AdminDashboard/FilterModal/PlayerSearch";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

interface Props {
  gameId: string;
  prizeId: string;
}

const AddWinners: React.FC<Props> = ({ gameId, prizeId }) => {
  const { badge } = useBadge(gameId, prizeId);
  const { users } = useBadgeUsers(prizeId, badge?.badgeId);

  const onAddPlayer = async (player?: UserInterface) => {
    if (player?.uid) {
      updateDoc(doc(db, "users", player?.uid), {
        ...(badge?.badgeId === "relative"
          ? {
              relativeBadgesWon: arrayUnion(badge.id),
            }
          : badge?.badgeId === "independent"
          ? {
              independentBadgesWon: arrayUnion(badge.id),
            }
          : badge?.id
          ? {
              otherBadgesWon: arrayUnion(badge.id),
            }
          : {}),
      });

      // get all winners
      await updateDoc(doc(doc(db, "sbEvents", gameId), "badges", prizeId), {
        playersWon: users.length + 1,
      });
    }
  };

  const onRemovePlayer = async (player?: UserInterface) => {
    if (player?.uid) {
      updateDoc(doc(db, "users", player?.uid), {
        ...(badge?.badgeId === "relative"
          ? {
              relativeBadgesWon: arrayRemove(badge.id),
            }
          : badge?.badgeId === "independent"
          ? {
              independentBadgesWon: arrayRemove(badge.id),
            }
          : badge?.id
          ? {
              otherBadgesWon: arrayRemove(badge.id),
            }
          : {}),
      });

      // get all winners
      await updateDoc(doc(doc(db, "sbEvents", gameId), "badges", prizeId), {
        playersWon: users.length - 1,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="py-4">
        <p className="text-lg font-medium">Name: {badge?.name}</p>
        <p>BadgeStyle: {badge?.badgeId}</p>
        <p>Value: {badge?.baseValue}</p>
      </div>
      <div className="pb-8 bg-gray-100">
        <PlayerSearch
          onClose={() => {}}
          initialPlayerName="Swapnil"
          onSelectOverride={onAddPlayer}
          q={{ player: "" }}
        />
      </div>
      <div className="flex flex-wrap pt-4">
        {users.map((item) => {
          return (
            <div key={item.uid} className="w-full border p-4">
              <p>Name: {item.name}</p>
              <p>Phone: {item.phone}</p>
              <p>Email: {item.email}</p>
              <p>UID: {item.uid}</p>
              <div className="py-4 flex">
                <Button
                  appearance="contained"
                  onClick={() => onRemovePlayer(item)}
                >
                  Remove Player
                </Button>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default AddWinners;
