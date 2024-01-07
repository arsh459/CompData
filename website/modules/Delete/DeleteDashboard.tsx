import { db } from "@config/firebase";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";
import { getBadgeTasks } from "@hooks/badges/useBadgeTasks";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  gameId: string;
  badgeId: string;
}

const DeleteDashboard: React.FC<Props> = ({ gameId, badgeId }) => {
  const { badge } = useBadge(gameId, badgeId);
  const [id, setID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  console.log("ud", id, badge?.id);

  const handleDelete = async () => {
    if (badge?.id === id) {
      setLoading(true);
      const badgeTasks = await getBadgeTasks(badge.id);

      for (const badgeTask of badgeTasks) {
        let newBadgeDays: string[] = [];
        let newBadgePriority: { [day: string]: number } = {};

        if (badgeTask.badgeDays) {
          newBadgeDays = badgeTask.badgeDays.filter((item) => {
            const keyStr = item.split("_");
            if (keyStr.length === 2 && keyStr[0] === badge.id) {
              return false;
            }

            return true;
          });
        }

        if (badgeTask.badgeDayPriority) {
          for (const badgeKeyStr of Object.keys(badgeTask.badgeDayPriority)) {
            const splitArr = badgeKeyStr.split("_");
            if (splitArr.length === 2 && splitArr[0] !== badge.id) {
              newBadgePriority[badgeKeyStr] =
                badgeTask.badgeDayPriority[badgeKeyStr];
            }
          }
        }

        // console.log("badgeId", badgeTask.name, badge.id);
        // console.log("newBadgeDays", badgeTask.name, newBadgeDays);
        // console.log("newBadgePriority", badgeTask.name, newBadgePriority);

        // update task
        await updateDoc(doc(db, "tasks", badgeTask.id), {
          badgeIds: arrayRemove(badge.id),
          badgeDays: newBadgeDays,
          badgeDayPriority: newBadgePriority,
        });
      }

      await deleteDoc(
        doc(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "badges", badge?.id)
      );

      // setLoading(false);

      router.back();
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium">To Delete{badge?.name}</p>

      <div className="flex items-center p-4">
        <label className="pr-2">Type BADGE ID TO DELETE :</label>
        <input
          type="string"
          className="border rounded-md"
          name="name"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
      </div>

      {loading ? null : (
        <button
          className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
          onClick={handleDelete}
        >
          Delete Badge
        </button>
      )}
    </div>
  );
};

export default DeleteDashboard;
