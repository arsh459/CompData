import { getUserCollections } from "../../../models/Collection/Methods/getUtils";
import { getUserGroups } from "../../../models/Messages/Methods/getUtils";
import { getUserTrips } from "../../../models/Trip/Methods/getUtils";
import { UserInterface } from "../../../models/User/User";
import { updateOne } from "../../../utils/firestore/fetchOne";

export const updateCollectionAuthor = async (
  userNow: UserInterface,
  prevUser: UserInterface,
) => {
  if (userNow.uid) {
    if (shouldUpdateAuthor(userNow, prevUser)) {
      const collections = await getUserCollections(userNow.uid);
      const trips = await getUserTrips(userNow.uid);

      collections.forEach(async (collection) => {
        await updateOne("collections", collection.collectionId, {
          author: {
            name: userNow.name ? userNow.name : "",
            imageURI: userNow.imageURI ? userNow.imageURI : "",
            allFollowers: userNow.allFollowers ? userNow.allFollowers : 0,
            tagline: userNow.tagline ? userNow.tagline : "",
            bio: userNow.bio ? userNow.bio : "",
          },
        });
      });

      trips.forEach(async (collection) => {
        await updateOne("tripsV2", collection.collectionId, {
          author: {
            name: userNow.name ? userNow.name : "",
            imageURI: userNow.imageURI ? userNow.imageURI : "",
            allFollowers: userNow.allFollowers ? userNow.allFollowers : 0,
            tagline: userNow.tagline ? userNow.tagline : "",
            bio: userNow.bio ? userNow.bio : "",
          },
        });
      });
    }

    if (shouldUpdateSnippet(userNow, prevUser)) {
      const allGroups = await getUserGroups(userNow.uid);
      for (const group of allGroups) {
        await updateOne("groups", group.groupId, {
          [`members.${userNow.uid}`]: {
            ...group.members[userNow.uid],
            imageURL: userNow.imageURI ? userNow.imageURI : "",
            name: userNow.name ? userNow.name : "",
          },
        });
      }
    }
  }
};

const shouldUpdateAuthor = (
  userNow: UserInterface,
  prevUser: UserInterface,
) => {
  if (
    userNow.name !== prevUser.name ||
    userNow.imageURI !== prevUser.imageURI ||
    userNow.allFollowers !== prevUser.allFollowers ||
    userNow.tagline !== prevUser.tagline ||
    userNow.bio !== prevUser.bio
  ) {
    return true;
  }

  return false;
};

const shouldUpdateSnippet = (
  userNow: UserInterface,
  prevUser: UserInterface,
) => {
  if (
    userNow.name !== prevUser.name ||
    userNow.imageURI !== prevUser.imageURI
  ) {
    return true;
  }

  return false;
};
