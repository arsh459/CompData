import { Activity } from "@models/Activity/Activity";

export type ActivityContextProps = {
  children: React.ReactNode;
  id: string;
};

export interface ActivityContextInterface {
  activity?: Activity;
}
