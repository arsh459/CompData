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
// import UppyWidget from "@components/Uppy";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import useSprint, { ListItemContent } from "@hooks/sprints/useSprint";
import HowToWinAdder from "@modules/Sprint/HowToWinAdder";

// import { Link } from "@mui/material";

interface Props {
  gameId: string;
  sprintDetailId: string;
  uid: string;
}

const AddBenefitTemplate: React.FC<Props> = ({
  gameId,
  sprintDetailId,
  uid,
}) => {
  const { sprintDetail, setSprintDetail } = useSprint(gameId, sprintDetailId);
  console.log({ sprintDetail });

  const router = useRouter();

  const onSave = async () => {
    if (sprintDetail) {
      await setDoc(
        doc(doc(db, "sbEvents", gameId), "sprintDetails", sprintDetail.id),
        sprintDetail
      );
      router.back();
    }
  };

  const onUpload = (media: (CloudinaryMedia | AWSMedia)[]) => {
    setSprintDetail((p) => {
      if (p && media.length)
        return {
          ...p,
          mainImage: media[0],
        };
    });
  };
  const onRemove = () => {
    setSprintDetail((p) => {
      if (p) {
        const { mainImage: _, ...rest } = p;
        return rest;
      }
    });
  };
  const onUpdateHowToWin = (howToWin: ListItemContent[]) => {
    setSprintDetail((prev) => {
      console.log({ prev });

      if (prev) {
        return {
          ...prev,
          howToWin,
        };
      }

      return prev;
    });
  };

  // console.log("reward", reward);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-3xl font-bold">ADD SprintDetails</p>
      </div>

      <p className="text-lg">GameName:{getGameNameReadable(gameId)}</p>

      <div className="pt-8">
        <UppyWidgetContainer
          media={sprintDetail?.mainImage ? [sprintDetail.mainImage] : []}
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
        <TextField
          style={{ width: "100%" }}
          placeholder={"Sprint Id"}
          label={"sprintId"}
          variant="outlined"
          onChange={(val) =>
            setSprintDetail((p) => {
              if (p) {
                return {
                  ...p,
                  sprintId: val.target.value,
                };
              }
            })
          }
          value={sprintDetail?.sprintId || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Description"}
          label={"description"}
          variant="outlined"
          onChange={(val) =>
            setSprintDetail((p) => {
              if (p) {
                return {
                  ...p,
                  description: val.target.value,
                };
              }
            })
          }
          value={sprintDetail?.description || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <p className="pt-8">How to win</p>
      <HowToWinAdder
        onUpdateWin={onUpdateHowToWin}
        howToWin={sprintDetail?.howToWin}
        uid={uid}
      />
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

export default AddBenefitTemplate;
