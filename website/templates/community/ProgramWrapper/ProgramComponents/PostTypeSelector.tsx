import { updateDoc, deleteField, DocumentReference } from "firebase/firestore";
import { Post } from "@models/Posts/Post";
import { useState } from "react";

interface Props {
  post: Post;
  postRef: DocumentReference;
}

const PostTypeSelector: React.FC<Props> = ({ post, postRef }) => {
  const [state, setState] = useState<"announcement" | "spotlight" | undefined>(
    post.postType
  );

  const handleChange = async (val?: "announcement" | "spotlight") => {
    // console.log("val", val, postRef.path);
    try {
      if (val) {
        await updateDoc(postRef, { postType: val });
      } else {
        await updateDoc(postRef, { postType: deleteField() });
      }

      setState(val);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form className="flex justify-evenly items-center p-2 text-xs iphoneX:text-base">
      <h3>Post Type: </h3>
      <input
        type="radio"
        name="postType"
        id="spotlight"
        checked={state === "spotlight"}
        onChange={() => handleChange("spotlight")}
      />
      <label htmlFor="spotlight">Spotlight</label>
      <input
        type="radio"
        name="postType"
        id="announcement"
        checked={state === "announcement"}
        onChange={() => handleChange("announcement")}
      />
      <label htmlFor="announcement">Announcement</label>
      <input
        type="radio"
        name="postType"
        id="none"
        checked={!state}
        onChange={() => handleChange()}
      />
      <label htmlFor="none">None</label>
    </form>
  );
};

export default PostTypeSelector;
