import React from "react";
interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
}
const GenericStep: React.FC<Props> = ({ leftChild, rightChild }) => {
  return (
    <section className="w-screen max-w-screen-xl pb-40 mx-auto overflow-x-hidden">
      <div
        // className="flex items-center"
        className="flex flex-col-reverse md:flex-row items-center justify-center h-full"
        // className="grid md:grid-cols-2  h-full gap-10 md:gap-0 items-center"
      >
        {leftChild}
        {rightChild}
      </div>
    </section>
  );
};

export default GenericStep;
