import * as admin from 'firebase-admin';
import {PostElement} from '../Blog';

export const getUserPosts = async (uid: string) => {
  const userBlogs = await admin
    .firestore()
    .collectionGroup('blogs')
    .where('uid', '==', uid)
    .get();

  const blogs: PostElement[] = [];
  return userBlogs.docs.reduce((acc, item) => {
    acc.push(item.data() as PostElement);
    return acc;
  }, blogs);
};
