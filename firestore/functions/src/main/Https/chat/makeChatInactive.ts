import { Room } from "../../../models/Room/Room";
import { inactivateRoom } from "./saveResponse";

export const makeChatInactive = async (uid: string, room: Room) => {
  await inactivateRoom(uid, room);
};
