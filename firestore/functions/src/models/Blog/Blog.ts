import {AuthorInterface, MediaInterface} from '../Collection/Collection';
import {flagObj} from '../ListingDetail/interface';

export interface PostElement {
  heading: string;
  tagline: string;
  description: string;
  media: MediaInterface[];
  lat?: number;
  lng?: number;
  day?: string;
  tags?: flagObj;
  listingId?: string;
  collectionId: string;

  createdOnUnix: number;
  postId: string;

  // author
  author: AuthorInterface;
  uid: string;
  index: number;
}

export function isPostElement(input: PostElement | {}): input is PostElement {
  return (input as PostElement).postId !== undefined;
}
