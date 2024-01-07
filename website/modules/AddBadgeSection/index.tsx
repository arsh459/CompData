import Button from "@components/button";
import { db } from "@config/firebase";
import useBadgeSection from "@hooks/badgeSections/useBadgeSection";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

interface Props {
  gameId: string;
  prizeId: string;
  sectionId: string;
}

const AddBadgeSection: React.FC<Props> = ({ gameId, prizeId, sectionId }) => {
  //   const { badge } = useBadge(gameId, prizeId);
  //   const { users } = useBadgeUsers(prizeId, badge?.badgeId);
  const router = useRouter();

  const { badgeSection, setBadgeSection } = useBadgeSection(
    gameId,
    prizeId,
    sectionId
  );
  const onSave = async () => {
    if (badgeSection) {
      const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);
      await setDoc(
        doc(ref, "badgeSections", badgeSection.sectionId),
        badgeSection
      );
      router.back();
    }
  };
  return (
    <div className="p-4">
      <div className="py-4">
        {/* <p className="text-lg font-medium">Name: {badge?.name}</p>
        <p>BadgeStyle: {badge?.badgeId}</p>
        <p>Value: {badge?.baseValue}</p> */}
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Section Name"}
          label={"Section Name"}
          variant="outlined"
          onChange={(val) =>
            setBadgeSection((p) => {
              if (p) {
                return {
                  ...p,
                  sectionName: val.target.value,
                };
              }
            })
          }
          value={badgeSection?.sectionName || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Number of Tasks"}
          label={"Number of Tasks"}
          variant="outlined"
          type={"number"}
          onChange={(val) =>
            setBadgeSection((p) => {
              if (p) {
                return {
                  ...p,
                  nbTasks: parseInt(val.target.value, 10),
                };
              }
            })
          }
          value={badgeSection?.nbTasks || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Number of fitpoints"}
          label={"Number of fitpoints"}
          variant="outlined"
          type={"number"}
          onChange={(val) =>
            setBadgeSection((p) => {
              if (p) {
                return {
                  ...p,
                  nbFp: parseInt(val.target.value, 10),
                };
              }
            })
          }
          value={badgeSection?.nbFp || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Priority"}
          label={"Priority"}
          variant="outlined"
          type={"number"}
          onChange={(val) =>
            setBadgeSection((p) => {
              if (p) {
                return {
                  ...p,
                  priority: parseInt(val.target.value, 10),
                };
              }
            })
          }
          value={badgeSection?.priority || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8 flex">
        <div className="pt-4 flex items-center justify-center">
          <Button onClick={onSave} appearance="contained" className="">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBadgeSection;
