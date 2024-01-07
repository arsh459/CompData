export const recommendationBg =
  "https://ik.imagekit.io/socialboat/tr:w-1800,fo-auto,c-maintain-ratio/recomendationBg_WjADVHU-s.png?updatedAt=1701185871201";

export interface RecommendationV2CardInterface {
  content: string;
  cardImage: string;
  imagePop?: boolean;
  imageType?: "Doctor" | "Bowl";
  bgTransparent?: boolean;
}

export const RecommendationV2CardData: RecommendationV2CardInterface[] = [
  {
    content:
      "You are showing symptoms of PCOS, you should connect with a doctor",
    cardImage:
      "https://ik.imagekit.io/socialboat/ReDoctor_bRFtZdrHoM.png?updatedAt=1701186199166",
    imageType: "Doctor",
    imagePop: true,
  },
  {
    content: "Today’s Dinner is Low Cal and has anti-androgenic effects",
    cardImage:
      "https://ik.imagekit.io/socialboat/ReFood_4xP1spSN3.png?updatedAt=1701186443567",
    imageType: "Bowl",
    imagePop: true,
  },
  {
    content:
      "Try this pose from coach Greesha to help you with your shoulder pain. ",
    cardImage:
      "https://ik.imagekit.io/socialboat/ReYoga_LfqC_mWul.png?updatedAt=1701186443632",
  },
  {
    content:
      "You might be ovulating. Best time to be intimate with your partner",
    cardImage:
      "https://ik.imagekit.io/socialboat/ReOvulation_QqiGJ-ir5.png?updatedAt=1701188593185",
    bgTransparent: true,
  },
  {
    content: "You're sleeping well now! Great job. You should keep this up",
    cardImage:
      "https://ik.imagekit.io/socialboat/ReSleep_zvt-3iOsj.png?updatedAt=1701188592929",
    bgTransparent: true,
  },
];
