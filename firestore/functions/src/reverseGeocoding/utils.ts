import { RevGoogleResponseInterface } from "./interface";

export const getLocality = (response: RevGoogleResponseInterface) => {
  const results = response.results;

  const localities: string[] = [];
  const subLocalities: string[] = [];
  if (results.length > 0) {
    const selectedResult = results[0];
    const formattedAddress = selectedResult.formatted_address;

    for (const addressComp of selectedResult.address_components) {
      if (
        addressComp.types?.includes("sublocality_level_1") ||
        addressComp.types?.includes("sublocality_level_2") ||
        addressComp.types?.includes("sublocality_level_3") ||
        addressComp.types?.includes("sublocality_level_4") ||
        addressComp.types?.includes("sublocality_level_5") ||
        addressComp.types?.includes("neighborhood")
      ) {
        subLocalities.push(addressComp.long_name);
      } else if (addressComp.types?.includes("locality")) {
        localities.push(addressComp.long_name);
      }
    }

    if (subLocalities.length > 0) {
      return {
        locality: subLocalities[0],
        formattedAddress: formattedAddress,
      };
    } else if (localities.length > 0) {
      return {
        locality: localities[0],
        formattedAddress: formattedAddress,
      };
    }
  }

  return {
    locality: "",
    formattedAddress: "",
  };
};
