import { navLevels } from "@hooks/community/useCommunityParams";

export interface NavElement {
  text: string;
  key: navLevels;
  link?: string;
  onlyAdmin?: boolean;
}

export const navElements_main: NavElement[] = [
  {
    key: "creator",
    text: "my story",
  },
  {
    key: "program",
    text: "programs",
  },
  // {
  //   key: "me",
  //   text: "progress",
  // },
  {
    key: "members",
    text: "members",
    // onlyAdmin: true,
  },
  {
    key: "edit-profile",
    text: "edit profile",
    link: "/onboard",
    onlyAdmin: true,
  },
  {
    key: "edit-events",
    text: "edit events",
    link: "/dashboard",
    onlyAdmin: true,
  },
  {
    key: "discover",
    text: "discover",
    onlyAdmin: true,
  },
];

export const navElements_display: NavElement[] = [
  {
    key: "creator",
    text: "my story",
  },
  {
    key: "program",
    text: "programs",
  },
  // {
  //   key: "me",
  //   text: "progress",
  // },
  {
    key: "none",
    text: "members",
  },
  {
    key: "none",
    text: "lounge",
  },
  {
    key: "none",
    text: "my progress",
  },
];
