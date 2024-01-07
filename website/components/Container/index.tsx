import React, { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  return (
    <div
      className={`container  mx-auto  ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
