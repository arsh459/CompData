export const courses = [
  {
    //url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-pavel-danilyuk-7521693_1_rzu9ci.mp4?alt=media&token=00aa8fd8-4585-4483-b08f-b0834f6995b5",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627025638/cloud_upload/pexels-pavel-danilyuk-7521693_1_rzu9ci.jpg",
    name: "Meditation",
    cost: 99,
    currency: "₹",
  },
  {
    // url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-polina-tankilevitch-6739110_1_ctcfyv.mp4?alt=media&token=e0a9bcf6-ab54-4735-90bc-438601190c55",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627025718/cloud_upload/pexels-polina-tankilevitch-6739110_1_ctcfyv.jpg",
    name: "Sit in Padma",
    cost: 49,
    currency: "₹",
  },
];

export interface Course {
  url: string;
  name: string;
  cost: number;
  currency: "₹";
}
