import { db } from "@config/firebase";
import { useWatchUsers } from "@hooks/paidStatus/useWatchUsers";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface Props {}

const WatchListEdit: React.FC<Props> = ({}) => {
  const { paidCards, setRefresh } = useWatchUsers();
  const [id, setID] = useState<string>("");

  const addToList = async (status: boolean, uid: string) => {
    await updateDoc(doc(db, "users", uid), {
      watching: status,
    });

    setRefresh((p) => p + 1);
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="flex items-center p-4">
          <label className="pr-2">UID TO WATCH :</label>
          <input
            type="string"
            className="border rounded-md"
            name="name"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
        </div>

        <button
          className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
          onClick={() => addToList(true, id)}
        >
          Add To List
        </button>
      </div>
      <div className="pt-4">
        {paidCards.map((item) => {
          return (
            <div key={item.uid} className="border p-4">
              <p>{item.name}</p>
              <p>{item.uid}</p>
              <p
                className="text-red-500"
                onClick={() => addToList(false, item.uid)}
              >
                REMOVE
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchListEdit;
