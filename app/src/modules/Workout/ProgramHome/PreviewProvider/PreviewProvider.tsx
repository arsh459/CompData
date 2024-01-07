import { createContext, useContext } from "react";
import {
  PreviewTaskStore,
  usePreviewTaskStore,
} from "./hooks/usePreviewTaskStore";

const PreviewContext = createContext<PreviewTaskStore | undefined>(undefined);

function PreviewProvider({ children }: { children: React.ReactNode }) {
  const { target, setTarget } = usePreviewTaskStore();

  const value = {
    target,
    setTarget,
  };

  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
}

function usePreviewContext() {
  const context = useContext(PreviewContext);

  if (context === undefined) {
    throw new Error("usePreviewContext must be used within PreviewProvider");
  }

  return context;
}

export { PreviewProvider, usePreviewContext };
