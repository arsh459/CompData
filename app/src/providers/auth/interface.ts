/** Types */
export type authStates =
  | "PENDING"
  | "FAILED"
  // | "AUTHENTICATED"
  | "SUCCESS"
  | "AUTH_REQUEST"
  | "ON_BOARDING"
  | "TEAM_SELECT";
export type AuthProviderProps = { children: React.ReactNode };
export type ActionTypes =
  | "AUTHENTICATE"
  | "SIGN_OUT"
  | "SIGN_IN_REQUEST"
  | "TOGGLE_AUTH_STATE"
  | "CHANGE_GAME_ID"
  | "SKIP";
export type actionType = {
  type: ActionTypes;
  uid?: string;
  gameId?: string;
  status?: authStates;
  // navToScreen?: RouteKeys;
};
export interface AuthState {
  uid?: string;
  status: authStates;
  gameId: string;

  // navToScreen?: RouteKeys;
}
export interface AuthContextInterface {
  state: AuthState;
  signOut: () => void;
  deleteUser: () => void;
  signInRequest: (gameId?: string) => void;
  onChangeGameId: (gameId: string) => void;
  onSkip: () => void;
  onToggleStatus: (status: authStates) => void;
  today: string;
  todayUnix: number;
  // netinfoState: NetInfoState;
}
/** Types */
export type ProfileContextProps = {
  children: React.ReactNode;
  userId: string;
};
