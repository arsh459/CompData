export interface howItWorksDataV2Interface {
  stepNumber: number;
  stepNumberColor: string;
  stepNumberbackground: string;
  stepHeading: string;
  stepHeadingColor: string;
  imageUrl: string;
  backgroundGradient: string;
  stepContent?: string;
}
export const howItWorksDataV2Data: howItWorksDataV2Interface[] = [
  {
    stepNumber: 1,
    stepNumberColor: "#FFFFFF",
    stepNumberbackground: "#FFFFFF33",
    stepHeading: "Give Sakhi your body parameters",
    stepHeadingColor: "#DCCBFF",
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame%201000001142%20(1)_QEWzY3nKLw.png?updatedAt=1701095262354",
    backgroundGradient:
      "linear-gradient(180deg, #7216CE 0%, #4F16CE 47.92%, #2C0090 100%)",
  },
  {
    stepNumber: 2,
    stepNumberColor: "#300396",
    stepNumberbackground: "#30039633",
    stepHeading: "Mark your previous period dates & symptoms.",
    stepHeadingColor: "#300396",
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame%201000001143%20(1)_ZZlTBMREC.png?updatedAt=1701095262421",
    backgroundGradient: "linear-gradient(180deg, #FFF 0%, #D5D5FF 100%)",
  },
  {
    stepNumber: 3,
    stepNumberColor: "#FFFFFF",
    stepNumberbackground: "#D1FF6733",
    stepHeading: "Creates a health profile & realistic goals for you",
    stepHeadingColor: "#FDFFFA",
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame%201000001144_79cPpSenE.png?updatedAt=1701095262365",
    backgroundGradient: "linear-gradient(180deg, #88B91A 0%, #688D14 100%)",
    stepContent:
      "Our AI crafts a day by day lifestyle you should follow to effectively manage your issue. Additionally, it learns and updates your plan as you use it",
    // "A 21-day fun challenge is designed for busy women to help them get into a routine of a healthy lifestyle. This challenge requires a minimum of",
  },
];
