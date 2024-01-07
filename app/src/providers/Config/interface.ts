import { AppConfiguration } from "@models/config/config";

export type ConfigContextProps = {
  children: React.ReactNode;
};

export interface ConfigContextInterface {
  config?: AppConfiguration;
}
