import { fetchOne, writeOne } from "../utils/firestore/fetchOne";

export const isDuplicateInvocation = async (
  eventId: string,
  functionName: string
): Promise<boolean> => {
  const eventObj = await (await fetchOne("events", eventId)).data();
  // event exists
  if (eventObj) {
    return true;
  }

  await writeOne("events", eventId, {
    executedOn: new Date().getTime(),
    functionName: functionName,
  });
  return false;
};
