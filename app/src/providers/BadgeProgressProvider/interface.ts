import { BadgeSummaryPerf } from "@hooks/program/useBadgeProgress";
import { BadgeProgress } from "@models/Prizes/Prizes";

export type BadgeProgressContextProps = {
  children: React.ReactNode;
  badgeId?: string;
  // nutritionBadgeId?: string;
};

export interface BadgeProgressContextInterface {
  badgeProgress?: BadgeProgress | undefined;
  badgeId?: string;
  // nutritionBadgeId?: string;
  summaryProgress?: BadgeSummaryPerf | undefined;

  // nutritionProgress?: BadgeProgress | undefined;
  // nutritionSummaryProgress?: BadgeSummaryPerf | undefined;
}
