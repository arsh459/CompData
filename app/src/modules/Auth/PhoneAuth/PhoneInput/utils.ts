export const getCountryPhoneLength = (countryCode: string) => {
  if (["+86", "+39"].includes(countryCode)) {
    return 13;
  } else if (countryCode === "+258") {
    return 12;
  } else if (["+43", "+55", "+358", "+49", "+62"].includes(countryCode)) {
    return 11;
  }

  return 10;
};
