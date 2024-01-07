import { DrawerElement } from "./Drawer";

export type pinValues =
  | "profile"
  | "registrations"
  | "current-event"
  | "all-events";

export type formLabelValues =
  | pinValues
  | "marketing-info-add"
  | "name"
  | "eventType"
  | "program"
  | "eventKey"
  | "aboutCreator"
  | "description"
  | "media"
  | "cost"
  | "current-event"
  | "your-name"
  | "your-handle"
  | "social-media-links"
  | "profile-img"
  | "cover-video"
  | "faq"
  | "about-me"
  | "joinURL"
  | "whoIsItFor"
  | "courseGoal"
  | "programDetails"
  | "cohorts"
  | "cohortSize"
  | "googleTitle"
  | "googleDescription"
  | "icon"
  | "googleSEOImg"
  | "favIconImg"
  // | "startDate"
  | "cohortStarts"
  | "registerBy"
  | "schedule" // dep
  | "cohortJoinURL"
  | "add-members"
  | "thumbnail"
  | "create-event";

// export const pinnedDrawer: DrawerElement[] = [
//   {
//     text: "Registrations",
//     value: "registrations",
//     style: "list",
//     bulletLevel: 1,
//   },
//   {
//     text: "Profile",
//     value: "profile",
//     style: "list",
//     bulletLevel: 1,
//   },
//   {
//     text: "All events",
//     value: "all-events",
//     style: "list",
//     bulletLevel: 1,
//   },
// ];

export const profileDrawer2: DrawerElement[] = [
  // profile
  {
    text: "Cover video",
    value: "cover-video",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Name",
    value: "your-name",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Your handle",
    value: "your-handle",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Profile image",
    value: "profile-img",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Social links",
    value: "social-media-links",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "About me",
    value: "about-me",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
];

export const eventDrawer2: DrawerElement[] = [
  {
    text: "Current event",
    value: "current-event",
    bulletLevel: 2,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Program type",
    value: "eventType",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Name",
    value: "name",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Program",
    value: "program",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },

  {
    text: "Cohorts",
    value: "cohorts",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },

  {
    text: "Cohort Size",
    bulletLevel: 4,
    value: "cohortSize",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },
  {
    text: "Cohort starts",
    bulletLevel: 4,
    value: "cohortStarts",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },
  {
    text: "Deadline",
    bulletLevel: 4,
    value: "registerBy",
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Meeting URL",
    bulletLevel: 4,
    value: "cohortJoinURL",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },

  {
    text: "URL",
    value: "eventKey",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Course Goal",
    value: "courseGoal",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "goal",
  },
  {
    text: "Prizes / Rewards",
    value: "programDetails",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "goal",
  },
  {
    text: "Cost",
    value: "cost",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Description",
    value: "description",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "description",
  },
  {
    text: "Who is it for?",
    value: "whoIsItFor",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "whoIsItFor",
  },
  {
    text: "Media",
    value: "media",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  // {
  //   text: "Schedule",
  //   value: "schedule",
  //   bulletLevel: 3,
  //   style: "list",
  //   visibleKey: "current-event",
  // },
  {
    text: "Welcome message",
    value: "joinURL",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "FAQ",
    value: "faq",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "faq",
  },

  {
    text: "SEO Title",
    bulletLevel: 3,
    value: "googleTitle",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "SEO Description",
    bulletLevel: 3,
    value: "googleDescription",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "SEO Image",
    bulletLevel: 3,
    value: "googleSEOImg",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "Site Icon",
    bulletLevel: 3,
    value: "favIconImg",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
];

export const profileDrawer: DrawerElement[] = [
  // profile
  {
    text: "Cover video",
    value: "cover-video",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Name",
    value: "your-name",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Your handle",
    value: "your-handle",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Profile image",
    value: "profile-img",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "Social links",
    value: "social-media-links",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
  {
    text: "About me",
    value: "about-me",
    bulletLevel: 3,
    style: "list",
    visibleKey: "profile",
  },
];

export const eventDrawer: DrawerElement[] = [
  {
    text: "Current event",
    value: "current-event",
    bulletLevel: 2,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Program type",
    value: "eventType",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Name",
    value: "name",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Program",
    value: "program",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },

  {
    text: "Cohorts",
    value: "cohorts",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },

  {
    text: "Cohort Size",
    bulletLevel: 4,
    value: "cohortSize",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },
  {
    text: "Cohort starts",
    bulletLevel: 4,
    value: "cohortStarts",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },
  {
    text: "Deadline",
    bulletLevel: 4,
    value: "registerBy",
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Meeting URL",
    bulletLevel: 4,
    value: "cohortJoinURL",
    style: "list",
    visibleKey: "current-event",
    divId: "cohorts",
  },

  {
    text: "URL",
    value: "eventKey",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "name",
  },
  {
    text: "Course Goal",
    value: "courseGoal",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "goal",
  },
  {
    text: "Prizes / Rewards",
    value: "programDetails",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "goal",
  },
  {
    text: "Cost",
    value: "cost",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Description",
    value: "description",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "description",
  },
  {
    text: "Who is it for?",
    value: "whoIsItFor",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "whoIsItFor",
  },
  {
    text: "Media",
    value: "media",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "Thumbnail",
    value: "thumbnail",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "thumbnail",
  },
  // {
  //   text: "Schedule",
  //   value: "schedule",
  //   bulletLevel: 3,
  //   style: "list",
  //   visibleKey: "current-event",
  // },
  {
    text: "Welcome message",
    value: "joinURL",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "media",
  },
  {
    text: "FAQ",
    value: "faq",
    bulletLevel: 3,
    style: "list",
    visibleKey: "current-event",
    divId: "faq",
  },

  {
    text: "SEO Title",
    bulletLevel: 3,
    value: "googleTitle",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "SEO Description",
    bulletLevel: 3,
    value: "googleDescription",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "SEO Image",
    bulletLevel: 3,
    value: "googleSEOImg",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
  {
    text: "Site Icon",
    bulletLevel: 3,
    value: "favIconImg",
    style: "list",
    visibleKey: "current-event",
    divId: "",
  },
];

export const masterDrawer2: DrawerElement[] = [
  // {
  //   text: "Registrations",
  //   value: "registrations",
  //   style: "list",
  //   bulletLevel: 1,
  // },
  // {
  //   text: "Profile",
  //   value: "profile",
  //   style: "list",
  //   bulletLevel: 1,
  //   subElements: profileDrawer,
  // },
  {
    text: "All events",
    value: "all-events",
    style: "list",
    bulletLevel: 1,
    subElements: eventDrawer,
  },
];

export const masterDrawer: DrawerElement[] = [
  {
    text: "Registrations",
    value: "registrations",
    style: "list",
    bulletLevel: 1,
    subElements: [],
  },
  {
    text: "Profile",
    value: "profile",
    style: "list",
    bulletLevel: 1,
    subElements: profileDrawer,
  },
  {
    text: "All events",
    value: "all-events",
    style: "list",
    bulletLevel: 1,
    subElements: eventDrawer,
  },
];
