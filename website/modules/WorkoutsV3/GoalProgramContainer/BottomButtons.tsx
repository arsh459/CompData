import { Link } from "@mui/material";
import React from "react";
interface Props {
  //   children?: React.ReactNode;
  //   text?: string;
  bgFirstBtn?: string;
  bgSecondBtn?: string;
  textFirstBtn?: string;
  textBgFirstBtn?: string;
  textSecondBtn?: string;
  textBgSecondBtn?: string;
  imgFirstBtn?: string;
  imgSecondBtn?: string;
  leftLink: string;
  rightLink: string;
}
const BottomButtons: React.FC<Props> = ({
  bgFirstBtn,
  bgSecondBtn,
  textFirstBtn,
  textSecondBtn,
  textBgFirstBtn,
  textBgSecondBtn,
  imgFirstBtn,
  imgSecondBtn,
  leftLink,
  rightLink,
}) => {
  return (
    <div className="flex">
      <Link href={leftLink} className="flex-1">
        <div
          className="flex  py-4 px-4 items-center  rounded-xl cursor-pointer flex-1 justify-center mr-2 iphoneX:mr-4"
          style={{
            background: bgFirstBtn ? bgFirstBtn : "#777777",
            color: textBgFirstBtn ? textBgFirstBtn : "#D6D6D6",
          }}
        >
          <img
            src={
              imgFirstBtn
                ? imgFirstBtn
                : "https://ik.imagekit.io/socialboat/Vector__4__fkwNJ5P1a.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656571784836"
            }
            alt="first-btn"
          />
          <span className="pl-2 text-xs iphoneX:text-lg">
            {textFirstBtn ? textFirstBtn : "Leaderboard"}
          </span>
        </div>
      </Link>
      <Link href={rightLink} className="flex-1">
        <div className="flex py-4 px-4 bg-white items-center rounded-xl cursor-pointer flex-1 justify-center">
          <img
            src={
              imgSecondBtn
                ? imgSecondBtn
                : "https://ik.imagekit.io/socialboat/Polygon_1_mU_LKHS73.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656571784792"
            }
            alt="second-btn"
          />
          <span
            className="pl-2 whitespace-nowrap text-xs iphoneX:text-lg"
            style={{
              background: bgSecondBtn ? bgSecondBtn : "#FFF",
              color: textBgSecondBtn ? textBgSecondBtn : "#0085E0",
            }}
          >
            {textSecondBtn ? textSecondBtn : "Start Game"}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BottomButtons;
