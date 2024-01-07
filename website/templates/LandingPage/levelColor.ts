export interface LeaderLevelColor {
  aspirant: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAdditional: string;
}

export const getLevelColor = (lvl: Number) => {
  switch (lvl) {
    case 1:
      return {
        aspirant: "Enthusiast",
        colorPrimary: "#61C5D9",
        colorSecondary: "#ADF1FF",
        colorAdditional: "#88DCEC",
      };
    case 2:
      return {
        aspirant: "Aspirant",
        colorPrimary: "#CCDB2C",
        colorSecondary: "#F3E23F",
        colorAdditional: "#D8D833",
      };
    case 3:
      return {
        aspirant: "Local Athlete",
        colorPrimary: "#F19B38",
        colorSecondary: "#EDF138",
        colorAdditional: "#EFC138",
      };
    case 4:
      return {
        aspirant: "Athlete",
        colorPrimary: "#D74559",
        colorSecondary: "#F18638",
        colorAdditional: "#E46449",
      };
    case 5:
      return {
        aspirant: "Olympian",
        colorPrimary: "#A372FF",
        colorSecondary: "#C138FD",
        colorAdditional: "#801CF8",
      };
    default:
      return {
        aspirant: "Beginner",
        colorPrimary: "#66D9B3",
        colorSecondary: "#A5EFF6",
        colorAdditional: "#7FE2CD",
      };
  }
};

export const getLevelColorV2 = (lvl: Number) => {
  switch (lvl) {
    case 1:
      return {
        aspirant: "Enthusiast",
        color: "#66D9B3",
      };
    case 2:
      return {
        aspirant: "Aspirant",
        color: "#CED864",
      };
    case 3:
      return {
        aspirant: "Local Athlete",
        color: "#F8A74B",
      };
    case 4:
      return {
        aspirant: "Athlete",
        color: "#D74559",
      };
    case 5:
      return {
        aspirant: "Olympian",
        color: "#8E51FF",
      };
    default:
      return {
        aspirant: "Beginner",
        color: "#66D9B3",
      };
  }
};
export const getLevelColorV3 = (lvl: Number) => {
  switch (lvl) {
    case 1:
      return {
        aspirant: "Enthusiast",
        color: "#6CCFE2",
      };
    case 2:
      return {
        aspirant: "Aspirant",
        color: "#C6D05C",
      };
    case 3:
      return {
        aspirant: "Local Athlete",
        color: "#F8A74B",
      };
    case 4:
      return {
        aspirant: "Athlete",
        color: "#E35064",
      };
    case 5:
      return {
        aspirant: "Olympian",
        color: "#9159F9",
      };
    default:
      return {
        aspirant: "Beginner",
        color: "#66D9B3",
      };
  }
};
