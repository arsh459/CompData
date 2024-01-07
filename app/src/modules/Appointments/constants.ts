export type CategoryTypes =
  | "gynaecologist"
  | "health_coach"
  | "nutrtitionist"
  | "sales";

export interface CategoryInterface {
  text: string;
  img: string;
  type: CategoryTypes;
  color: string;
}

export const categories: Array<CategoryInterface> = [
  {
    type: "gynaecologist",
    img: "https://ik.imagekit.io/socialboat/Frame%201904_rWvvT4sBlL.png?updatedAt=1692693309067",
    text: "Talk to Gynaecologist",
    color: "#EED7FF",
  },
  {
    type: "health_coach",
    img: "https://ik.imagekit.io/socialboat/Frame%201905_C9W7ZpUeB8.png?updatedAt=1692693308920",
    text: "Talk to Health Coach",
    color: "#D7F0FF",
  },
  {
    type: "sales",
    img: "https://ik.imagekit.io/socialboat/Frame%201905_C9W7ZpUeB8.png?updatedAt=1692693308920",
    text: "Talk to Sales expert",
    color: "#D7F0FF",
  },
  {
    type: "nutrtitionist",
    img: "https://ik.imagekit.io/socialboat/Frame%201906_Ss4GM_fgV.png?updatedAt=1692693308929",
    text: "Talk to Nutrtitionist",
    color: "#FFEFD7",
  },
];
