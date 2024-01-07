import { socialImageLink } from "./addInviteURL";

export const createStoreSocialMediaParams = (
  name?: string,
  bio?: string,
  imageURI?: string
): { name: string; bio: string; imageURI: string } => {
  return {
    name: name ? `${name}'s travel store` : "Holidaying travel store",
    bio: bio ? bio : "Discover my travel recommendations and trips",
    imageURI: imageURI ? imageURI : socialImageLink,
  };
};
