import { useBadgeSections } from "@hooks/badgeSections/useBadgeSections";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
import { Link } from "@mui/material";
// import { format } from "date-fns";
import Button from "@components/button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@config/firebase";

interface Props {
  gameId: string;
  prizeId: string;
}

const BadgeSectionsTemplate: React.FC<Props> = ({ gameId, prizeId }) => {
  const { badgeSections, setBadgeSections } = useBadgeSections(gameId, prizeId);

  const deleteSection = async (sectionId: string) => {
    setBadgeSections((prev) =>
      prev?.filter((item) => item.sectionId !== sectionId)
    );
    await deleteDoc(
      doc(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "badgeSections",
        sectionId
      )
    );
  };

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <Link href={`/admin/games/${gameId}/${prizeId}/sections/add`}>
          <Button appearance="contained">Add New Badge Section</Button>
        </Link>
      </div>

      <p>list of sections</p>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {badgeSections?.map((item) => {
            return (
              <div key={item.sectionId} className="border p-4">
                <Link
                  href={`/admin/games/${gameId}/${prizeId}/sections/${item.sectionId}`}
                >
                  <p>sectionId:{item.sectionId}</p>
                  <p>sectionName:{item.sectionName}</p>
                  <p>priority:{item.priority}</p>
                </Link>

                <p
                  onClick={() => deleteSection(item.sectionId)}
                  className="pt-4 bg-red-500"
                >
                  Delete Section
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgeSectionsTemplate;
