import { useUserContext } from "@providers/user/UserProvider";

import { useEffect, useState } from "react";
import { makeUserPromptResponse } from "./utils";
import { useLastChatRoom } from "./useLastChatRoom";

export const useSakhiUserPrompts = () => {
  const { user } = useUserContext();
  const { lastRoom } = useLastChatRoom(user?.uid);

  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    if (lastRoom?.roomPromptsForUser) {
      setPrompts(lastRoom.roomPromptsForUser);
    } else if (user?.gptPrompts) {
      setPrompts(user.gptPrompts);
    } else if (user?.uid) {
      makeUserPromptResponse(user?.uid);
    }

    // if (user?.uid && (!user?.gptPrompts || user.gptPrompts.length === 0)) {
    //   makeUserPromptResponse(user?.uid);
    // }
  }, [user?.gptPrompts, lastRoom?.roomPromptsForUser]);

  return {
    prompts,
    id: lastRoom?.id,
  };
};
