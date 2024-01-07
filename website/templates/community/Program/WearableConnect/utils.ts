import { TerraPrividers } from "@models/Terra/TerraUser";

export const getWearableName = (provider?: TerraPrividers) => {
  if (provider === "GOOGLE") {
    return {
      text: "GoogleFit",
    };
  } else if (provider === "FITBIT") {
    return {
      text: "FitBit",
    };
  } else if (provider === "GARMIN") {
    return {
      text: "Garmin",
    };
  } else if (provider === "OURA") {
    return {
      text: "Oura",
    };
  } else if (provider === "PELOTON") {
    return {
      text: "Peloton",
    };
  } else if (provider === "WAHOO") {
    return {
      text: "Wahoo",
    };
  } else {
    return {
      text: "Wearable",
    };
  }
};
