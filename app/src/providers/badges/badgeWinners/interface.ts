import { badgeTypes } from "@models/Prizes/Prizes";
import { UserInterface } from "@models/User/User";

export type BadgeWinnersContextProps = {
  children: React.ReactNode;
  badgeId?: string;
  badgeType?: badgeTypes;
};

export interface BadgeWinnersContextInterface {
  users: UserInterface[];
  fetched: boolean;
  onNext: () => void;
}
