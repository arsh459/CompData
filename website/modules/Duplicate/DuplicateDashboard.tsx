import { db } from "@config/firebase";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";
import { getBadgeTasks } from "@hooks/badges/useBadgeTasks";
import { Badge } from "@models/Prizes/PrizeV2";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  gameId: string;
  badgeId: string;
}

const DuplicateDashboard: React.FC<Props> = ({ gameId, badgeId }) => {
  const { badge } = useBadge(gameId, badgeId);
  const [newName, setName] = useState<string>(badge?.name ? badge?.name : "");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDuplicate = async () => {
    if (badge) {
      setLoading(true);
      const newID = uuidv4();

      const dupBadge: Badge = {
        ...badge,
        id: newID,
        name: newName ? newName : "",
        pinned: false,
      };

      await setDoc(
        doc(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "badges", newID),
        dupBadge
      );

      const tasksInBadge = await getBadgeTasks(badge.id);

      for (const task of tasksInBadge) {
        // console.log(task.name, task.badgeDays);

        const badgeDays = task.badgeDays;

        let newBadgeDays: string[] = [];
        // const newBadgeDays: string[] = [];
        if (badgeDays) {
          newBadgeDays = [...badgeDays];
          for (const badgeDay of badgeDays) {
            const keyStr = badgeDay.split("_");
            if (keyStr.length === 2) {
              const id = keyStr[0];
              const day = keyStr[1];

              // to duplicateID
              if (id === badge.id) {
                const newKeyStr = `${newID}_${day}`;
                if (!newBadgeDays.includes(newKeyStr)) {
                  newBadgeDays.push(newKeyStr);
                }

                // newBadgeDays.push();
              }
            }
          }
        }

        const badgeDayPriority = task.badgeDayPriority;

        let newBadgePriority: { [id: string]: number } = {};

        if (badgeDayPriority) {
          newBadgePriority = { ...badgeDayPriority };

          for (const badgeDay of Object.keys(badgeDayPriority)) {
            const keyStr = badgeDay.split("_");
            if (keyStr.length === 2) {
              const id = keyStr[0];
              const day = keyStr[1];

              // to duplicateID
              if (id === badge.id) {
                newBadgePriority[`${newID}_${day}`] =
                  badgeDayPriority[badgeDay];
              }
            }
          }
        }

        console.log("newBadgeDayPriority", newBadgePriority);
        console.log("newBadgeDays", newBadgeDays);
        // console.log("newId", newID, badge.id);

        console.log("");
        console.log("");

        await updateDoc(doc(db, "tasks", task.id), {
          badgeDays: newBadgeDays,
          badgeIds: arrayUnion(newID),
          badgeDayPriority: newBadgePriority,
        });
      }

      // setLoading(false);

      router.back();
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium">To Duplicate{badge?.name}</p>

      <div className="flex items-center p-4">
        <label className="pr-2">New Badge Name :</label>
        <input
          type="string"
          className="border rounded-md"
          name="name"
          value={newName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {loading ? null : (
        <button
          className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
          onClick={handleDuplicate}
        >
          Duplicate Badge
        </button>
      )}
    </div>
  );
};

export default DuplicateDashboard;
