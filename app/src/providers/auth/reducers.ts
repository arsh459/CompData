import { actionType, AuthState } from "./interface";

export const authReducer = (
  state: AuthState,
  action: actionType
): AuthState => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        status: "SUCCESS",
        uid: action.uid,
      };
    case "TOGGLE_AUTH_STATE":
      return {
        ...state,
        status: action.status ? action.status : state.status,
      };
    case "CHANGE_GAME_ID":
      return {
        ...state,
        gameId: action.gameId ? action.gameId : state.gameId,
      };
    case "SIGN_OUT":
      return {
        ...state,
        status: "FAILED",
        uid: undefined,
      };
    case "SIGN_IN_REQUEST":
      return {
        ...state,
        status: "AUTH_REQUEST",
        gameId: action.gameId ? action.gameId : state.gameId,
        // navToScreen: action.navToScreen,
      };
    case "SKIP":
      return {
        ...state,
        status: "PENDING",
      };
    default:
      throw new Error(`Unhandled ActionType:${action.type} in authReducer`);
  }
};
