import { doc, DocumentReference } from "firebase/firestore";

export const createNewPostRef = (
  parentRef: DocumentReference,
  postId: string
) => {
  return doc(parentRef, "posts", postId);
};

export const getPaddingLeftForPost = (
  pin?: boolean,
  viewLevel?: "session" | "post" | "postReply"
) => {
  return pin
    ? ""
    : viewLevel === "session"
    ? "pl-4"
    : viewLevel === "post"
    ? "pl-4"
    : viewLevel === "postReply"
    ? "pl-4"
    : "";
};

export const getPaddingForPost = (
  viewLevel?: "session" | "post" | "postReply"
) => {
  return viewLevel === "session"
    ? "p-4 pb-0"
    : viewLevel === "post"
    ? "p-4 pl-6 pb-0"
    : "p-4 pl-4 ml-10 pb-0";
};

export const getBgForPost = (viewLevel?: "session" | "post" | "postReply") => {
  return viewLevel === "session"
    ? "bg-white shadow-lg"
    : viewLevel === "post"
    ? "bg-gray-50"
    : "bg-gray-50";
};
