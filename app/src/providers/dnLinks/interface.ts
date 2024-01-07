import { Dispatch, SetStateAction } from "react";
import { DNParseResult } from "./hooks/handleLink";

export interface DNInterfce {
  dnResult: DNParseResult | undefined;
  setDNResult: Dispatch<SetStateAction<DNParseResult | undefined>>;
}

export interface DNContextProps {
  children: React.ReactNode;
}
