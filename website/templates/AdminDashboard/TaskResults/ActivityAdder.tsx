import PlayerSearch from "../FilterModal/PlayerSearch";
import TaskSearch from "../FilterModal/TaskModal";
import { useState } from "react";
import Button from "@components/button";
import { Task } from "@models/Tasks/Task";
import {
  createVideoPost,
  getTeamCaptainIdFromParticipating,
  getTeamIdFromParticipating,
  saveNewPostWithActivityWithTaskParams,
} from "./utils";
import { UserInterface } from "@models/User/User";
import { TextField } from "@mui/material";
import { format } from "date-fns";
// import LeaderboardRefreshButton from "@templates/AdminGames/LeaderboardRefreshButton";

interface Props {
  gameId?: string;
  onRefresh: () => void;
}

const ActivityAdder: React.FC<Props> = ({ gameId, onRefresh }) => {
  const [fp, setFP] = useState<number>(0);
  const [tkDay, setTaskDay] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<UserInterface>();
  const [selectedTask, setSelectedTask] = useState<Task>();

  const onPlayerSelect = (newP?: UserInterface) => setSelectedUser(newP);
  const onTaskSelect = (newT?: Task) => setSelectedTask(newT);

  const onSaveActivity = async () => {
    if (gameId && selectedUser && selectedTask) {
      const leaderId = getTeamCaptainIdFromParticipating(
        selectedUser?.participatingInGameWithTeam,
        gameId
      );
      const teamId = getTeamIdFromParticipating(
        selectedUser?.participatingInGameWithTeam,
        gameId
      );

      const post = createVideoPost(
        [],
        selectedUser.uid,
        gameId,
        leaderId,
        teamId,
        selectedTask?.id,
        format(new Date(), "yyyy-MM-dd"),
        selectedUser?.name,
        selectedUser?.profileImage
      );

      try {
        // console.log(post);
        // console.log(selectedTask);
        // console.log(teamId);
        // console.log(gameId);
        // console.log(fp);
        // console.log(tkDay);

        await saveNewPostWithActivityWithTaskParams(
          teamId,
          post,
          gameId,
          selectedTask.id,
          tkDay,
          fp,
          selectedTask.name,
          selectedTask.thumbnails,
          undefined,
          undefined
        );
        setSelectedUser(undefined);
        setSelectedTask(undefined);
        setFP(0);
        setTaskDay(0);
      } catch (error) {
        console.log("e", error);
      }

      //   onRefresh();
    }

    // console.log("u", selectedUser);
    // console.log("selectedTasku", selectedTask);
    // console.log("fp", fp);
  };

  return (
    <div className="flex flex-wrap">
      <div className="bg-red-50 px-2">
        <PlayerSearch
          q={{ player: selectedUser?.uid ? selectedUser.uid : "" }}
          onClose={() => {}}
          initialPlayerName=""
          onSelectOverride={onPlayerSelect}
        />
      </div>

      <div className="px-4 bg-gray-50">
        <TaskSearch
          q={{ taskId: selectedTask?.id ? selectedTask.id : "" }}
          onClose={() => {}}
          taskId={selectedTask?.id ? selectedTask.id : ""}
          onOverrideSelect={onTaskSelect}
        />
      </div>

      <div className="px-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Set Day of task"}
          label={"Task Day"}
          variant="outlined"
          onChange={(val) => setTaskDay(parseInt(val.target.value))}
          value={tkDay}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="px-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"FitPoints you will earn with this activity"}
          label={"FitPoints"}
          variant="outlined"
          onChange={(val) => setFP(parseInt(val.target.value))}
          value={fp}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="flex" onClick={onSaveActivity}>
        <Button appearance="contained">Add Activity</Button>
      </div>

      <div className="flex pl-4" onClick={onRefresh}>
        <Button appearance="contained">Reload results</Button>
      </div>
    </div>
  );
};

export default ActivityAdder;
