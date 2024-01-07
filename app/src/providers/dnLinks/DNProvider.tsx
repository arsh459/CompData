import { createContext, useContext, useState } from "react";
import { DNParseResult } from "./hooks/handleLink";
import { useDynamicLinks } from "./hooks/useDynamicLinks";
import { useBackgroundLinks } from "./hooks/useInitialLink";
import { DNContextProps, DNInterfce } from "./interface";

const DNContext = createContext<DNInterfce | undefined>(undefined);

function DNProvider({ children }: DNContextProps) {
  const [dnResult, setDNResult] = useState<DNParseResult>();

  useDynamicLinks(setDNResult);
  useBackgroundLinks(setDNResult);

  const value = {
    dnResult: dnResult,
    setDNResult,
  };

  return <DNContext.Provider value={value}>{children}</DNContext.Provider>;
}

function useDNContext() {
  const context = useContext(DNContext);

  if (context === undefined) {
    throw new Error("useDNContext called incorrectly");
  }

  return context;
}

export { DNProvider, useDNContext };
