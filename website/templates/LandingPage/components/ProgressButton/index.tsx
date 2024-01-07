import React from "react";
import Image from "next/image";
import classes from "./ProgressButton.module.css";

import smBanner from "../../../../public/images/smHomeBanner.png";

interface Props {
  img?: string | object;
}

const { wrapper, circle } = classes;
const ProgressButton: React.FC<Props> = ({ img = null }) => {
  return (
    <>
      <div className={wrapper} data-anim="base wrapper">
        <div className={circle} data-anim="base left"></div>
        <div className={circle} data-anim="base right">
          <Image alt="socailBoat" src={smBanner} />
        </div>
      </div>
    </>
  );
};

export default ProgressButton;
