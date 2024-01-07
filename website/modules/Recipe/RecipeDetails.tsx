/* eslint-disable @next/next/no-img-element */
import {
  fbIconGray,
  instaIconGray,
  linkdeinIconGray,
} from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import {
  getIconsNutriValues,
  getRoundedValue,
  percentageToFraction,
} from "@modules/NewBlog/utils";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Link from "next/link";
import React from "react";
import NutriValues from "./NutriValues";
import RecipeHeadings from "./RecipeHeadings";

interface Props {
  task: Task;
  user?: UserInterface;
  isReel: boolean;
}

const RecipeDetails: React.FC<Props> = ({ task, user, isReel }) => {
  // console.log(task);
  //   console.log(
  //     task.prepTime,
  //     task.cookTime,
  //     task.totalTime,
  //     task.cuisine,
  //     task.category
  //   );

  return (
    <div className="w-full sm:w-1/2 h-full">
      <div className="flex-1  rounded-2xl bg-white/10 m-4   aspect-[545/921] pt-4 sm:overflow-y-scroll  ">
        <p className="font-popSB text-white text-[22px] sm:text-2xl px-4">
          {task.name}
        </p>
        {task?.description ? (
          <p className="text-xs font-light leading-4 pt-4 px-4 text-white/60">
            {task.description}
          </p>
        ) : null}
        {isReel ? null : <RecipeHeadings primaryText="Nutrient details" />}
        {isReel ? null : (
          <>
            <div className="grid grid-cols-2 pl-4 gap-2 w-full sm:4/5 md:w-3/4">
              <NutriValues
                value={getRoundedValue(task?.nutritionFacts?.fats)}
                text={"Fats"}
                icon={getIconsNutriValues("fats")}
              />
              <NutriValues
                value={getRoundedValue(task?.nutritionFacts?.protein)}
                text={"Protein"}
                icon={getIconsNutriValues("protein")}
              />
              <NutriValues
                value={getRoundedValue(task?.nutritionFacts?.fibre)}
                text={"Fibre"}
                icon={getIconsNutriValues("fibre")}
              />
              <NutriValues
                value={getRoundedValue(task?.nutritionFacts?.fibre)}
                text={"Carbs"}
                icon={getIconsNutriValues("carbs")}
              />
            </div>
          </>
        )}
        {task?.ingredients && (
          <>
            <RecipeHeadings primaryText="Ingredients for this Recipe" />
            {task?.ingredients.map((item, index) => {
              const value = item.qty * 1;
              return (
                <div
                  className="flex flex-row justify-between px-4 pb-3 "
                  key={`${item.name}-${index}`}
                >
                  <p className="text-xs font-normal capitalize  text-[#FFFFFFCC]">
                    {item.name}
                  </p>
                  <p className="text-xs   text-[#FFFFFFCC]">
                    {percentageToFraction(value)} {item.unit}
                  </p>
                </div>
              );
            })}
          </>
        )}
        {task?.cookingInstruction?.length && (
          <>
            <RecipeHeadings primaryText="Preparation" />
            {task?.cookingInstruction?.length ? (
              <div className="  rounded-xl px-4 mt-4">
                {task?.cookingInstruction?.map((instruction, index) => {
                  return (
                    <div
                      className="pb-4  rounded-xl"
                      key={`${instruction}_${index}`}
                    >
                      <p className="text-xs font-popR leading-4  text-[#FFFFFF]/60">
                        {index + 1}. {instruction}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </>
        )}
        <>
          {user?.uid ? (
            <>
              <RecipeHeadings primaryText="About the Author" />
              <div className="  flex-1 flex mx-4 border-white/30 border-2 aspect-[348/208] rounded-2xl">
                <div className="flex-[.4] h-full flex flex-col justify-end  rounded-2xl overflow-hidden rounded-r-none ">
                  {user?.profileImage ? (
                    <div className="w-full aspect-[111/198]">
                      <MediaTile
                        media={user?.profileImage}
                        alt="media"
                        width={111}
                        height={getHeight(user?.profileImage, 111)}
                        objectString="object-cover "
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex-[.6] flex flex-col  h-full p-4 rounded-2xl rounded-l-none ">
                  <div className="flex justify-between pb-4">
                    <p className="text-white font-popM text-lg">{user?.name}</p>
                    <p className="text-white font-popM text-lg">
                      {user?.knownFor}
                    </p>
                    <div className="flex justify-end self-start pt-1 w-1/4">
                      {user?.facebookProfile ? (
                        <Link passHref href={user?.facebookProfile}>
                          <img
                            src={fbIconGray}
                            alt={`facebook handle of ${
                              user?.name ? user.name : "author"
                            }`}
                            className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                          />
                        </Link>
                      ) : null}
                      {user?.linkedInLink ? (
                        <Link passHref href={user?.linkedInLink}>
                          <img
                            src={linkdeinIconGray}
                            alt={`linkdein handle of ${
                              user?.name ? user.name : "author"
                            }`}
                            className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                          />
                        </Link>
                      ) : null}
                      {user?.instagramLink ? (
                        <Link passHref href={user?.instagramLink}>
                          <img
                            src={instaIconGray}
                            alt={`insta handle of ${
                              user?.name ? user.name : "author"
                            }`}
                            className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                          />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/80 font-popR text-xs">
                      {user?.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default RecipeDetails;
