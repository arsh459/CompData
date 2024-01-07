import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  FlatListProps,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Controls, { controlsTypes } from "./Controls";
import { Pagination } from "./Pagination";
import Slide from "./Slide";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  slideWidth?: number;
  pagination?: boolean;
  paginationTop?: boolean;
  controls?: boolean;
  centered?: boolean;
  spaceBetween?: number;
  paginationTopSpace?: number;
  paginationBottomSpace?: number;
  paginationPosition?: string;
  paginationGradient?: boolean;
  paginationGradientArr?: string[];
  dotColor?: string;
  dotWidth?: number;
  dotHeight?: number;
  activeDotWidth?: number;
  activeDotHeight?: number;
  marginX?: number;
  onIndexChange?: (index: number) => void;
  alignItems?: "stretch";
  dynamicPagination?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  initialScrollIndex?: number;
  leftIconUrl?: string;
  rightIconUrl?: string;
  iconsYPositioning?: string;
  iconStyle?: string;
  iconMargin?: string;
  forceScrollIndex?: number;
  forceIndexRefresh?: number;
  onControlChange?: (type: controlsTypes) => void;
}

const Swiper: React.FC<Props> = ({
  children,
  slideWidth,
  pagination,
  controls,
  centered,
  spaceBetween,
  paginationTopSpace,
  paginationBottomSpace,
  paginationPosition,
  paginationGradient,
  paginationGradientArr,
  dotColor,
  dotWidth,
  dotHeight,
  activeDotWidth,
  activeDotHeight,
  marginX,
  paginationTop,
  onIndexChange,
  onControlChange,
  alignItems,
  dynamicPagination,
  autoPlay,
  autoPlayDelay,
  initialScrollIndex,
  leftIconUrl,
  rightIconUrl,
  iconsYPositioning,
  iconStyle,
  iconMargin,
  forceScrollIndex,
  forceIndexRefresh,
}) => {
  let _data: unknown[] = [];
  let _renderItem: FlatListProps<any>["renderItem"];
  const flatlistRef = useRef<FlatList>(null);
  const flatlistFirstRef = useRef<any>(null);
  const flatlistLastRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // let trackEvent = true;

  const { width } = useWindowDimensions();
  const snapWidth =
    (slideWidth ? slideWidth : width) + (spaceBetween ? spaceBetween : 0);
  const emptyWidth = centered
    ? (width -
        (slideWidth ? slideWidth : 0) -
        (spaceBetween ? spaceBetween : 0)) /
      2
    : 0;

  _data = Array.isArray(children) ? children : [children];

  _renderItem = ({ item, index }) => (
    <Slide
      slideWidth={slideWidth ? slideWidth : width}
      spaceBetween={spaceBetween}
    >
      {item}
    </Slide>
  );

  const onViewChangedFunction = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) =>
      info.viewableItems.forEach((each) => {
        if (each.isViewable && each.index !== null) {
          onIndexChange && onIndexChange(each.index);
          // currentSlide = each.index;
          // if (trackEvent) {
          //   weEventTrack("Swiper_Swipped", { screenName: route.name });
          //   trackEvent = false;
          // }
        }
      }),
    [onIndexChange]
  );

  const keyExtractor: FlatListProps<any>["keyExtractor"] = (_item, _index) =>
    `swiper-key-${_index}`;

  useEffect(() => {
    if (typeof forceScrollIndex === "number" && forceIndexRefresh) {
      console.log("FORCE INDEX", forceScrollIndex);
      flatlistRef?.current?.scrollToIndex({
        index: forceScrollIndex,
        animated: true,
      });
    }
  }, [forceScrollIndex, forceIndexRefresh]);

  // const goToNextPage = () => {
  //   const nextIndex = (currentSlide + 1) % _data.length;

  //   flatlistRef.current?.scrollToIndex({
  //     index: nextIndex,
  //     animated: true,
  //   });

  //   currentSlide = nextIndex;
  // };

  // const startAutoPlay = () => {
  //   timerId = setInterval(goToNextPage, intervalTime);
  // };

  // const stopAutoPlay = () => {
  //   if (timerId) {
  //     clearInterval(timerId);
  //     timerId = null;
  //   }
  // };

  // useEffect(() => {
  //   if (autoPlay) {
  //     stopAutoPlay();
  //     startAutoPlay();

  //     return () => {
  //       stopAutoPlay();
  //     };
  //   }
  // }, [autoPlay]);

  const getItemLayout = (
    _: ArrayLike<unknown> | null | undefined,
    index: number
  ) => {
    return {
      length: snapWidth + emptyWidth,
      offset: snapWidth * index,
      index,
    };
  };

  const flatListProps = {
    data: _data,
    renderItem: _renderItem,
    horizontal: true,
    keyExtractor,
    getItemLayout,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    snapToInterval: snapWidth,
    initialScrollIndex: initialScrollIndex,
    // decelerationRate: "fast",
    bounces: false,
    scrollEventThrottle: 8,
    onScroll: Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    ),
    ref: flatlistRef,
    ListHeaderComponent: (
      <View style={{ width: emptyWidth }} ref={flatlistFirstRef} />
    ),
    ListFooterComponent: (
      <View style={{ width: emptyWidth }} ref={flatlistLastRef} />
    ),
  };

  const paginationProps = {
    data: _data,
    scrollX,
    width: snapWidth,
    paginationTopSpace,
    paginationBottomSpace,
    dotColor,
    dotWidth,
    dotHeight,
    activeDotWidth,
    activeDotHeight,
    position: paginationPosition,
    gradient: paginationGradient,
    gradientArr: paginationGradientArr,
    dynamicPagination,
  };

  const controlsProps = {
    flatlistRef,
    scrollX,
    snapWidth,
    leftIconUrl,
    rightIconUrl,
    iconsYPositioning,
    iconStyle,
    iconMargin,
    onControlChange,
  };

  return (
    <View className="flex-1 relative z-0 border-black ">
      {paginationTop && _data.length ? (
        <Pagination {...paginationProps} />
      ) : null}
      <Animated.FlatList
        {...flatListProps}
        decelerationRate="fast"
        contentContainerStyle={{
          alignItems: alignItems ? alignItems : "center",
          paddingHorizontal: marginX,
        }}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewChangedFunction}
      />
      {pagination && _data.length ? <Pagination {...paginationProps} /> : null}
      {controls && _data.length ? <Controls {...controlsProps} /> : null}
    </View>
  );
};

export default Swiper;
