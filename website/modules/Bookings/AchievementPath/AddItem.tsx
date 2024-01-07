import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import {
  AchievementPathData,
  AchievementPathDataItem,
  AchievementPathDataItemStatusType,
  AchievementPathDataItemTypes,
  goalActionTypesArray,
} from "./utils/interface";
import { AchievementPathDataItemTypesArr, icons } from "./utils/constants";

const intialItem = { icon: "", text: "", index: -1 };
interface ItemInterface extends AchievementPathDataItem {
  index: number;
}

interface Props {
  target: AchievementPathData;
  setTarget: (target: AchievementPathData | undefined) => void;
}

const AddItem: React.FC<Props> = ({ target, setTarget }) => {
  const [item, setItem] = useState<ItemInterface>(intialItem);

  const handleAddItem = () => {
    const { index, ...restItem } = item;
    const { items, ...rest } = target;
    const targetItem: AchievementPathDataItem = { ...restItem };

    if (targetItem.icon && targetItem.text) {
      const remoteItems = items
        ? index === -1
          ? [...items, targetItem]
          : items.map((each, itemIndex) =>
              index === itemIndex ? targetItem : each
            )
        : [targetItem];

      setItem(intialItem);
      setTarget({ ...rest, items: remoteItems });
    }
  };

  const cancleItem = () => setItem(intialItem);

  return (
    <div className="border px-4 my-4">
      <p className="mt-4 text-base">Edit Single Target</p>

      <div className="flex flex-col gap-4 my-4 bg-gray-100">
        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Type"}
          label={"Type"}
          variant="outlined"
          onChange={(e) => {
            setItem((prev) => {
              const { type, ...rest } = prev;
              return (
                e.target.value === "NO ENTRY"
                  ? rest
                  : {
                      ...rest,
                      type: e.target.value as AchievementPathDataItemTypes,
                    }
              ) as ItemInterface;
            });
          }}
          value={item.type || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {AchievementPathDataItemTypesArr.map((item) => (
            <MenuItem key={item} value={item}>
              <p className="capitalize">{item.replaceAll("_", " ")}</p>
            </MenuItem>
          ))}
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>

        <div className="flex gap-4">
          <TextField
            select
            style={{ flex: 1 }}
            placeholder={"Icon"}
            label={"Icon"}
            variant="outlined"
            onChange={(e) =>
              setItem((prev) => ({ ...prev, icon: e.target.value }))
            }
            value={item.icon || "NO ENTRY"}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {Object.values(icons).map((item) => (
              <MenuItem key={item} value={item}>
                <img
                  src={item}
                  alt={item}
                  className="w-5 aspect-1 object-contain"
                />
              </MenuItem>
            ))}
            <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
          </TextField>

          <TextField
            style={{ flex: 1 }}
            placeholder={"Text"}
            label={"Text"}
            variant="outlined"
            type="string"
            onChange={(e) =>
              setItem((prev) => ({ ...prev, text: e.target.value }))
            }
            value={item.text}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="flex gap-4">
          <TextField
            select
            style={{ flex: 1, marginRight: 16 }}
            placeholder={"Comparison Type"}
            label={"Comparison Type"}
            variant="outlined"
            onChange={(e) => {
              setItem((prev) => {
                const { comparisonType, ...rest } = prev;
                return (
                  e.target.value === "NO ENTRY"
                    ? rest
                    : {
                        ...rest,
                        comparisonType: e.target.value,
                      }
                ) as ItemInterface;
              });
            }}
            value={item.comparisonType || "NO ENTRY"}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {goalActionTypesArray.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
            <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
          </TextField>

          <TextField
            style={{ flex: 1 }}
            placeholder={"Target"}
            label={"Target"}
            variant="outlined"
            type="number"
            onChange={(e) => {
              setItem((prev) => {
                const { target, ...rest } = prev;
                return (
                  e.target.value === ""
                    ? rest
                    : {
                        ...rest,
                        target: parseFloat(e.target.value),
                      }
                ) as ItemInterface;
              });
            }}
            value={item.target || ""}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            select
            style={{ flex: 1, marginRight: 16 }}
            placeholder={"Status"}
            label={"Status"}
            variant="outlined"
            onChange={(e) => {
              setItem((prev) => {
                const { status, ...rest } = prev;
                return (
                  e.target.value === "NO ENTRY"
                    ? rest
                    : {
                        ...rest,
                        status: e.target
                          .value as AchievementPathDataItemStatusType,
                      }
                ) as ItemInterface;
              });
            }}
            value={item.status || "NO ENTRY"}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value={"DONE"}>DONE</MenuItem>
            <MenuItem value={"PENDING"}>PENDING</MenuItem>
            <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
          </TextField>
        </div>
        <div>
          <TextField
            style={{ flex: 1 }}
            placeholder={"3 times"}
            label={"Min count needed"}
            variant="outlined"
            type="number"
            onChange={(e) =>
              setItem((prev) => ({
                ...prev,
                countNeeded: parseInt(e.target.value),
              }))
            }
            value={item.countNeeded}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="flex pb-10">
          <div className="pr-4">
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              add
            </Button>
          </div>
          <Button variant="contained" color="secondary" onClick={cancleItem}>
            cancel
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 my-4">
        {target.items
          ?.filter((each, index) => index !== item.index)
          ?.map((each, index) => (
            <div key={each.text} className="border p-4">
              <div>
                Type: {each.type || "NO ENTRY"}
                <br />
                Icon:{" "}
                <img
                  src={each.icon}
                  alt={each.text}
                  className="w-5 aspect-1 object-contain mr-2 inline-block"
                />
                <br />
                Text:{each.text}
                <br />
                Comparison Type: {each.comparisonType || "NO ENTRY"}
                <br />
                Target: {each.target || "NO ENTRY"}
                <br />
                Status: {each.status || "NO ENTRY"}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setItem({ ...each, index })}
                >
                  edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    const { items, ...rest } = target;
                    const remoteItems = items?.filter(
                      (item, ind) => each.text !== item.text && ind !== index
                    );
                    setTarget({ ...rest, items: remoteItems });
                  }}
                >
                  delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddItem;
