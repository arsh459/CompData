import { useLevels } from "@hooks/level/useLevels";
import { Button } from "@mui/material";
import { db } from "@config/firebase";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

interface Props {}

const LevelsDashboard: React.FC<Props> = ({}) => {
  const { levels } = useLevels();

  const onDelete = async (id: string) => {
    await deleteDoc(doc(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "level", id));
  };

  return (
    <div>
      <div className="p-4">
        <Link href={`/admin/levels/addNew`}>
          <Button variant="contained">Add new</Button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap">
        {levels.map((item) => {
          return (
            <div key={item.id} className="text-black p-4 m-4 border">
              <Link href={`/admin/levels/${item.id}`}>
                <div className="">
                  <p>level id: {item.id}</p>
                  <p>level name: {item.title}</p>
                  <p>level number: {item.lvlNumber}</p>
                </div>
              </Link>
              <div className="py-4 text-red-500">
                <p onClick={() => onDelete(item.id)}>DELETE</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelsDashboard;
