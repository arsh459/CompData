import { Badge } from "@models/Prizes/PrizeV2";
import { useState } from "react";

type targetKeys =
  | "rounds"
  | "sprints"
  | "tags"
  | "bgLinearColors"
  | "bgLinearColors2"
  | "creatorIds"
  | "equipmentNeeded"
  | "dos"
  | "donts";

const targetKeysArr: targetKeys[] = [
  "rounds",
  "sprints",
  "tags",
  "bgLinearColors",
  "bgLinearColors2",
  "creatorIds",
  "equipmentNeeded",
  "dos",
  "donts",
];

interface Props {
  badge: Badge;
  setBadge: (data: Badge) => void;
}

const BadgeArray: React.FC<Props> = ({ badge, setBadge }) => {
  const [editKey, setEditKey] = useState<Partial<Record<targetKeys, number>>>();
  const [tempStr, settempStr] = useState<{ [id in targetKeys]: string }>({
    rounds: "",
    sprints: "",
    tags: "",
    bgLinearColors: "",
    bgLinearColors2: "",
    creatorIds: "",
    equipmentNeeded: "",
    donts: "",
    dos: "",
  });

  const addData = (key: targetKeys, data: string) => {
    let remoteData = badge[key];
    if (remoteData) {
      const editIndex = editKey && editKey[key];
      if (typeof editIndex === "number") {
        remoteData[editIndex] = data;
      } else {
        remoteData.push(data);
      }
    } else {
      remoteData = [data];
    }
    setBadge({ ...badge, [key]: remoteData });
    settempStr((p) => ({ ...p, [key]: "" }));
    setEditKey(undefined);
  };

  const removeData = (key: targetKeys, data: string) => {
    const remoteData = badge[key]?.filter((e) => e !== data);
    setBadge({ ...badge, [key]: remoteData });
  };

  const editData = (key: targetKeys, data: string, index: number) => {
    setEditKey({ [key]: index });
    settempStr((p) => ({ ...p, [key]: data }));
  };

  return (
    <div className="w-full flex flex-wrap justify-center border py-4 my-4">
      {targetKeysArr.map((targetKey) => {
        const editIndex = editKey && editKey[targetKey];

        return (
          <div key={targetKey} className="w-full sm:w-[30%] border m-2 p-4">
            <div className="w-full flex items-center">
              <label className="pr-2 capitalize">{targetKey} :</label>
              <input
                type="string"
                className="flex-1 border rounded-md"
                name={targetKey}
                value={tempStr[targetKey]}
                onChange={(e) =>
                  settempStr((p) => ({ ...p, [targetKey]: e.target.value }))
                }
              />
              <p
                onClick={() =>
                  tempStr[targetKey] !== "" &&
                  addData(targetKey, tempStr[targetKey])
                }
                className="bg-red-500 text-white ml-2 px-4 py-1 cursor-pointer"
              >
                {typeof editIndex === "number" ? "Save" : "Add"}
              </p>
            </div>
            <div className="w-full flex flex-col mt-4">
              {badge[targetKey]?.map((each, index) => (
                <div
                  key={`${targetKey}-${index}`}
                  className="border flex px-3 py-1 m-1"
                  style={{
                    display:
                      typeof editIndex === "number" && index === editIndex
                        ? "none"
                        : undefined,
                  }}
                >
                  <p className="flex-1">{each}</p>
                  <p
                    onClick={() => editData(targetKey, each, index)}
                    className="cursor-pointer mx-4"
                  >
                    🖍
                  </p>
                  <p
                    onClick={() => removeData(targetKey, each)}
                    className="cursor-pointer"
                  >
                    ❌
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BadgeArray;
