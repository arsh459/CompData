import { Post, postTypes } from "@models/Post/Post";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type GamePostsContextProps = {
  children: React.ReactNode;
  postType?: postTypes;
};

export interface GamePostsontextInterface {
  posts?: { post: Post; ref: FirebaseFirestoreTypes.DocumentReference }[];
  onNext?: () => Promise<void>;
  fetched?: boolean;
}
