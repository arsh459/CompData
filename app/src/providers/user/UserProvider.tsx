import { createContext, useContext } from "react";
import { AuthProviderProps } from "@providers/auth/interface";

import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { UserContextInterface } from "./interface";
import { useUserLog } from "./hooks/useUserLog";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

function UserProvider({ children }: AuthProviderProps) {
  const authState = useAuthContext();

  const { user } = useUserV2(authState.state.uid);
  useUserLog(user);

  // user property update
  // const { user } = useUserV2("wPKaomDuk4eoKHIIE7ArFPyynhU2");
  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserProvider");
  }

  return context;
}

export { UserProvider, useUserContext };
