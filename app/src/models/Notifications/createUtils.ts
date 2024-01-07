import { TeamRequest } from "./interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createJoinRequest = (
  requestedTo: string,
  requestedBy: string,
  teamId: string
): TeamRequest => {
  return {
    id: uuidv4(),
    teamId: teamId,
    createdOn: Date.now(),
    requestedBy,
    requestedTo,
    state: "PENDING",
  };
};
