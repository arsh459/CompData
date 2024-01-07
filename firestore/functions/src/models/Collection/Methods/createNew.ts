import {Collection} from '../Collection';
import {v4 as uuid} from 'uuid';
import {UserInterface} from '../../User/User';
import {getAuthor} from '../../User/Methods';

export const createTemplate = (
  user: UserInterface,
  collectionName: string,
  collectionTagline: string,
  collectionDescription: string,
): Collection => {
  return {
    collectionId: uuid(),
    uid: user.uid,
    collectionName: collectionName,
    collectionTagline: collectionTagline,
    description: collectionDescription,
    collectionMedia: [],
    numLikes: 0,
    numComments: 0,
    groupSizeTags: {},
    themeTags: {},
    regionTags: {},
    amenitiesTags: {},
    listingTypes: {},
    collectionType: 'collection',
    minPrice: 0,
    maxPrice: 0,
    createdOnUnix: new Date().getTime(),
    author: getAuthor(user),
    deeplinkURI: '',
    saved: true,
    listingsPresent: {},
  };
};
