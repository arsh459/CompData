import { AuthProviderProps } from "@providers/auth/interface";
import { createContext, useContext } from "react";
import { usePhoneAuth } from "../hooks/usePhoneAuth";
import { PhoneAuthContextInterface } from "./interface";

const PhoneAuthContext = createContext<PhoneAuthContextInterface | undefined>(
  undefined
);

function PhoneAuthProvider({ children }: AuthProviderProps) {
  const state = usePhoneAuth();

  return (
    <PhoneAuthContext.Provider value={state}>
      {children}
    </PhoneAuthContext.Provider>
  );
}

function usePhoneAuthContext() {
  const context = useContext(PhoneAuthContext);

  if (!context) {
    throw new Error("usePhoneAuthContext called outside PhoneAuthProvider");
  }

  return context;
}

export { PhoneAuthProvider, usePhoneAuthContext };
