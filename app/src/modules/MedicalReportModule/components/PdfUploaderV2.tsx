import { Dispatch, SetStateAction, useState } from "react";
import { View, TouchableOpacity, Platform, Text, Linking } from "react-native";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import storage from "@react-native-firebase/storage";
import clsx from "clsx";
import { uploadReport } from "@models/User/User";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import crashlytics from "@react-native-firebase/crashlytics";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import RNFetchBlob from "rn-fetch-blob";
import { loadingType } from "@screens/UploadReports";
import { handleStoragePermission } from "@modules/LifeStyleMain/permissionHandler";
import SvgIcons from "@components/SvgIcons";

interface Props {
  setReports: Dispatch<SetStateAction<uploadReport[]>>;
  setFileProgress: Dispatch<SetStateAction<{ [id: string]: number }>>;
  onSuccessUpload: (file: uploadReport) => Promise<void>;
}

const normaliseFiles = async (files: DocumentPickerResponse[]) => {
  const normalisedFiles: DocumentPickerResponse[] = [];
  for (const file of files) {
    const uri = file.uri;
    // console.log("uri", uri);
    const finalURI = await getPathForFirebaseStorage(uri);
    // console.log("finalURI", finalURI);
    normalisedFiles.push({
      ...file,
      uri: finalURI,
    });
  }

  return normalisedFiles;
};

const getPathForFirebaseStorage = async (uri: string) => {
  if (Platform.OS === "ios") {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};

const PdfUploaderV2: React.FC<Props> = ({
  setReports,
  setFileProgress,
  onSuccessUpload,
}) => {
  const [loadingState, setLoadingState] = useState<loadingType>("NONE");

  const handleFileUpload = async () => {
    weEventTrack("dietForm_uploadRequest", {});

    try {
      const res: DocumentPickerResponse | DocumentPickerResponse[] =
        await DocumentPicker.pick({
          allowMultiSelection: true,
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        });

      // console.log("res", res);

      const filesInt = Array.isArray(res) ? res : [res];
      const files = await normaliseFiles(filesInt);
      // console.log("files", files);
      const storageRef = storage().ref();

      files.forEach((file, index) => {
        const { uri, size } = file;

        const filename = uri.substring(uri.lastIndexOf("/") + 1);

        const uploadTask = storageRef.child(`pdfs/${filename}`).putFile(uri);

        const tempFile: uploadReport = {
          filename,

          id: uuidv4(),
          progress: 0,
          size: size ? size : 0,
          uploadedOn: Date.now(),
        };

        setReports((prev) => {
          return [...prev, tempFile];
        });
        setFileProgress((prev) => {
          return {
            ...prev,
            [tempFile.id]: 0,
          };
        });

        uploadTask.on(
          storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setFileProgress((prev) => {
              return {
                ...prev,
                [tempFile.id]: progress,
              };
            });

            if (snapshot.state === storage.TaskState.SUCCESS) {
              snapshot.ref
                .getDownloadURL()
                .then((downloadURL) => {
                  setFileProgress((prev) => {
                    return { ...prev, [tempFile.id]: 1 };
                  });

                  setLoadingState("NONE");
                  onSuccessUpload({
                    ...tempFile,
                    progress: 1,
                    url: downloadURL,
                  });
                })
                .catch((error) => {
                  console.log("Error getting download URL:", error);
                });
            }

            if (snapshot.state === storage.TaskState.ERROR) {
              setFileProgress((prev) => {
                return { ...prev, [tempFile.id]: -1 };
              });
            }
          },
          (error) => {
            setFileProgress((prev) => {
              return { ...prev, [tempFile.id]: -1 };
            });
            crashlytics().recordError(error);
          }
        );
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.log("Error picking PDF: ", err);
      }
    }
  };

  const mainFileUpload = async () => {
    const permissionStatus = await handleStoragePermission();

    if (permissionStatus) {
      setLoadingState("LOADING");
      await handleFileUpload();
    } else {
      setLoadingState("NO_PERMISSION");
    }
  };

  const openSettingsFunc = () => {
    Linking.openSettings();
    weEventTrack("reports_clickOpenSettings", {});
  };

  if (loadingState === "NO_PERMISSION") {
    return (
      <View className="flex-1">
        <Text className="text-white p-4 pt-8">
          Please give permissions to access your file system in the settings.
        </Text>

        <View className="flex justify-center items-center pt-4">
          <TouchableOpacity onPress={openSettingsFunc}>
            <Text className="text-sm text-white underline">Go to Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (loadingState === "LOADING") {
    return (
      <View
        style={{ backgroundColor: "rgba(81, 255, 140, 0.30)" }}
        className=" flex flex-row justify-between items-center w-full rounded-xl p-4"
      >
        <View className=" flex flex-row gap-2">
          <Text className=" text-xs text-[#51FF8C] font-semibold">
            Uploading your documents...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity className={clsx("w-full")} onPress={mainFileUpload}>
      <View className="">
        <View
          style={{ backgroundColor: "rgba(81, 255, 140, 0.30)" }}
          className=" flex flex-row justify-between items-center w-full rounded-xl p-4"
        >
          <View className=" flex flex-row gap-2">
            <Text className=" text-xs text-[#51FF8C] font-semibold">
              Attach a file or document
            </Text>
            <Text
              style={{ color: "rgba(241, 241, 241, 0.30)" }}
              className=" text-xs font-semibold"
            >
              PDF, Docx
            </Text>
          </View>
          <View className=" w-3 h-3">
            <SvgIcons iconType="greenPlus" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PdfUploaderV2;
