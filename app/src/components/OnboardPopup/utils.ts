export type modalState = "init" | "open" | "closed";

export type paramsType = {
  fx: number;
  fy: number;
  width: number;
  height: number;
  px: number;
  py: number;
};

export type positionType =
  | "top-left"
  | "top-middle"
  | "top-right"
  | "bottom-left"
  | "bottom-middle"
  | "bottom-right";

export type positionDataType = {
  left?: number;
  top?: number;
  bottom?: number;
  position: positionType;
};

export const isInViewPort = (
  windowWidth: number,
  windowHeight: number,
  rectTop: number,
  rectBottom: number,
  rectWidth: number
) => {
  const isVisible =
    rectBottom !== 0 &&
    rectTop >= 0 &&
    rectBottom <= windowHeight &&
    rectWidth > 0 &&
    rectWidth <= windowWidth;

  return isVisible;
};

export const isInBox = (
  boxTop: number,
  boxLeft: number,
  boxWidth: number,
  boxHeight: number,
  rectTop: number,
  rectLeft: number,
  rectWidth: number,
  rectHeight: number
) => {
  const isInside =
    boxWidth > 0 &&
    boxHeight > 0 &&
    rectWidth > 0 &&
    rectHeight > 0 &&
    rectTop >= boxTop &&
    rectLeft >= boxLeft &&
    rectTop + rectHeight <= boxTop + boxHeight &&
    rectLeft + rectWidth <= boxLeft + boxWidth;

  return isInside;
};

const liesInScreen = (param: {
  windowWidth: number;
  windowHeight: number;
  rectTop: number;
  rectLeft: number;
  rectWidth: number;
  rectHeight: number;
}): positionType => {
  const {
    windowWidth,
    windowHeight,
    rectTop,
    rectLeft,
    rectWidth,
    rectHeight,
  } = param;

  const bottomSpace = windowHeight - (rectTop + rectHeight);
  const topSpace = windowHeight - (bottomSpace + rectHeight);
  const rightSpace = windowWidth - (rectLeft + rectWidth);
  const leftSpace = windowWidth - (rightSpace + rectWidth);

  if (bottomSpace > topSpace) {
    if (
      isInBox(
        0,
        windowWidth / 3,
        windowWidth / 3,
        windowHeight / 2,
        rectTop,
        rectLeft,
        rectWidth,
        rectHeight
      )
    ) {
      return "bottom-middle";
    }
    if (rightSpace < leftSpace) {
      return "bottom-left";
    } else {
      return "bottom-right";
    }
  } else {
    if (
      isInBox(
        windowHeight / 2,
        windowWidth / 3,
        windowWidth / 3,
        windowHeight / 2,
        rectTop,
        rectLeft,
        rectWidth,
        rectHeight
      )
    ) {
      return "top-middle";
    }
    if (rightSpace < leftSpace) {
      return "top-left";
    } else {
      return "top-right";
    }
  }
};

export const getInstructioPosition = (param: {
  windowWidth: number;
  windowHeight: number;
  rectTop: number;
  rectLeft: number;
  rectWidth: number;
  rectHeight: number;
}) => {
  const { windowHeight, rectTop, rectLeft, rectWidth, rectHeight } = param;

  let data: positionDataType = { position: liesInScreen(param) };

  switch (data.position) {
    case "bottom-middle":
      data.bottom = undefined;
      data.top = rectTop + rectHeight;
      data.left = rectLeft + rectWidth / 2;
      break;
    case "bottom-left":
      data.bottom = undefined;
      data.top = rectTop + rectHeight;
      data.left = rectLeft + rectWidth;
      break;
    case "bottom-right":
      data.bottom = undefined;
      data.top = rectTop + rectHeight;
      data.left = rectLeft;
      break;
    case "top-middle":
      data.top = undefined;
      data.bottom = windowHeight - rectTop;
      data.left = rectLeft + rectWidth / 2;
      break;
    case "top-left":
      data.top = undefined;
      data.bottom = windowHeight - rectTop;
      data.left = rectLeft + rectWidth;
      break;
    case "top-right":
      data.top = undefined;
      data.bottom = windowHeight - rectTop;
      data.left = rectLeft;
      break;
  }

  return data;
};
