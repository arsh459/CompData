import { realtimeDBRoom } from "../../../models/Room/Room";

export const backendRoomMain = async (
  uid: string,
  now: realtimeDBRoom,
  pre?: realtimeDBRoom,
) => {
  console.log("room status", uid, now.status);

  // update realtime db status to backend-running

  // run same code as on app - makeSSECall.

  // const tools[] = makeGPTCall()
  // for (const tool of tools){
  // if (tool === 'get_diet_meal'){
  // const funcToRun = toolsObj[tool];
  // get_diet_meal_wrapper(userObj, ...args)
  //
  // }
  //
  //}

  // update realtime db status to backend-completed
  // if error - update realtime db status to backend-error

  // increment unread messages in userInterface

  // push notification to user that message is ready
  // check if room is active again.
};
