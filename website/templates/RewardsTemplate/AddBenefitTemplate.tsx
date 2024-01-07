// import Button from "@components/button";
// import { useRewardById } from "@hooks/messages/useRewardById";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { TextField } from "@mui/material";
// import PlayerSearch from "@templates/AdminDashboard/FilterModal/PlayerSearch";
// import TeamsModal from "@templates/AdminDashboard/FilterModal/TeamsModal";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { saveReminder } from "@models/Reminder/createUtils";
import { useRouter } from "next/router";
import Button from "@components/button";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { useBenefit } from "@hooks/benefits/useBenefit";
// import UppyWidget from "@components/Uppy";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useBadges } from "@hooks/badges/useBadges";
import clsx from "clsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { reconStrategy } from "@models/Prizes/Prize";

// import { Link } from "@mui/material";

interface Props {
  gameId: string;
  rewardId: string;
  uid: string;
}

const strats: reconStrategy[] = ["anyBadge", "specificBadge"];

const AddBenefitTemplate: React.FC<Props> = ({ gameId, rewardId, uid }) => {
  const { benefit, setBenefit } = useBenefit(gameId, rewardId);
  const { badges } = useBadges(gameId);

  //   console.log("benefit", benefit);
  //   const { reward, setReward } = useRewardById(rewardId, gameId, true, "reward");

  const router = useRouter();

  const onSave = async () => {
    if (benefit) {
      await setDoc(
        doc(doc(db, "sbEvents", gameId), "benefits", benefit.id),
        benefit
      );
      router.back();
    }
  };

  const onUpload = (media: (CloudinaryMedia | AWSMedia)[]) => {
    setBenefit((p) => {
      if (p && media.length)
        return {
          ...p,
          media: media[0],
        };
    });
  };
  const onRemove = () => {
    setBenefit((p) => {
      if (p) {
        const { media: _, ...rest } = p;
        return rest;
      }
    });
  };

  // console.log("reward", reward);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-3xl font-bold">ADD Benefit</p>
      </div>

      <p className="text-lg">{getGameNameReadable(gameId)}</p>

      <div className="pt-8">
        <UppyWidgetContainer
          media={benefit?.media ? [benefit.media] : []}
          onUpload={onUpload}
          uid={uid}
          onRemove={onRemove}
          screenName="admin"
          taskName="admin"
          heading="Add Media"
          helperText=""
          onDelete={onRemove}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Name of position"}
          label={"Position name"}
          variant="outlined"
          onChange={(val) =>
            setBenefit((p) => {
              if (p) {
                return {
                  ...p,
                  name: val.target.value,
                };
              }
            })
          }
          value={benefit?.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Name of Brand"}
          label={"Brand name"}
          variant="outlined"
          onChange={(val) =>
            setBenefit((p) => {
              if (p) {
                return {
                  ...p,
                  brand: val.target.value,
                };
              }
            })
          }
          value={benefit?.brand}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"description "}
          label={"Add description"}
          variant="outlined"
          onChange={(val) =>
            setBenefit((p) => {
              if (p) {
                return {
                  ...p,
                  description: val.target.value,
                };
              }
            })
          }
          value={benefit?.description}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"priority"}
          label={"priority"}
          variant="outlined"
          onChange={(val) =>
            setBenefit((p) => {
              if (p) {
                return {
                  ...p,
                  priority: parseInt(val.target.value),
                };
              }
            })
          }
          value={benefit?.priority || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"minNumBadges"}
          label={"minNumBadges"}
          variant="outlined"
          onChange={(val) =>
            setBenefit((p) => {
              if (p) {
                return {
                  ...p,
                  minNumBadges: parseInt(val.target.value),
                };
              }
            })
          }
          value={benefit?.minNumBadges || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8 flex">
        <p className="text-2xl font-medium">Select Strategy</p>
        {strats.map((item) => {
          return (
            <div
              key={item}
              className={clsx(
                item === benefit?.strategy ? "border-green-500" : "",
                "border p-4 mx-4 cursor-pointer"
              )}
              onClick={() => {
                if (benefit?.strategy !== item) {
                  setBenefit((p) => {
                    if (p)
                      return {
                        ...p,
                        strategy: item,
                      };
                  });
                }
              }}
            >
              <p className="text-xl text-black">{item}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap pt-4">
        {badges.map((item) => {
          const isAdded = benefit?.badgeIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                // console.log("h", benefit);
                if (benefit?.badgeIds.includes(item.id)) {
                  setBenefit((p) => {
                    if (p) {
                      return {
                        ...p,
                        badgeIds: p.badgeIds.filter((it) => it !== item.id),
                      };
                    }
                  });
                } else {
                  setBenefit((p) => {
                    if (p) {
                      return {
                        ...p,
                        badgeIds: [...p.badgeIds, item.id],
                      };
                    }
                  });
                }
              }}
              className={clsx(
                "cursor-pointer",
                isAdded ? "border-green-500" : "border-black",
                "p-4  m-4 border-2"
              )}
            >
              <p>{item.badgeId}</p>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button onClick={onSave} appearance="contained" className="">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddBenefitTemplate;
