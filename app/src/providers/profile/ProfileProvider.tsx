import { createContext, useContext, useState } from "react";

import { useUserV2 } from "@hooks/auth/useUserV2";
import { UserContextInterface } from "./interface";
import { ProfileContextProps } from "@providers/auth/interface";

const ProfileContext = createContext<UserContextInterface | undefined>(
  undefined
);

function ProfileProvider({ children, userId }: ProfileContextProps) {
  const { user } = useUserV2(userId);
  const [selectedGameId, setSelectedGameId] = useState<string | undefined>();

  const value = { profile: user, selectedGameId, setSelectedGameId };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

function useProfileContext() {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }

  return context;
}

export { ProfileProvider, useProfileContext };
