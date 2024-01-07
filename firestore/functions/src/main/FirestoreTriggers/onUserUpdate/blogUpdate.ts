import {UserInterface} from '../../../models/User/User';
import * as admin from 'firebase-admin';
import {getUserCollections} from '../../../models/Collection/Methods/getUtils';
import {PostElement} from '../../../models/Blog/Blog';

export const updateBlogAuthor = async (userNow: UserInterface) => {
  if (userNow.uid) {
    const userCollections = await getUserCollections(userNow.uid);

    userCollections.forEach(async (collection) => {
      const allCollectionBlogs = await admin
        .firestore()
        .collection('collections')
        .doc(collection.collectionId)
        .collection('blogs')
        .get();

      allCollectionBlogs.docs.forEach(async (blog) => {
        const blogData = blog.data() as PostElement;

        await admin
          .firestore()
          .collection('collections')
          .doc(collection.collectionId)
          .collection('blogs')
          .doc(blogData.postId)
          .update({
            author: {
              name: userNow.name ? userNow.name : '',
              imageURI: userNow.imageURI ? userNow.imageURI : '',
              allFollowers: userNow.allFollowers ? userNow.allFollowers : 0,
              tagline: userNow.tagline ? userNow.tagline : '',
              bio: userNow.bio ? userNow.bio : '',
            },
          });
      });
    });
  }
};
