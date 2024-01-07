/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";
import classes from "./RippleButton.module.css";
import Link from "next/link";

interface Props {
    content: string | "StaticRequire" | "StaticImageData";
    size: "medium" | "large";
    type?: "image" | "text";
    imgUrl?: string;

    link: string;
}

// const { rippleBtn, rippleBtnOuter } = classes;
const { rippleButton } = classes;

const RippleButton: React.FC<Props> = ({ content, link }) => {
    const spaceing = 10;
    const squareBox = 200;
    const centerXY = squareBox / 2;
    const spacingBetweenCircle = 6;
    const strokeWidth_1 = 1;
    const strokeWidth_2 = 7;
    const radius_1 = centerXY - spaceing - strokeWidth_1 / 2;
    const radius_2 =
        centerXY - spaceing - strokeWidth_1 / 2 - spacingBetweenCircle;
    const radius_3 =
        centerXY - spaceing - strokeWidth_1 / 2 - spacingBetweenCircle * 2;
    const radius_4 =
        centerXY - spaceing - strokeWidth_2 / 2 - spacingBetweenCircle * 3;
    // const insetVal = spaceing + strokeWidth_2 + spacingBetweenCircle * 3;

    return (
        <Link href={link} passHref>
            <div className="relative rounded-full z-0">
                <div className="z-20">
                    <svg width={squareBox} height={squareBox}>
                        <defs>
                            <linearGradient
                                id="linearGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#600FF5" />
                                <stop offset="25%" stopColor="#E44156" />
                                <stop offset="50%" stopColor="#F4B436" />
                                <stop offset="75%" stopColor="#CCDB2C" />
                                <stop offset="100%" stopColor="#60C5D9" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx={centerXY}
                            cy={centerXY}
                            r={radius_1}
                            strokeWidth={strokeWidth_1}
                            stroke="url(#linearGradient)"
                            strokeOpacity="40%"
                            fill="transparent"
                            className={rippleButton}
                        />
                        <circle
                            cx={centerXY}
                            cy={centerXY}
                            r={radius_2}
                            strokeWidth={strokeWidth_1}
                            stroke="url(#linearGradient)"
                            strokeOpacity="70%"
                            fill="transparent"
                            className={rippleButton}
                        />
                        <circle
                            cx={centerXY}
                            cy={centerXY}
                            r={radius_3}
                            strokeWidth={strokeWidth_1}
                            stroke="url(#linearGradient)"
                            fill="transparent"
                            className={rippleButton}
                        />
                        <circle
                            cx={centerXY}
                            cy={centerXY}
                            r={radius_4}
                            strokeWidth={strokeWidth_2}
                            stroke="url(#linearGradient)"
                            fill="transparent"
                        />
                    </svg>
                </div>
                <div
                    className={clsx(
                        `w-[128px] h-[128px] flex items-center justify-center rounded-full cursor-pointer`,
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20",
                        "bg-[#8d8d8d]/[0.18] backdrop-blur-[18px]"
                    )}
                >
                    <p className="font-sans text-base font-medium text-white">
                        {content}
                    </p>
                </div>
            </div>
        </Link>

        // <div className={clsx(rippleBtnOuter)}>
        //   <div className={rippleBtn}>
        //     <p className={clsx("text-white text-base font-medium text-center ")}>
        //       {content}
        //     </p>
        //   </div>
        // </div>
    );
};

export default RippleButton;
