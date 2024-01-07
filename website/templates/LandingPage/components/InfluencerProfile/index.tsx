/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";
import { profieData } from "../../constants";
import classes from "./InfluencerProfile.module.css";

const { profileModal, profileModalContent, profileModalClose, vals, innerDiv } =
  classes;

interface Props {
  show?: boolean;
  updateShow: (val: boolean) => void;
}

const InfluencerProfile: React.FC<Props> = ({ show, updateShow }) => {
  if (!show) return null;

  return (
    <>
      <div
        id="profileModal"
        className={clsx(
          profileModal,
          "w-screen mt-8 md:mt-0 md:w-1/2",
          show ? "block" : "hidden"
        )}
      >
        <div className={clsx(profileModalContent, "w-11/12 md:w-9/12")}>
          <p>
            <span
              onClick={() => updateShow(!show)}
              className={clsx(profileModalClose, "text-2xl md:text-5xl")}
            >
              &times;
            </span>
          </p>
          <p className="text-center flex justify-center">
            <img
              style={{
                borderRadius: "50%",
                height: "150px",
                width: "150px",
              }}
              alt="socailBoat"
              src="/images/homeBanner.png"
            />
          </p>
          <div className="innerContent">
            <div className={clsx("flex justify-around ", innerDiv)}>
              <h2 className={clsx("text-2xl md:text-4xl inline", vals)}>
                Calories burnt
              </h2>
              <h2
                className={clsx(
                  "text-2xl md:text-4xl font-extrabold inline",
                  vals
                )}
              >
                {profieData.caloriesBurnt}
              </h2>
            </div>
            <div className="flex">
              <div className={clsx(" w-1/2 ", innerDiv)}>
                <h2
                  className={clsx("text-2xl md:text-4xl font-extrabold", vals)}
                >
                  {profieData.fitPoints}
                </h2>
                <h2 className={clsx("text-2xl md:text-4xl", vals)}>
                  Fit points
                </h2>
              </div>
              <div className={clsx(" w-1/2 ", innerDiv)}>
                <h2
                  className={clsx("text-2xl md:text-4xl font-extrabold", vals)}
                >
                  {profieData.wins}
                </h2>
                <h2 className={clsx("text-2xl md:text-4xl", vals)}>Wins</h2>
              </div>
            </div>
            <div className={clsx("flex justify-around ", innerDiv)}>
              <h2 className={clsx("text-2xl md:text-4xl inline", vals)}>
                Team wins
              </h2>
              <h2
                className={clsx(
                  "text-2xl md:text-4xl font-extrabold inline",
                  vals
                )}
              >
                {profieData.teamWins}
              </h2>
            </div>
          </div>
          <div className="text-white mt-5">{profieData.tagLine}</div>
        </div>
      </div>
    </>
  );
};

export default InfluencerProfile;
