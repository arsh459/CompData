import * as crypto from "crypto";

export function computeSHA256(data: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(data.toLowerCase().trim());
  return hash.digest("hex");
}

export const normalisePhone = (phone: string) => {
  return phone.replace("+", "");
};

export const normaliseName = (name: string) => {
  const trimmedName = name.trim();
  let normalised = trimmedName.toLowerCase();

  // Remove characters not in the Roman alphabet a-z
  normalised = normalised.replace(/[^a-z]/g, "");

  const splitNames = normalised.split(" ");
  if (splitNames.length === 2) {
    return {
      fn: splitNames[0],
      ln: splitNames[1],
    };
  } else if (splitNames.length === 1) {
    return {
      fn: splitNames[0],
      ln: "",
    };
  } else {
    return {
      fn: splitNames[0],
      ln: "",
    };
  }
};

export const normalizeCity = (cityName: string) => {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/[\s\W]+/g, "");
};
