// import Button from "@components/button";
// import { useRewardById } from "@hooks/messages/useRewardById";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { MenuItem, TextField } from "@mui/material";
// import PlayerSearch from "@templates/AdminDashboard/FilterModal/PlayerSearch";
// import TeamsModal from "@templates/AdminDashboard/FilterModal/TeamsModal";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { saveReminder } from "@models/Reminder/createUtils";
import { useRouter } from "next/router";
import Button from "@components/button";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import UppyWidget from "@components/Uppy";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import useRound from "@hooks/rounds/useRound";
import AddRoundsArrayData from "./AddRoundsArrayData";
import AddRoundsBenefit from "./AddRoundsBenefit";
import AddSteps from "./AddSteps";
import MakeStreamable from "@templates/ActivityTemplate/MakeStreamable";
import { fpStrategy } from "@models/Event/Round";

// import { Link } from "@mui/material";

interface Props {
  gameId: string;
  roundDetailId: string;
  uid: string;
}

const AddRoundDetailTemplate: React.FC<Props> = ({
  gameId,
  roundDetailId,
  uid,
}) => {
  const { round, setRounds } = useRound(gameId, roundDetailId);

  const router = useRouter();

  const onSave = async () => {
    if (round) {
      await setDoc(doc(doc(db, "sbEvents", gameId), "rounds", round.id), round);
      router.back();
    }
  };

  const onUpload = (media: (CloudinaryMedia | AWSMedia)[]) => {
    setRounds((p) => {
      if (p && media.length)
        return {
          ...p,
          img: media[0],
        };
    });
  };
  const onRemove = () => {
    setRounds((p) => {
      if (p) {
        const { img: _, ...rest } = p;
        return rest;
      }
    });
  };

  // console.log("reward", reward);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-3xl font-bold">ADD RoundDetails</p>
      </div>

      <p className="text-lg">GameName:{getGameNameReadable(gameId)}</p>

      <div className="pt-8">
        <UppyWidgetContainer
          media={round?.img ? [round.img] : []}
          onUpload={onUpload}
          uid={uid}
          onRemove={onRemove}
          screenName="admin"
          taskName="admin"
          heading="Add Main Image"
          helperText=""
          onDelete={onRemove}
        />
      </div>

      <div className="pt-8">
        <UppyWidgetContainer
          media={round?.challengeImg ? [round.challengeImg] : []}
          onUpload={(media: (CloudinaryMedia | AWSMedia)[]) => {
            setRounds((p) => {
              if (p && media.length)
                return {
                  ...p,
                  challengeImg: media[0],
                };
            });
          }}
          uid={uid}
          onRemove={() => {
            setRounds((p) => {
              if (p) {
                const { challengeImg: _, ...rest } = p;
                return rest;
              }
            });
          }}
          screenName="admin"
          taskName="admin"
          heading="Add Challenge Image"
          helperText=""
          onDelete={() => {
            setRounds((p) => {
              if (p) {
                const { challengeImg: _, ...rest } = p;
                return rest;
              }
            });
          }}
        />
      </div>

      <div className="pt-8">
        <UppyWidgetContainer
          media={round?.reelMedia ? [round.reelMedia] : []}
          onUpload={(media: (CloudinaryMedia | AWSMedia)[]) => {
            setRounds((p) => {
              if (p && media.length)
                return {
                  ...p,
                  reelMedia: media[0],
                };
            });
          }}
          uid={uid}
          onRemove={() => {
            setRounds((p) => {
              if (p) {
                const { reelMedia: _, ...rest } = p;
                return rest;
              }
            });
          }}
          screenName="admin"
          taskName="admin"
          heading="Add Reel Video"
          helperText=""
          onDelete={() => {
            setRounds((p) => {
              if (p) {
                const { reelMedia: _, ...rest } = p;
                return rest;
              }
            });
          }}
        />
      </div>
      <div className="p-4 border-2 border-red-500 my-4">
        <p className="text-xl font-bold">Can task stream?</p>
        <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
        <MakeStreamable
          onUpdatePlayback={(val: string) => {
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  playbackId: val,
                };
              }
            });
          }}
          url={round?.reelMedia?.url}
          playbackId={round?.playbackId}
        />
      </div>

      <div className="pt-8">
        <UppyWidgetContainer
          media={round?.reelThumbnail ? [round.reelThumbnail] : []}
          onUpload={(media: (CloudinaryMedia | AWSMedia)[]) => {
            setRounds((p) => {
              if (p && media.length)
                return {
                  ...p,
                  reelThumbnail: media[0],
                };
            });
          }}
          uid={uid}
          onRemove={() => {
            setRounds((p) => {
              if (p) {
                const { reelThumbnail: _, ...rest } = p;
                return rest;
              }
            });
          }}
          screenName="admin"
          taskName="admin"
          heading="Add reelThumbnail"
          helperText=""
          onDelete={() => {
            setRounds((p) => {
              if (p) {
                const { reelThumbnail: _, ...rest } = p;
                return rest;
              }
            });
          }}
        />
      </div>

      {round ? <AddRoundsArrayData round={round} setRound={setRounds} /> : null}
      {round ? (
        <AddRoundsBenefit uid={uid} formData={round} setFormData={setRounds} />
      ) : null}

      {round ? (
        <AddSteps uid={uid} formData={round} setFormData={setRounds} />
      ) : null}

      <div className="pt-4 flex items-center flex-wrap">
        <p className="">taskOrder:</p>
        {round?.taskOrder?.map((item) => (
          <MenuItem key={item} value={item}>
            <p className="capitalize">{item}</p>
          </MenuItem>
        ))}
      </div>
      {/* 
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Sprint Id"}
          label={"sprintId"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  sprintId: val.target.value,
                };
              }
            })
          }
          value={round?.sprintId || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div> */}
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Description"}
          label={"description"}
          multiline={true}
          maxRows={4}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  description: val.target.value,
                };
              }
            })
          }
          value={round?.description || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Round Key"}
          label={"round key in url"}
          multiline={true}
          maxRows={4}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  roundKey: val.target.value,
                };
              }
            })
          }
          value={round?.roundKey || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Short Description"}
          label={"short Description"}
          multiline={true}
          maxRows={4}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  shortDescription: val.target.value,
                };
              }
            })
          }
          value={round?.shortDescription || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Name"}
          label={"name"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  name: val.target.value,
                };
              }
            })
          }
          value={round?.name || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"start unix"}
          label={"start"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  start: parseInt(val.target.value),
                };
              }
            })
          }
          value={round?.start || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"end unix"}
          label={"end"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  end: parseInt(val.target.value),
                };
              }
            })
          }
          value={round?.end || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"FP Target"}
          label={"FP Target"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  fpTarget: parseInt(val.target.value),
                };
              }
            })
          }
          value={round?.fpTarget || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"FP Strategy"}
          label={"FP Strategy"}
          variant="outlined"
          onChange={(val) =>
            setRounds((p) => {
              if (p) {
                return {
                  ...p,
                  fpStrategy: val.target.value as fpStrategy,
                };
              }
            })
          }
          value={round?.fpStrategy || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value={"periodFP"}>periodFP</MenuItem>
          <MenuItem value={"totalFP"}>totalFP</MenuItem>
        </TextField>
      </div>
      {/* <p className="pt-8">How to win</p> */}
      {/* <HowToWinAdder
        onUpdateWin={onUpdateHowToWin}
        howToWin={round?.howToWin}
        uid={uid}
      /> */}
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

export default AddRoundDetailTemplate;
