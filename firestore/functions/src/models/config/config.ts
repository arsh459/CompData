import { servingType } from "../Task/Task";
import { AchievementPathDataItemTypes, AutoRoomIDs } from "../User/User";

export interface NutritionMetric {
  unit: "gram" | "ml";
  value: number;
}

export interface AppConfiguration {
  dailyStepsFrom?: number;

  popularSearches: string[];
  freeDays?: number;
  subIdToEntitlementId?: {
    [subscriptionId: string]: string; // entitlementId
  };

  sakhiAIPrompt?: string;
  apiKey: string;

  kpiAwardIds?: Partial<Record<AchievementPathDataItemTypes, string>>;

  // insights prompts
  sakhiInsights?: { [key in AutoRoomIDs]: string };
  nutritionMetrics: Record<servingType, NutritionMetric>;
}
