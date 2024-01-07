export interface OnboardingProps {
  imageUrl: string;
  headingText: string;
  subHeadingText: string;
  buttonText: string;
  key: string;
}

export const onboardingCompData: OnboardingProps[] = [
  {
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame%201000001351_AEbS96l2y.png?updatedAt=1700121660082",
    headingText: "Now Track Meals Quickly",
    subHeadingText:
      "We are introducing tracking by images. Simply click or upload to begin",
    buttonText: "Proceed",
    key: "trackQuickly",
  },
  {
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame%201000001352_NYY5RBhlht.png?updatedAt=1700122157209",
    headingText: "Know what you eat",
    subHeadingText:
      "The scan uses deep learning tech to identify the food constituents and their macros.",
    buttonText: "Proceed",
    key: "foodImage",
  },
  {
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame%201000001354_3zEsaoffx.png?updatedAt=1700124899423",
    headingText: "Select from gallery",
    subHeadingText:
      "You can also upload images from your gallery to track your day's meals",
    buttonText: "Proceed",
    key: "gallery",
  },
  {
    imageUrl:
      "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame%201000001355_C5tqu8r67p.png?updatedAt=1700124791969",

    headingText: "Track by taking a picture",
    subHeadingText:
      "You can use your camera to click image of anything you ate, and we will track",
    buttonText: "Let’s Do it",
    key: "clickPicture",
  },
];
