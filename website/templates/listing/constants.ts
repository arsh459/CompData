import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ScoreEntry } from "@models/ScoreEntry/ScoreEntry";

export const scoreEntriesSample: ScoreEntry[] = [
  {
    eventId: "",
    rank: 1,
    id: "11",

    scoreKey: "Pushups",
    name: "Rahul",

    location: "Delhi",
    img: {
      resource_type: "image",
      format: "gif",
      public_id: "v1635323942/pushup_wj8jfw",
      path: "v1635323942/pushup_wj8jfw.gif",
    } as CloudinaryMedia,
    updatedOnUnix: 0,
    submissions: [
      {
        createdOnUnix: 0,
        value: 45,
      },
    ],
  },
  {
    eventId: "",
    rank: 2,
    id: "12",

    scoreKey: "Pushups",
    name: "Swapnil",

    location: "Dehradun",
    img: {
      resource_type: "image",
      format: "gif",
      public_id: "v1635323971/download_wjtxoj",
      path: "v1635323971/download_wjtxoj.jpg",
    } as CloudinaryMedia,

    updatedOnUnix: 13521,
    submissions: [
      {
        createdOnUnix: 13521,
        value: 20,
      },
    ],
  },
  {
    eventId: "",
    rank: 3,
    id: "13",

    scoreKey: "Pushups",
    name: "Saurav",
    img: {
      resource_type: "image",
      format: "gif",
      public_id: "v1635324010/FittingIdenticalAtlanticspadefish-max-1mb_w79ixg",
      path: "v1635324010/FittingIdenticalAtlanticspadefish-max-1mb_w79ixg.gif",
    } as CloudinaryMedia,

    location: "London",

    updatedOnUnix: 413151,
    submissions: [
      {
        createdOnUnix: 413151,
        value: 19,
      },
    ],
  },

  {
    eventId: "",
    rank: 4,
    id: "13s",

    scoreKey: "Pushups",
    name: "Mark",
    img: {
      resource_type: "image",
      format: "gif",
      public_id: "v1635324039/proper-pushup-negative-pushups_qjycym",
      path: "v1635324039/proper-pushup-negative-pushups_qjycym.gif",
    } as CloudinaryMedia,

    location: "SF",

    updatedOnUnix: 413151,
    submissions: [
      {
        createdOnUnix: 413151,
        value: 9,
      },
    ],
  },
];
