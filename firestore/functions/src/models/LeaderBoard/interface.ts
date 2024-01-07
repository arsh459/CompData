import { MediaInterface } from "../Collection/Collection";
import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import { TerraUser } from "../Terra/TerraUser";
import { fitnessGoalObj, genderType, userLevel } from "../User/User";

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

  coverMedia?: MediaInterface[];

  rank?: number;
  live?: boolean;

  userKey?: string;
  coverCloudinary?: CloudinaryMedia[];
  profileImage?: CloudinaryMedia;

  facebookProfile?: string;
  youtubeLink?: string;
  externalLink?: string;
  instagramLink?: string;
  linkedInLink?: string;

  socialBoat?: boolean;
  sbStudents?: number;
  sbEvents?: number;

  favIcon?: string;
  favIconImg?: CloudinaryMedia;

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
  totalCalories?: number;
  regularityScore?: number;
  numActivities?: number;
  userLevel?: userLevel;
  userLevelV2?: number;
  progressV2?: number;
  totalFitPointsV2?: number;
  wins?: number;
  teamWins?: number;
  testimonial?: string;

  progress?: number;

  phone?: string;
}
