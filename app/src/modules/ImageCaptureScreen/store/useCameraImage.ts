import { gptPrompts } from "@models/config/config";
import { AWSMedia } from "@models/Media/MediaTypeInterface";
import {
  handleImageUploadUsingBlob,
  handleImageUploadUsingPicker,
} from "@models/Tasks/createUtils";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { MealTypes } from "@models/Tasks/Task";
import { useUserStore } from "@providers/user/store/useUserStore";
import { CameraType, Camera } from "expo-camera";
import { FlipType, manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { create } from "zustand";
import {
  getImageAnalysisFromGpt,
  getImageNutritionAnalysisFromGpt,
} from "../utils/image";
import crashlytics from "@react-native-firebase/crashlytics";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { retryCalls } from "@modules/AddNewItemLoading/utils/gpt";

export interface CapturedImageInterface {
  height: number;
  width: number;
  uri: string;
  localUri?: string;
}

// stages
export type stageType =
  | "capturing"
  | "loadingImage"
  | "captured"
  | "uploading"
  | "uploadingError"
  | "scanning"
  | "scanned"
  | "scanningError"
  | "itemSelection"
  | "generating"
  | "generated"
  | "generatingError";

// request status
export type requestStatusInterface = "orphaned" | "ongoing" | "done";

interface CameraInterface {
  cameraType: CameraType;
  capturedImage: CapturedImageInterface | null;
  galleryImage: ImagePicker.ImagePickerResult | null;
  stage: stageType;
  genTaskId: string | undefined;
  mealType?: MealTypes;
  requestStatus: { [ingKey: string]: requestStatusInterface };
  requestId: string;
  generationId: string;
  itemsStringArray?: string[][];
  selectedItems: { [ingKey: string]: boolean };
  media?: AWSMedia;

  toggleCameraType: () => void;
  _takePicture: (camera: Camera | null) => Promise<void>;
  _retakePicture: () => void;
  _savePhoto: (
    apiKey: string,
    mealType: MealTypes,
    gptPrompt?: gptPrompts
  ) => Promise<void>;
  _saveGalleryPhoto: (
    apiKey: string,
    mealType: MealTypes,
    gptPrompt?: gptPrompts
  ) => Promise<void>;
  _savePhotoItemGeneration: (
    apiKey: string,
    media: AWSMedia,
    mealType: MealTypes,
    prevRequestId: string,
    gptPrompt?: gptPrompts
  ) => Promise<void>;
  _pickGalleryPhoto: (newPicture: ImagePicker.ImagePickerResult) => void;
  setMealType: (newMealType?: MealTypes) => void;
  renewGenerationId: () => void;
  toggleSelectedItem: (item: string, index: number, subIndex: number) => void;
  addSelectedItem: (item: string) => void;
  analyzeImage: (apiKey: string) => Promise<void>;
  setStage: (newStage: stageType) => void;
}

let rId = uuidv4();
let generationId = uuidv4();

const useCameraImage = create<CameraInterface>((set, get) => {
  return {
    cameraType: CameraType.back,
    capturedImage: null,
    stage: "capturing",
    genTaskId: undefined,
    galleryImage: null,
    mealType: undefined,
    requestStatus: { [rId]: "ongoing", [generationId]: "ongoing" },
    requestId: rId,
    generationId: generationId,
    itemsStringArray: undefined,
    selectedItems: {},

    setStage: (newStage: stageType) => {
      set((state) => ({ ...state, stage: newStage }));
    },

    addSelectedItem: (item: string) => {
      set((state) => {
        let selectedItems = { ...state.selectedItems, [item]: true };
        let itemsStringArray = state.itemsStringArray
          ? [[item], ...state.itemsStringArray]
          : [[item]];

        return {
          ...state,
          selectedItems: selectedItems,
          itemsStringArray: itemsStringArray,
        };
      });
    },

    renewGenerationId: () => {
      set((state) => {
        let prevGenerationId = state.generationId;
        let newGenerationId = uuidv4();
        return {
          ...state,
          generationId: newGenerationId,
          stage: "itemSelection",
          requestStatus: {
            ...state.requestStatus,
            [prevGenerationId]: "orphaned",
            [newGenerationId]: "ongoing",
          },
        };
      });
    },

    toggleCameraType: () => {
      set((state) => ({
        ...state,
        cameraType:
          state.cameraType === CameraType.back
            ? CameraType.front
            : CameraType.back,
      }));
    },

    _pickGalleryPhoto: (newPicture: ImagePicker.ImagePickerResult) => {
      if (newPicture.canceled) {
        weEventTrack("AiScan_GalleryImage_Cancelled", {
          canceled: newPicture.canceled ? "true" : "false",
        });
        set((state) => {
          return {
            ...state,
            cameraType: CameraType.back,
            capturedImage: null,
            stage: "capturing",
            genTaskId: undefined,
            media: undefined,
            galleryImage: null,
          };
        });
      } else {
        weEventTrack("AiScan_GalleryImage_Picked", {
          image: newPicture.assets[0].uri ? "true" : "false",
        });
        set((state) => ({
          ...state,
          capturedImage: {
            uri: newPicture.assets[0].uri,
            height: newPicture.assets[0].height,
            width: newPicture.assets[0].width,
          },
          stage: "captured",
          galleryImage: newPicture,
        }));
      }
    },

    _takePicture: async (camera: Camera | null) => {
      set((state) => ({
        ...state,
        stage: "loadingImage",
        capturedImage: null,
      }));
      const { cameraType } = get();

      try {
        if (camera) {
          weEventTrack("AiScan_PhotoClick", {
            cameraAvailable: "true",
          });
          let photo: {
            height: number;
            width: number;
            uri: string;
            localUri?: string;
          } = await camera.takePictureAsync();
          if (cameraType === CameraType.front) {
            photo = await manipulateAsync(
              photo.localUri || photo.uri,
              [{ rotate: 180 }, { flip: FlipType.Vertical }],
              { compress: 1, format: SaveFormat.PNG }
            );
          }
          if (photo) {
            weEventTrack("AiScan_PhotoClick_Success", {
              photoUri: photo.uri ? "true" : "false",
            });
            set((state) => ({
              ...state,
              stage: "captured",
              capturedImage: photo,
            }));
          } else {
            weEventTrack("AiScan_PhotoClick_Failed", {});
            set((state) => ({
              ...state,
              stage: "capturing",
              capturedImage: null,
            }));
          }
        }
      } catch (error) {
        console.log("Error in taking a picture", error);
        weEventTrack("AiScan_PhotoClick_Failed", {
          photoUri: "",
        });
        set((state) => ({
          ...state,
          stage: "capturing",
          capturedImage: null,
        }));
      }
    },

    setMealType: (newMealType?: MealTypes) => {
      set((state) => ({
        ...state,
        mealType: newMealType,
      }));
    },

    toggleSelectedItem: (item: string, index: number, subIndex: number) => {
      set((state) => {
        let selectedItem = state.selectedItems;
        let itemsArray = state.itemsStringArray ? state.itemsStringArray : [];
        let items = itemsArray[index];
        items.forEach((subItem, sIndex) => {
          if (sIndex !== subIndex) {
            selectedItem = { ...selectedItem, [subItem]: false };
          } else {
            selectedItem = {
              ...selectedItem,
              [subItem]: !selectedItem[subItem],
            };
          }
        });
        return {
          ...state,
          selectedItems: selectedItem,
        };
      });
    },

    _retakePicture: () => {
      let id = uuidv4();
      let generationId = uuidv4();
      set((state) => {
        let prevRequestid = state.requestId;
        let prevGenerationid = state.generationId;
        return {
          ...state,
          cameraType: CameraType.back,
          capturedImage: null,
          stage: "capturing",
          genTaskId: undefined,
          galleryImage: null,
          requestId: id,
          generationId: generationId,
          requestStatus: {
            ...state.requestStatus,
            [prevRequestid]: "orphaned",
            [id]: "ongoing",
            [prevGenerationid]: "orphaned",
            [generationId]: "ongoing",
          },
          itemsStringArray: undefined,
          media: undefined,
          selectedItem: {},
        };
      });
    },

    _savePhoto: async (
      apiKey: string,
      mealType: MealTypes,
      gptPrompt?: gptPrompts
    ) => {
      try {
        const { capturedImage, requestId } = get();
        const uid = useUserStore.getState().user?.uid;
        if (capturedImage) {
          weEventTrack("AiScan_PhotoSave", { imagePresent: "true" });
          set((state) => ({
            ...state,
            stage: "uploading",
          }));

          let analysisId = requestId;
          let data: AWSMedia | undefined = await handleImageUploadUsingBlob(
            capturedImage
          );
          if (data && uid) {
            weEventTrack("AiScan_PhotoSave_success", {
              mediaPresent: data && data.url ? "true" : "false",
            });
            set((state) => {
              if (state.requestStatus[analysisId] === "orphaned") {
                return state;
              }
              return {
                ...state,
                media: data,
                stage: "scanning",
              };
            });
            console.log("data url", data.url);
            get()._savePhotoItemGeneration(
              apiKey,
              data,
              mealType,
              analysisId,
              gptPrompt
            );
          } else {
            weEventTrack("AiScan_PhotoSave_failed", {
              media: "",
            });
            set((state) => {
              if (state.requestStatus[analysisId] === "orphaned") {
                state._retakePicture();
                return state;
              }
              return {
                ...state,
                stage: "uploadingError",
              };
            });
          }
        }
      } catch (error) {
        console.error("Error saving image: ", error);
        crashlytics().recordError(error as any);
        set((state) => ({
          ...state,
          stage: "capturing",
          capturedImage: null,
        }));
      }
    },
    _savePhotoItemGeneration: async (
      apiKey: string,
      media: AWSMedia,
      mealType: MealTypes,
      prevRequestId: string,
      gptPrompt?: gptPrompts
    ) => {
      try {
        weEventTrack("AiScan_PhotoScanning", {});
        // const { media } = get();
        const uid = useUserStore.getState().user?.uid;
        if (media && uid) {
          weEventTrack("AiScan_PhotoScanning_starting", {
            mediaPresent: "true",
          });

          let itemStringArray = await retryCalls(async () => {
            return await getImageAnalysisFromGpt(
              media.url,
              uid,
              apiKey,
              undefined,
              mealType,
              media,
              gptPrompt
            );
          }, 3);

          if (itemStringArray) {
            weEventTrack("AiScan_PhotoScanning_success", {});
            set((state) => {
              if (state.requestStatus[prevRequestId] === "orphaned") {
                state._retakePicture();
                return state;
              }
              let selectedItem = {};
              if (itemStringArray) {
                itemStringArray.forEach((item) => {
                  item.forEach((subItem, ind) => {
                    selectedItem = {
                      ...selectedItem,
                      [subItem]: ind === 0 ? true : false,
                    };
                  });
                });
              }
              return {
                ...state,
                stage: "scanned",
                itemsStringArray: itemStringArray,
                selectedItems: selectedItem,
              };
            });
          } else {
            weEventTrack("AiScan_PhotoScanning_Failed", {});
            set((state) => {
              if (state.requestStatus[prevRequestId] === "orphaned") {
                return state;
              }
              return {
                ...state,
                stage: "scanningError",
              };
            });
          }
        } else {
          set((state) => {
            if (state.requestStatus[prevRequestId] === "orphaned") {
              state._retakePicture();
              return state;
            }
            return {
              ...state,
              stage: "uploadingError",
            };
          });
        }
      } catch (error) {
        console.error("Error saving image: ", error);
        crashlytics().recordError(error as any);
        weEventTrack("AiScan_PhotoScanning_ServerError", {});
        set((state) => ({
          ...state,
          stage: "capturing",
          capturedImage: null,
        }));
      }
    },

    _saveGalleryPhoto: async (
      apiKey: string,
      mealType: MealTypes,
      gptPrompt?: gptPrompts
    ) => {
      try {
        set((state) => ({
          ...state,
          stage: "uploading",
          genTaskId: undefined,
        }));
        const uid = useUserStore.getState().user?.uid;
        const { galleryImage, requestId } = get();
        if (galleryImage && !galleryImage.canceled) {
          let analysisId = requestId;
          weEventTrack("AiScan_PhotoSave_uploadStarted", {
            requestId: analysisId,
          });
          let data: AWSMedia | undefined = await handleImageUploadUsingPicker(
            galleryImage
          );
          if (data && uid) {
            set((state) => {
              if (state.requestStatus[analysisId] === "orphaned") {
                return state;
              }

              weEventTrack("AiScan_PhotoSave_uploadSuccess", {
                requestId: analysisId,
              });
              return {
                ...state,
                media: data,
                stage: "scanning",
              };
            });
            get()._savePhotoItemGeneration(
              apiKey,
              data,
              mealType,
              analysisId,
              gptPrompt
            );
          } else {
            set((state) => {
              if (state.requestStatus[analysisId] === "orphaned") {
                return state;
              }
              weEventTrack("AiScan_PhotoSave_uploadFailed", {});
              return {
                ...state,
                stage: "uploadingError",
              };
            });
          }
        } else {
          set((state) => ({
            ...state,
            stage: "capturing",
            capturedImage: null,
          }));
        }
      } catch (error) {
        console.error("Error saving image: ", error);
        crashlytics().recordError(error as any);
        set((state) => ({
          ...state,
          stage: "capturing",
          capturedImage: null,
        }));
      }
    },

    analyzeImage: async (apiKey: string) => {
      const { media, selectedItems, mealType, generationId } = get();
      let prevGenerationId = generationId;
      try {
        set((state) => ({
          ...state,
          stage: "generating",
          genTaskId: undefined,
        }));
        const uid = useUserStore.getState().user?.uid;
        if (media && uid) {
          const itemsString = Object.keys(selectedItems)
            .filter((item) => {
              return selectedItems[item] === true;
            })
            .join(",");

          let taskId = await retryCalls(async () => {
            return await getImageNutritionAnalysisFromGpt(
              media.url,
              uid,
              itemsString,
              apiKey,
              undefined,
              mealType,
              media
            );
          }, 3);

          if (!taskId) {
            set((state) => {
              if (state.requestStatus[prevGenerationId] === "orphaned") {
                return state;
              }
              return {
                ...state,
                stage: "generatingError",
              };
            });
            return;
          }
          set((state) => {
            if (state.requestStatus[prevGenerationId] === "orphaned") {
              return state;
            }
            return {
              ...state,
              stage: "generated",
              genTaskId: taskId,
            };
          });
          return;
        }
        set((state) => {
          if (state.requestStatus[prevGenerationId] === "orphaned") {
            return state;
          }
          return {
            ...state,
            stage: "generatingError",
          };
        });
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
        set((state) => {
          if (state.requestStatus[prevGenerationId] === "orphaned") {
            return state;
          }
          return {
            ...state,
            stage: "generatingError",
          };
        });
      }
    },
  };
});

export default useCameraImage;
