// import { getLastMessages } from "../../../models/Room/Methods";
import { Room } from "../../../models/Room/Room";
import { gptConfig } from "../../../models/Room/constants";

export const getRoomContextLength = async (room: Room) => {
  // const {} = await getLastMessages(uid, room.id)

  // total tokens in message
  const tokensUsed =
    room.usage && room.usage.total_tokens ? room.usage.total_tokens : 0;

  // const newTokens = newMessage.content.split(" ");
  const estimatedTokenLength = tokensUsed + gptConfig.max_tokens; // newTokens.length;

  return estimatedTokenLength;
};

export const getResponseLimit = (
  contextUsed: number,
  estimatedLength: number,
): number => {
  const maxTokensInResponse = gptConfig.max_tokens;
  const limitLeft = contextUsed - estimatedLength;

  if (limitLeft >= maxTokensInResponse) {
    return maxTokensInResponse;
  } else if (limitLeft < maxTokensInResponse && limitLeft > 40) {
    return 40;
  }
  return 0;
};
