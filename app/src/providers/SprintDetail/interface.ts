import { SprintDetail } from "@models/SprintDetails/SprintDetail";

export type SprintDetailContextProps = {
  children: React.ReactNode;
  sprintId?: string;
};

export interface SprintDetailContextInterface {
  sprintDetail?: SprintDetail;
}
