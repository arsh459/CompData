import { fitnessGoalTypes } from "@models/User/User";

export const getMyGoalObj = (
  goal?: fitnessGoalTypes
): {
  title: string;
  textColor: string;
  iconUrl: string;
  color: [string, string];
} => {
  switch (goal) {
    case "pcos_pcod":
      return {
        title: "Regularise your cycle",
        textColor: "#DF16FF",
        iconUrl:
          "https://ik.imagekit.io/socialboat/Group_EeDlaFHqf.png?updatedAt=1690202230225",
        color: ["#E7DCFF", "#E394FF"],
      };
    case "keep_fit":
      return {
        title: "General well being",
        textColor: "#05719F",
        iconUrl:
          "https://ik.imagekit.io/socialboat/Vector_yxLuzmzk8.png?updatedAt=1690202256557",
        color: ["#DCF7FF", "#88D4FF"],
      };
    default:
      return {
        title: "Lose Weight",
        textColor: "#FF7438",
        iconUrl:
          "https://ik.imagekit.io/socialboat/Vector-1_JH0Qe5GP7.png?updatedAt=1690202230207",
        color: ["#FFE9DC", "#FFAC88"],
      };
  }
};
