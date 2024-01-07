import {
  badgeTypes,
  DifficultyTypes,
  frequencyTypes,
} from "@models/Prizes/PrizeV2";
import GamePrizes from "./GamePrizes";
import { useBadge } from "@hooks/badges/useBadge";
import { saveBadge } from "@models/Prizes/createUtils";
import { useRouter } from "next/router";
import BadgeImages from "./BadgeImages";
import BadgeArray from "./BadgeArray";
import WeTeaches from "./WeTeaches";
import Constraints from "./Constraints";
import { MenuItem, TextField } from "@mui/material";
import YouExpect from "./YouExpect";
import { PlanTypes } from "@models/SbPlans/interface";
import LiveSchedule from "./LiveSchedule";
// import YouExpect from "./youExpect";

interface Props {
  uid: string;
  gameId: string;
  prizeId: string;
}

const badgeIds: badgeTypes[] = [
  "rank_1",
  "rank_2",
  "rank_3",
  "monthly_rank_1",
  "monthly_rank_2",
  "monthly_rank_3",
  "tier_1",
  "tier_2",
  "monthly_tier_1",
  "monthly_tier_2",
  "team_rank_1",
  "team_rank_24",
  "team_rank_10",
  "monthly_team_rank_1",
  "monthly_team_rank_24",
  "monthly_team_rank_10",
  "coach",
  "monthly_coach",
  "all_levels",
  "level_1",
  "level_2",
  "level_3",
  "level_4",
  "level_5",
  "spotlight",
  "goal_complete",
  "rookie",
  "independent",
  "relative",
  "shield",
  "shield_gold",
  "shield_silver",
  "shield_bronze",
  "beginner",
  "advance",
  "intermediate",
  "agility",
  "strength_female",
  "strength_male",
  "boxing_style",
  "pecfest_olympics",
];

const badgeFrecuencys: frequencyTypes[] = [
  "daily",
  "weekly",
  "monthly",
  "anytime",
];

const GameBadges: React.FC<Props> = ({ uid, gameId, prizeId }) => {
  const { badge, setBadge } = useBadge(gameId, prizeId);

  const handleFormDataChange = (
    key:
      | "name"
      | "primaryCoach"
      | "slug"
      | "frequency"
      | "description"
      | "badgeId"
      | "rankStart"
      | "rankEnd"
      | "priority"
      | "pinned"
      | "baseValue"
      | "hallOfFamePriority"
      | "merchendiseValue"
      | "textColor"
      | "subTextColor"
      | "unlockFP"
      | "nbWorkouts"
      | "isTeamBadge"
      | "courseGoal"
      | "planFP"
      | "slotBooked"
      | "totalSlots"
      | "planType"
      | "text"
      | "liveBadge",
    val: string
  ) => {
    if (
      key === "name" ||
      key === "text" ||
      key === "description" ||
      key === "badgeId" ||
      key === "frequency" ||
      key === "textColor" ||
      key === "subTextColor" ||
      key === "courseGoal" ||
      key === "slug" ||
      key === "primaryCoach"
    ) {
      setBadge((p) => {
        if (p) return { ...p, [key]: val };
      });
    } else if (
      key === "rankStart" ||
      key === "rankEnd" ||
      key === "priority" ||
      key === "baseValue" ||
      key === "hallOfFamePriority" ||
      key === "merchendiseValue" ||
      key === "unlockFP" ||
      key === "nbWorkouts" ||
      key === "planFP" ||
      key === "slotBooked" ||
      key === "totalSlots"
    ) {
      setBadge((p) => {
        if (p) return { ...p, [key]: parseInt(val) };
      });
    } else if (
      key === "pinned" ||
      key === "isTeamBadge" ||
      key === "liveBadge"
    ) {
      setBadge((p) => {
        if (p) return { ...p, [key]: val === "true" ? true : false };
      });
    } else if (key === "planType" && val) {
      // setBadge((p) => {
      //   if (p) return { ...p, planType: val };
      // });
      setBadge((p) => {
        if (p) {
          return {
            ...p,
            planType: val as PlanTypes,
          };
        }
      });
    }
    setBadge((p) => p);
  };

  const onUpdateDifficulty = (newVal: string) => {
    setBadge((prev) => {
      if (prev) {
        return {
          ...prev,
          difficulty: newVal as DifficultyTypes,
        };
      }
    });
  };

  const router = useRouter();

  const handleSave = async () => {
    if (badge) {
      await saveBadge(badge, gameId);
    }

    router.back();
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Badge Name :</label>
          <input
            type="string"
            className="border rounded-md"
            name="name"
            value={badge?.name}
            onChange={(e) => handleFormDataChange("name", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Description :</label>
          <input
            type="string"
            className="border rounded-md"
            name="name"
            value={badge?.description}
            onChange={(e) =>
              handleFormDataChange("description", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex items-center p-4 flex-wrap">
        <p className="pr-4 font-bold">Badge Id :</p>
        {badgeIds.map((item) => (
          <div className="flex items-center pr-4 whitespace-nowrap" key={item}>
            <label className="pr-2" htmlFor={item}>
              {item} :
            </label>
            <input
              type="radio"
              value={item}
              id={item}
              name="badgeId"
              onChange={(e) => handleFormDataChange("badgeId", e.target.value)}
              checked={badge?.badgeId === item}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Rank Start :</label>
          <input
            type="number"
            className="border rounded-md"
            name="rankStart"
            value={badge?.rankStart ? badge?.rankStart : ""}
            onChange={(e) => handleFormDataChange("rankStart", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Rank End :</label>
          <input
            type="number"
            className="border rounded-md"
            name="rankEnd"
            value={badge?.rankEnd ? badge?.rankEnd : ""}
            onChange={(e) => handleFormDataChange("rankEnd", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center p-4 flex-wrap">
        <p className="pr-4 font-bold">Badge Frequency :</p>
        {badgeFrecuencys.map((item) => (
          <div className="flex items-center pr-4" key={item}>
            <label className="pr-2" htmlFor={item}>
              {item} :
            </label>
            <input
              type="radio"
              value={item}
              id={item}
              name="frequency"
              onChange={(e) =>
                handleFormDataChange("frequency", e.target.value)
              }
              checked={badge?.frequency === item}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Priority :</label>
          <input
            type="number"
            className="border rounded-md"
            name="priority"
            value={badge?.priority}
            onChange={(e) => handleFormDataChange("priority", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Hall of Fame Priority :</label>
          <input
            type="number"
            className="border rounded-md"
            name="hallOfFamePriority"
            value={badge?.hallOfFamePriority}
            onChange={(e) =>
              handleFormDataChange("hallOfFamePriority", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Pinned :</label>
          <input
            type={"checkbox"}
            name="pinned"
            onChange={(e) =>
              handleFormDataChange(
                "pinned",
                e.target.checked ? "true" : "false"
              )
            }
            checked={badge?.pinned}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Team Badge :</label>
          <input
            type={"checkbox"}
            name="isTeamBadge"
            onChange={(e) =>
              handleFormDataChange(
                "isTeamBadge",
                e.target.checked ? "true" : "false"
              )
            }
            checked={badge?.isTeamBadge}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Live Badge :</label>
          <input
            type={"checkbox"}
            name="liveBadge"
            onChange={(e) =>
              handleFormDataChange(
                "liveBadge",
                e.target.checked ? "true" : "false"
              )
            }
            checked={badge?.liveBadge}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Base Value :</label>
          <input
            type="number"
            className="border rounded-md"
            name="baseValue"
            value={badge?.baseValue}
            onChange={(e) => handleFormDataChange("baseValue", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Merchendise Value :</label>
          <input
            type="number"
            className="border rounded-md"
            name="merchendiseValue"
            value={badge?.merchendiseValue}
            onChange={(e) =>
              handleFormDataChange("merchendiseValue", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Text Color (ex: #FFFFFF) :</label>
          <input
            type="string"
            className="border rounded-md"
            name="textColor"
            value={badge?.textColor}
            onChange={(e) => handleFormDataChange("textColor", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">SubText Color (ex: #FFFFFF) :</label>
          <input
            type="string"
            className="border rounded-md"
            name="subTextColor"
            value={badge?.subTextColor}
            onChange={(e) =>
              handleFormDataChange("subTextColor", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Unlock FP :</label>
          <input
            type="number"
            className="border rounded-md"
            name="unlockFP"
            value={badge?.unlockFP}
            onChange={(e) => handleFormDataChange("unlockFP", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Number of Workouts :</label>
          <input
            type="number"
            className="border rounded-md"
            name="nbWorkouts"
            value={badge?.nbWorkouts}
            onChange={(e) => handleFormDataChange("nbWorkouts", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">No of Slot Booked</label>
          <input
            type="number"
            className="border rounded-md"
            name="slotBooked"
            value={badge?.slotBooked}
            onChange={(e) => handleFormDataChange("slotBooked", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Total No of Slots</label>
          <input
            type="number"
            className="border rounded-md"
            name="totalSlots"
            value={badge?.totalSlots}
            onChange={(e) => handleFormDataChange("totalSlots", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex items-center p-4">
          <label className="pr-2">Course Goal :</label>
          <input
            type="string"
            className="border rounded-md"
            name="courseGoal"
            value={badge?.courseGoal}
            onChange={(e) => handleFormDataChange("courseGoal", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Plan FitPoints :</label>
          <input
            type="number"
            className="border rounded-md"
            name="planFP"
            value={badge?.planFP}
            onChange={(e) => handleFormDataChange("planFP", e.target.value)}
          />
        </div>
        <div className="flex items-center p-4">
          <label className="pr-2">Card Bottom Text :</label>
          <input
            type="string"
            className="border rounded-md"
            name="courseGoal"
            value={badge?.text || ""}
            onChange={(e) => handleFormDataChange("text", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          label={"Slug for URL"}
          variant="outlined"
          onChange={(val) => handleFormDataChange("slug", val.target.value)}
          value={badge?.slug || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          label={"Primary Coach UID"}
          variant="outlined"
          onChange={(val) =>
            handleFormDataChange("primaryCoach", val.target.value)
          }
          value={badge?.primaryCoach || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Difficulty"}
          label={"Difficulty"}
          variant="outlined"
          onChange={(e) => onUpdateDifficulty(e.target.value)}
          value={badge?.difficulty || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advance">Advance</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Plan Type"}
          label={"Plan Type"}
          variant="outlined"
          onChange={(e) => handleFormDataChange("planType", e.target.value)}
          value={badge?.planType || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="pro">pro</MenuItem>
          <MenuItem value="proPlus">proPlus</MenuItem>
        </TextField>
      </div>
      {badge ? (
        <>
          <YouExpect uid={uid} badge={badge} setBadge={setBadge} />
          <WeTeaches uid={uid} badge={badge} setBadge={setBadge} />
          <Constraints uid={uid} badge={badge} setBadge={setBadge} />
          <GamePrizes uid={uid} formData={badge} setFormData={setBadge} />
          <BadgeImages uid={uid} badge={badge} setBadge={setBadge} />
          <BadgeArray badge={badge} setBadge={setBadge} />
          {badge.liveBadge ? (
            <LiveSchedule badge={badge} setBadge={setBadge} />
          ) : null}
        </>
      ) : null}
      <button
        className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default GameBadges;
