// import Button from "@components/button";
// import { useState } from "react";
import { sessionTypes } from "@models/Event/Event";
// import { postButtons } from "./constants";
import PostButton from "./PostButton";
// import PostCreateModal from "./PostCreateModal";

interface Props {
  onButtonPress: (newKey: sessionTypes) => void;
  selectedKey?: sessionTypes;
}

const PostIcons: React.FC<Props> = ({ onButtonPress, selectedKey }) => {
  return (
    <>
      {/* <div className="flex items-center"> */}
      {/* {postButtons.map((item) => { */}
      {/* // return ( */}

      <PostButton
        selected={false}
        onClick={() => onButtonPress("post")}
        selectedImg="https://img.icons8.com/ios-filled/192/000000/edit--v1.png"
        img="https://img.icons8.com/ios-filled/192/000000/edit--v1.png"
        text={"Write Post"}
      />

      {/* ); */}
      {/* })} */}
      {/* </div> */}
    </>
  );
};

export default PostIcons;
