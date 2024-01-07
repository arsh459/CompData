import { createContext, useContext } from "react";
import { AntStreamContextInterface, AntStreamContextProps } from "./interface";
import { useNewAntStream } from "./hooks/useNewAntStream";

const AntStreamContext = createContext<AntStreamContextInterface | undefined>(
  undefined
);

function AntStreamProvider({ children }: AntStreamContextProps) {
  const { antStream } = useNewAntStream();

  const value = {
    antStream,
  };

  return (
    <AntStreamContext.Provider value={value}>
      {children}
    </AntStreamContext.Provider>
  );
}

function useAntStreamContext() {
  const context = useContext(AntStreamContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameProvider");
  }

  return context;
}

export { AntStreamProvider, useAntStreamContext };
