import auth from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  AuthContextInterface,
  AuthProviderProps,
  authStates,
} from "@providers/auth/interface";
import { authReducer } from "./reducers";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBuildDetails } from "@hooks/auth/useBuildDetailts";
import { useTodayDate } from "@hooks/steps/useTodayDate";
import { useTimezone } from "@hooks/auth/useTimezone";
import { useAdAtt } from "@hooks/fb/useAdAtt";
import { useUpdateUserStore } from "@hooks/auth/useUpdateUserStore";
// import { useInternetState } from "./useInternetStatus";

export const SOCIALBOAT_GAME = TEAM_ALPHABET_GAME;

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    status: "PENDING",
    gameId: SOCIALBOAT_GAME,
  });

  // to attribute user
  useAdAtt();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "AUTHENTICATE",
          uid: user.uid,
        });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    });
  }, []);

  const signOut = async () => {
    await auth().signOut();
    dispatch({ type: "SIGN_OUT" });
  };

  const deleteUser = async () => {
    dispatch({ type: "SIGN_OUT" });
  };

  const onSkip = async () => {
    dispatch({ type: "SKIP" });
  };

  const signInRequest = (gameId?: string) => {
    dispatch({
      type: "SIGN_IN_REQUEST",
      gameId: gameId,
    });
  };

  const onToggleStatus = (status: authStates) => {
    dispatch({
      type: "TOGGLE_AUTH_STATE",
      status,
    });
  };

  const onChangeGameId = (gameId: string) => {
    dispatch({
      type: "CHANGE_GAME_ID",
      gameId,
    });
  };

  useUpdateUserStore(state.uid);
  useBuildDetails(state.uid);
  useTimezone(state.uid);
  const { date, dateUnix } = useTodayDate();

  const value = {
    state,
    signOut,
    signInRequest,
    onSkip,
    onToggleStatus,
    onChangeGameId,
    deleteUser,
    today: date,
    todayUnix: dateUnix,
    // netinfoState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext };
