import { UserInterface } from "@models/User/User";

export interface UserContextInterface {
  profile?: UserInterface;
  selectedGameId?: string;
  setSelectedGameId: (val?: string) => void;
}
