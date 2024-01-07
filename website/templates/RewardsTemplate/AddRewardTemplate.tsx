// import Button from "@components/button";
import { useRewardById } from "@hooks/messages/useRewardById";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { TextField } from "@mui/material";
import PlayerSearch from "@templates/AdminDashboard/FilterModal/PlayerSearch";
// import TeamsModal from "@templates/AdminDashboard/FilterModal/TeamsModal";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { saveReminder } from "@models/Reminder/createUtils";
import { useRouter } from "next/router";
import Button from "@components/button";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { UserInterface } from "@models/User/User";

// import { Link } from "@mui/material";

interface Props {
  gameId: string;
  rewardId: string;
}

const AddRewardsTemplate: React.FC<Props> = ({ gameId, rewardId }) => {
  const { reward, setReward } = useRewardById(rewardId, gameId, true, "reward");
  const author = useLeaderboard(reward?.authorId);
  const coach = useLeaderboard(reward?.communityId);

  const router = useRouter();

  const onSave = async () => {
    if (reward) {
      await saveReminder(reward);
      router.back();
    }
  };

  // console.log("reward", reward);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-3xl font-bold">ADD REWARD</p>
      </div>

      <p className="text-lg">{getGameNameReadable(reward?.parentId)}</p>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Name of position "}
          label={"Position name"}
          variant="outlined"
          onChange={(val) =>
            setReward((p) => {
              if (p) {
                return {
                  ...p,
                  positionName: val.target.value,
                };
              }
            })
          }
          value={reward?.positionName}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Name of reward"}
          label={"Reward name"}
          variant="outlined"
          onChange={(val) =>
            setReward((p) => {
              if (p) {
                return {
                  ...p,
                  rewardName: val.target.value,
                };
              }
            })
          }
          value={reward?.rewardName}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"PostId "}
          label={"Add Post ID"}
          variant="outlined"
          onChange={(val) =>
            setReward((p) => {
              if (p) {
                return {
                  ...p,
                  postId: val.target.value,
                };
              }
            })
          }
          value={reward?.postId}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mt-8 border-2 bg-gray-100">
        <p>Add Player</p>
        <PlayerSearch
          onClose={() => {}}
          initialPlayerName={author.leader?.name}
          onSelectOverride={(newLead?: UserInterface) => {
            setReward((p) => {
              if (p) {
                return {
                  ...p,
                  authorId: newLead ? newLead.uid : "",
                };
              }
            });
          }}
          q={{ player: reward?.authorId ? reward?.authorId : "" }}
        />
      </div>

      <div className="mt-8 border-2 bg-gray-100">
        <p>Add Coach</p>
        <PlayerSearch
          onClose={() => {}}
          initialPlayerName={coach.leader?.name}
          onSelectOverride={(newLead?: UserInterface) => {
            setReward((p) => {
              if (p) {
                return {
                  ...p,
                  communityId: newLead ? newLead.uid : "",
                };
              }
            });
          }}
          q={{ player: reward?.communityId ? reward?.communityId : "" }}
        />
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button onClick={onSave} appearance="contained" className="">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddRewardsTemplate;
