import { db } from "@config/firebase";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { getTaskById } from "@models/Tasks/createUtils";
import { UserInterface } from "@models/User/User";
import {
  getTeamCaptainIdFromParticipating,
  getTeamIdFromParticipating,
  createVideoPost,
  saveNewPostWithActivityWithTaskParamsV2,
} from "@templates/AdminDashboard/TaskResults/utils";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";

const getUserById = async (uid: string) => {
  const docObj = await getDoc(doc(db, "users", uid));
  if (docObj.data()) {
    return docObj.data() as UserInterface;
  }

  return undefined;
};

export const createActivityForTask = async (uid: string, taskId: string) => {
  const user = await getUserById(uid);

  const leaderId = getTeamCaptainIdFromParticipating(
    user?.participatingInGameWithTeam,
    TEAM_ALPHABET_GAME
  );
  const teamId = getTeamIdFromParticipating(
    user?.participatingInGameWithTeam,
    TEAM_ALPHABET_GAME
  );

  //   console.log("leaderId", leaderId);
  //   console.log("teamId", teamId);

  const post = createVideoPost(
    [],
    uid,
    TEAM_ALPHABET_GAME,
    leaderId,
    teamId,
    taskId,
    format(new Date(), "yyyy-MM-dd"),
    user?.name,
    user?.profileImage
    // antSt.id
    // true
  );

  //   console.log("post", post.id);

  const task = await getTaskById(taskId);

  if (task) {
    const act = await saveNewPostWithActivityWithTaskParamsV2(
      teamId ? teamId : TEAM_ALPHABET_GAME,
      post,
      TEAM_ALPHABET_GAME,
      taskId,
      0,
      task.name,
      task?.thumbnails,
      undefined,
      undefined,
      "task",
      0,
      "REVIEWED"
    );

    return act;
  }
};
