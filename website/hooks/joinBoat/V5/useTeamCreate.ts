import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { UserInterface } from "@models/User/User";
import { useState } from "react";
import { createNewTeam, userHasTeamV2 } from "./teamUtils";
import { useParentEvent } from "@hooks/community/v2/useParentEvent";
import { addUserToTeam, getTeam } from "@models/User/createUtils";

export const useTeamCreate = (user?: UserInterface, toAddTeamId?: string) => {
  const [teamName, setTeamName] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");
  const { parentEvent: game } = useParentEvent(TEAM_ALPHABET_GAME);

  const dbTeamId = userHasTeamV2(
    user?.participatingInGameWithTeam,
    game ? game.id : ""
  );

  // const dbTeamObj = useParentEvent(dbTeamId);

  const onTeamCreate = async () => {
    if (user && game && !dbTeamId) {
      const newTeam = await createNewTeam(
        game,
        user,
        "",
        teamName,
        user.name,
        user.profileImage,
        user.uid
      );

      setTeamId(newTeam.id);
    }
  };

  const onTeamAdd = async () => {
    if (user && game && !dbTeamId && toAddTeamId) {
      const team = await getTeam(toAddTeamId);

      if (team) {
        await addUserToTeam(
          user.uid,
          team?.ownerUID,
          TEAM_ALPHABET_GAME,
          toAddTeamId,
          user,
          team
        );
      }
    }

    console.log("end");
  };

  return {
    teamName,
    setTeamName,
    onTeamCreate,
    teamId,
    dbTeamId,
    onTeamAdd,
  };
};
