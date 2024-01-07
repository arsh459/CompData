export const fundCapaign = {
  name: "Learn Zumba, Fees goes to Children in need",
  url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627032993/cloud_upload/fund_olwdkv.jpg",
  videoURL:
    "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627032993/cloud_upload/fund_olwdkv.mp4",
  pledged: 9999,
  funded: 7500,
  currency: "₹",
};

export interface fundingCampaign {
  name: string;
  url: string;
  videoURL: string;
  pledged: number;
  funded: number;
  currency: "₹";
}
