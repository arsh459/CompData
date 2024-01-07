import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useFirestoreSearch } from "@hooks/search/firestore/useFirestoreSearch";
import { TextField } from "@mui/material";
import { collection, doc } from "firebase/firestore";
import { db } from "@config/firebase";
import { Badge } from "@models/Prizes/PrizeV2";
import BadgeCard from "./BadgeCard";

interface Props {
  onAddBadgeIdToArr: (newId: string) => void;
  onRemoveBadgeIdFromList: (newId: string) => void;
  badges?: string[];
}

const ref = collection(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "badges");

const BadgeIdAdder: React.FC<Props> = ({
  onAddBadgeIdToArr,
  onRemoveBadgeIdFromList,
  badges,
}) => {
  const { fetchedData, searchString, setSearchString } = useFirestoreSearch(
    ref,
    "name",
    undefined,
    "Begineer"
  );

  //   console.log("f", fetchedData);

  return (
    <div className="pt-8">
      <TextField
        style={{ width: "100%" }}
        placeholder={"Search Badge"}
        label={"Badge"}
        variant="outlined"
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        value={searchString}
        InputLabelProps={{
          shrink: true,
        }}
      ></TextField>
      <div className="border border-red-500 p-2 flex flex-wrap">
        {badges?.map((item) => {
          return (
            <div key={item} className="border mx-2">
              <BadgeCard id={item} />
              <p
                className="text-red-500 px-2"
                onClick={() => onRemoveBadgeIdFromList(item)}
              >
                Remove
              </p>
            </div>
          );
        })}
      </div>
      <div className="pt-2">
        {fetchedData?.map((badgeD) => {
          const badge = badgeD as Badge;
          return (
            <div
              onClick={() => {
                onAddBadgeIdToArr(badge.id);
              }}
              key={badge.id}
              className="border px-2 py-2 m-1"
            >
              <p className="text-base">{badge.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeIdAdder;
