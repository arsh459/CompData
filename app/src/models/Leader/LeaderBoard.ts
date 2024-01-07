import { MediaInterface } from "@models/Media/MediaInterface";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { TerraUser } from "@models/Terra/TerraUser";
import { fitnessGoalObj, genderType } from "@models/User/User";

export interface LandingLeaderboard {
  id: string;
  wins: number;
  teamWins: number;
  totalCalories: number;
  totalFitPoints: number;
  userLevel: number;
  rank: number;
  text: string;
  progress: number;
  media: CloudinaryMedia[];
  name: string;
}

export interface LeaderBoard {
  uid: string;
  totalStoreVisits: number;
  activeCustomers: number;
  // old kpis
  discoverySales?: number;
  storeSales?: number;
  totalEarnings?: number;
  // earning kpis
  openRoyaltyRequests?: number;
  openRoyaltyValue?: number;
  closedRoyaltyValue?: number;
  closedRoyaltyRequests?: number;
  openStoreBookingRequests?: number;
  openStoreBookingValue?: number;
  closedBookingValue?: number;
  closedBookingRequests?: number;
  // views
  numViews?: number;
  numViews2Weeks?: number;
  numViews1Month?: number;
  //Leads
  numLeads?: number;
  numLeads2Weeks?: number;
  numLeads1Month?: number;
  // earnings
  earnings2Weeks?: number;
  earnings1Month?: number;
  allEarnings?: number;
  totalRevenue?: number; // dep
  totalEarning?: number; // dep
  discoveries?: number;
  visitors?: number;
  tripsPlanned?: number;
  allFollowers?: number;

  collections?: number;
  trips?: number;

  coverMedia?: MediaInterface[];

  collectionListings?: number;
  // user params
  imageURI?: string;
  name?: string;
  tagline?: string;
  verified?: boolean;
  bio?: string;
  knownFor?: string;
  expertIn?: string;
  inviteURL?: string;
  coverImages?: string[];
  instagramHandle?: string;
  rank?: number;
  live?: boolean;

  // store params
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedIn?: string;
  reddit?: string;
  personalLink?: string;

  featuredContent?: {
    style: "horizontal" | "vertical" | "grid";
    // content: FeaturedContent[];
  };
  planWithMeMedia?: MediaInterface[]; // media for plan with me

  userKey?: string;
  profileImage?: CloudinaryMedia | AWSMedia;
  coverCloudinary?: CloudinaryMedia[];
  // social media
  facebookProfile?: string;
  youtubeLink?: string;
  externalLink?: string;
  instagramLink?: string;
  linkedInLink?: string;

  socialboat?: boolean;
  sbStudents?: number;
  sbEvents?: number;

  favIconImg?: CloudinaryMedia;
  manualRank?: number;

  enrolledCohorts?: string[];
  enrolledCommunities?: string[];
  enrolledEvents?: string[];

  terraUser?: TerraUser;

  height?: number;
  weight?: number;
  gender?: genderType;
  age?: number;
  fitnessGoals?: fitnessGoalObj;
  fitnessGoalText?: string;
  phone?: string;

  totalCalories?: number;
  regularityScore?: number;
  numActivities?: number;
  userLevel?: userLevel;
  userLevelV2?: number;
  totalFitPointsV2?: number;
  progress?: number;
  progressV2?: number;
  wins?: number;
  teamWins?: number;
  testimonial?: string;
}

export type userLevel = "rookie" | "enthusiast" | "athlete" | "champion";
