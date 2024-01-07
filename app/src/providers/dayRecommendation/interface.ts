import { dayRecommendation, dayRecommendationType } from "@models/User/User";

export type DayRecommendationContextProps = {
  children: React.ReactNode;
  date: string;
  badgeId?: string;
  type: dayRecommendationType;
  dontFetch?: boolean;
};

export interface DayRecommendationContextInterface {
  recomendation?: dayRecommendation;
  error: string;
  fetch: boolean;
}
