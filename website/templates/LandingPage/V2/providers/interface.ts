export interface HeroDetail {
  prefix: string;
  primary: string;
  suffix: string;
  nextLine: string;
}

export interface SlugData {
  heroDetails: HeroDetail;
}

export type LandingDataContextProps = {
  children: React.ReactNode;
  slug: "women" | "base";
};

export interface LandingDataContextInterface {
  data: SlugData;
  slug: "women" | "base";
}
