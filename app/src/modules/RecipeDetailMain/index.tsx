import {
  View,
  Text,
  // Image,
  TouchableOpacity,
} from "react-native";
import clsx from "clsx";
import { Task } from "@models/Tasks/Task";
import { useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { mealImage, timeIconWhiteFrame16 } from "@constants/imageKitURL";
import NutriValues from "@modules/Nutrition/Components/NutriValues";
import SvgIcons from "@components/SvgIcons";
import { percentageToFraction } from "./utils";
import ReelViewMain from "@modules/ReelViewMain";
import { getRoundedValue } from "@modules/MealMain/components/mealNutritionComps/MealNutriFacts";
import MediaTile from "@components/MediaCard/MediaTile";
import { useView } from "./useView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShareCta from "@modules/ReelViewMain/ShareCta";
// import CustomRecipeButton from "@screens/RecipeeDetailScreen/CustomRecipeButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import TimeIcon from "./TimeIcon";
import { useEffect } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import CustomRecipeButton from "@screens/RecipeeDetailScreen/CustomRecipeButton";

interface Props {
  task?: Task;
}

const RecipeDetailMain: React.FC<Props> = ({ task }) => {
  const { top } = useSafeAreaInsets();

  const [numberOfServing, setNumberOfServing] = useState(1);
  const [customRecipeData, setCustomRecipeData] = useState<Task[]>([]);
  useView("recipeSeen");

  // const route = useRoute();
  const navigation = useNavigation();

  const isVideo = task?.reelMedia?.resource_type === "video" ? true : false;

  const snapPoints = isVideo
    ? ["12%", top ? "90%" : "92%"]
    : ["75%", top ? "90%" : "92%"];

  const user = useUserStore((state) => state.user?.uid);

  function navigateToCustomRecipe(item: string) {
    weEventTrack("RecipeDetailScreen_customRecipe", {
      gptTaskId: item,
    });

    navigation.dispatch((state) => {
      const routes = state.routes;
      routes.push({
        key: `RecipeeDetailScreen-${Math.random() * 1000}`,
        name: "RecipeeDetailScreen",
        params: { taskId: item },
      });
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    // weEventTrack("CustomRecipe_success", {
    //   taskId: item,
    // });

    // navigation.navigate("RecipeeDetailScreen", { taskId: item });
  }

  function navigateToCustomizeRecipe() {
    weEventTrack("RecipeDetailScreen_customizeThisRecipe", {
      taskId: task?.id ? task.id : "no name",
    });
    navigation.navigate("CustomRecipeIngredientsScreen", {
      taskId: task?.id,
    });
  }

  useEffect(() => {
    if (task && user) {
      const unsubscribe = firestore()
        .collection("tasks")
        .where("userId", "==", user)
        .where("baseTaskId", "==", task.id)
        .onSnapshot((snapshot) => {
          const updatedData: Task[] = [];
          snapshot.forEach((doc) => {
            updatedData.push(doc.data() as Task);
          });
          setCustomRecipeData(updatedData);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [task, user]);

  return (
    <View style={{ flex: 1 }} className="bg-[#100F1A]">
      {isVideo ? (
        <ReelViewMain
          taskId={task?.id}
          media={task?.reelMedia}
          thumbnail={task?.reelThumbnail}
          name={task?.name}
          playbackId={task?.reelPlaybackId}
          deeplink={task?.deepLink}
          hideOverlays={true}
        />
      ) : (
        <View className="w-full aspect-[700/400]">
          {task?.reelMedia || task?.thumbnails ? (
            <MediaTile
              media={task?.reelMedia ? task.reelMedia : task?.thumbnails}
              fluid={true}
              paused={true}
              fluidResizeMode="cover"
            />
          ) : (
            <>
              <MediaTile
                media={task?.reelMedia ? task.reelMedia : task?.thumbnails}
                fluid={true}
                paused={true}
                fluidResizeMode="cover"
              />
            </>
          )}
        </View>
      )}

      <BottomSheet
        snapPoints={snapPoints}
        containerStyle={{ position: "relative", elevation: 2000, zIndex: 2000 }}
        backgroundStyle={{ backgroundColor: "#232136" }}
      >
        <BottomSheetScrollView>
          <View className="flex-1 px-4">
            <View className="flex flex-row justify-between pb-4">
              <View className="flex-1 pr-4">
                <Text
                  numberOfLines={2}
                  className="text-sm iphoneX:text-base font-bold leading-none text-white"
                >
                  {task?.name}
                </Text>

                {task?.description ? (
                  <Text
                    numberOfLines={4}
                    className="text-xs font-light leading-4 pt-2 text-[#FFFFFFCC]"
                  >
                    {task.description}
                  </Text>
                ) : null}
              </View>

              <ShareCta
                view="RecipeeDetailScreen"
                taskId={task?.id}
                thumbnail={task?.reelThumbnail}
                name={task?.name}
                description={task?.description}
                deeplink={task?.deepLink}
              />
            </View>

            {task?.readyIn ? (
              <View className="flex flex-row items-center pb-4">
                <FastImage
                  source={{ uri: timeIconWhiteFrame16 }}
                  className="w-4 aspect-square"
                />
                <Text className="pl-1.5 text-xs font-normal  text-[#FFFFFFCC]">
                  Ready in {task.readyIn} Mins
                </Text>
              </View>
            ) : null}

            {task?.ingredients?.length ? (
              <View className="bg-[#343150] p-4 rounded-xl">
                <View className="flex flex-row justify-between items-center pb-3">
                  <Text className="text-sm iphoneX:text-base font-bold  text-[#FFFFFF]">
                    Ingredients {"\n"}for serving {numberOfServing}
                  </Text>
                  <View className="bg-[#5D588C] rounded-lg flex flex-row  items-center p-2.5 px-4 justify-between w-1/3">
                    <TouchableOpacity
                      className="w-4 aspect-square"
                      onPress={() =>
                        setNumberOfServing((p) => (p > 1 ? p - 1 : 1))
                      }
                    >
                      <SvgIcons iconType="minus" color="#FF5981" />
                    </TouchableOpacity>
                    <Text className="text-xs font-bold px-2.5 text-[#FFFFFFCC]">
                      {numberOfServing}
                    </Text>
                    <TouchableOpacity
                      className="w-4 h-4"
                      onPress={() => setNumberOfServing((p) => p + 1)}
                    >
                      <SvgIcons iconType="plus" color="#51FF8C" />
                    </TouchableOpacity>
                  </View>
                </View>
                {task?.ingredients &&
                  task?.ingredients.map((item, index) => {
                    const value = Number(item.qty) * numberOfServing;
                    return (
                      <View
                        className="flex flex-row justify-between pb-3"
                        key={`${item.name}-${index}`}
                      >
                        <Text className="text-xs font-normal capitalize  text-[#FFFFFFCC]">
                          {item.name}
                        </Text>
                        <Text className="text-xs font-normal  text-[#FFFFFFCC]">
                          {percentageToFraction(value)} {item.unit}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ) : null}
            <View className="p-4 bg-[#343150] rounded-xl mt-4">
              <View className="flex flex-row justify-between pb-3">
                <Text className="text-sm iphoneX:text-base font-bold  text-[#FFFFFF]">
                  Nutritional Value
                </Text>
                <Text className="text-sm iphoneX:text-base font-bold  text-[#FFFFFF]">
                  {task?.kcal}kcal
                </Text>
              </View>
              <View className="flex flex-row">
                <NutriValues
                  value={getRoundedValue(task?.nutritionFacts?.protein)}
                  text={"protein"}
                  isWhite={true}
                />
                <View className="w-3 aspect-square" />
                <NutriValues
                  value={getRoundedValue(task?.nutritionFacts?.fibre)}
                  text={"fibre"}
                  isWhite={true}
                />
              </View>
              <View className="w-3 aspect-square" />
              <View className="flex flex-row">
                <NutriValues
                  value={getRoundedValue(task?.nutritionFacts?.fats)}
                  text={"fats"}
                  isWhite={true}
                />
                <View className="w-3 aspect-square" />
                <NutriValues
                  value={getRoundedValue(task?.nutritionFacts?.carbs)}
                  text={"carbs"}
                  isWhite={true}
                />
              </View>
            </View>
            {task?.cookingInstruction?.length ? (
              <View className="p-4 bg-[#343150] rounded-xl mt-4">
                <Text className="text-sm iphoneX:text-base font-bold pb-4 text-[#FFFFFF]">
                  How to cook
                </Text>
                {task?.cookingInstruction &&
                  task?.cookingInstruction.map((instruction, index) => {
                    return (
                      <View
                        className="p-4 bg-[#4C4873] mb-3 rounded-xl"
                        key={`${instruction}_${index}`}
                      >
                        <Text className="text-xs font-light leading-4  text-[#FFFFFFCC]">
                          <Text className="font-bold">{index + 1}.</Text>{" "}
                          {instruction}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ) : null}
          </View>
          <View className="h-4"></View>

          {/* My Custom Recipes */}
          {customRecipeData.length > 0 && (
            <View className="px-4 mt-4 mb-6">
              <View>
                <Text className="text-[#fff] text-sm iphoneX:text-base font-bold ">
                  My Custom Recipes
                </Text>
              </View>

              <ScrollView horizontal={true}>
                {customRecipeData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      className="mt-4 mr-4"
                      key={item.name + "-" + index}
                      onPress={() => {
                        navigateToCustomRecipe(item.id);
                      }}
                    >
                      <View className="flex flex-row  rounded-lg p-3 bg-[#343150] w-72">
                        <View className="w-[70] rounded-lg overflow-hidden aspect-[400/400] mr-4">
                          {item?.thumbnails || item?.videoThumbnail ? (
                            <MediaTile
                              media={
                                item?.thumbnails
                                  ? item?.thumbnails
                                  : item?.videoThumbnail
                              }
                              fluid={true}
                              paused={true}
                              fluidResizeMode="cover"
                            />
                          ) : (
                            <>
                              <View
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <FastImage
                                  source={{ uri: mealImage }}
                                  className={clsx(
                                    "absolute left-0 right-0 top-0 bottom-0 z-10"
                                  )}
                                  resizeMode={"contain"}
                                />
                              </View>
                            </>
                          )}
                        </View>
                        {/* <View className="mr-4">
                          <FastImage
                            className="w-[70] h-[70] rounded-lg"
                            source={{
                              uri: item.gptImageUrl,
                            }}
                          />
                        </View> */}
                        <View className=" flex-1 justify-between">
                          <View>
                            <Text
                              numberOfLines={2}
                              className="text-[#fff] text-sm iphoneX:text-base"
                            >
                              {item.name}
                            </Text>
                          </View>
                          <View className="flex flex-row mt-1  items-center ">
                            <View className="w-3 h-3 mr-1 ">
                              <TimeIcon />
                            </View>
                            <View className="">
                              <Text className="text-[#ffffffcc] text-xs">
                                {item.readyIn} Mins
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </BottomSheetScrollView>

        {/*  Customize this recipe button */}
        {!task?.baseTaskId && (
          <View className="bg-[#232136]">
            <View className="bg-[#343150] rounded-t-[18px] ">
              <CustomRecipeButton
                isIconSvg={true}
                iconType="CustomRecipe"
                onPress={navigateToCustomizeRecipe}
                text="Customise this Recipe"
              />
            </View>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

export default RecipeDetailMain;
