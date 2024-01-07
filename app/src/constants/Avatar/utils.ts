import { difficulty } from "@models/User/User";

export type BodyTypesId =
  | "apple_shaped"
  | "pear_shaped"
  | "rectangle_shaped"
  | "endomorph"
  | "overweight"
  | "underweight"
  | "fit"
  | "hourglass_shaped"
  | "mesomorph";

export type BodyTypeObj = {
  id: BodyTypesId;
  image: { [key in "male" | "female"]: string };
  name: string;
  description: string;
  evolution: evolutionType[];
  workoutNote?: string;
};

// array of body types

export type evolutionType = {
  level: difficulty;
  duration: number;
  achievementBodyType: BodyTypesId;
  color?: string;
};

export type EvolutionBodyType = BodyTypeObj & evolutionType;

export const easyEvolutionType = (id: BodyTypesId): evolutionType => {
  return {
    level: "Easy",
    duration: 3,
    achievementBodyType: id,
    color: "#51FF8C",
  };
};

export const mediumEvolutionType = (id: BodyTypesId): evolutionType => {
  return {
    level: "Medium",
    duration: 6,
    achievementBodyType: id,
    color: "#FF9F59",
  };
};

export const hardEvolutionType = (id: BodyTypesId): evolutionType => {
  return {
    level: "Hard",
    duration: 12,
    achievementBodyType: id,
    color: "#FF5970",
  };
};

export const getEvolutionFitpoints = (level?: difficulty) => {
  switch (level) {
    case "Easy":
      return 10;
    case "Medium":
      return 20;
    case "Hard":
      return 30;
    default:
      return 0;
  }
};

export const getEvolutionDuration = (level?: difficulty) => {
  switch (level) {
    case "Easy":
      return 3;
    case "Medium":
      return 6;
    case "Hard":
      return 12;
    default:
      return 0;
  }
};

export const getEvolutionColor = (level?: difficulty) => {
  switch (level) {
    case "Easy":
      return "#51FF8C";
    case "Medium":
      return "#FF9F59";
    case "Hard":
      return "#FF5970";
    default:
      return "#FFFFFF";
  }
};
