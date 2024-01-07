import {
  FAT_BURNER_GAME,
  RUNNER_GAME,
  WOMENS_GAME,
} from "@constants/gameStats";

export const getGameGoleImage = (gameId: string) => {
  switch (gameId) {
    case WOMENS_GAME:
      return `https://ik.imagekit.io/socialboat/Component_3__C5qY8s71.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655537155140`;
    case RUNNER_GAME:
      return `https://ik.imagekit.io/socialboat/unsplash_HyivyCRdz14_pPzayyvqZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655562023585`;
    case FAT_BURNER_GAME:
      return `https://ik.imagekit.io/socialboat/Group_353_sxwKZi0Ta.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655562023587`;
    default:
      return `https://ik.imagekit.io/socialboat/Group_353_sxwKZi0Ta.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655562023587`;
  }
};

export const getGameGoleImgClass = (gameId: string) => {
  switch (gameId) {
    case WOMENS_GAME:
      return {
        divClass:
          "w-full max-w-[200px] iphoneX:max-w-[240px] h-[60%] max-h-72 pt-2",
        imgClass: "bottom-0 -left-8 min-w-[160%]",
      };
    case RUNNER_GAME:
      return {
        divClass: "w-2/3 max-w-[178px] h-2/3 max-h-[400px] pt-8",
        imgClass: "top-0 left-full -translate-x-1/4 h-full",
      };
    case FAT_BURNER_GAME:
      return {
        divClass: "w-full max-w-[340px] h-2/3 max-h-60 iphoneX:max-h-72",
        imgClass: "bottom-0 -right-4",
      };
    default:
      return {
        divClass: "h-1/3",
        imgClass: "top-0 left-0",
      };
  }
};

export const getGameIllustraints = (gameId: string) => {
  switch (gameId) {
    case WOMENS_GAME:
      return `https://ik.imagekit.io/socialboat/Component_1__2__hLCpwDgSd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655492359882`;
    case RUNNER_GAME:
      return `https://ik.imagekit.io/socialboat/Component_1_rAHr5bOSy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655577444836`;
    case FAT_BURNER_GAME:
      return `https://ik.imagekit.io/socialboat/Group_352_UTmBY4gGq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655577836000`;
    default:
      return `https://ik.imagekit.io/socialboat/Group_353_sxwKZi0Ta.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655562023587`;
  }
};
