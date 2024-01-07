import { Badge } from "@models/Prizes/Prizes";

export type BadgeContextProps = {
  children: React.ReactNode;
  badgeId: string;
};

export interface BadgeContextInterface {
  badge?: Badge;
  badgeId: string;
  fetched?: boolean;
}
