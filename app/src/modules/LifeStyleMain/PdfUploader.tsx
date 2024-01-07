import { Dispatch, SetStateAction, useState } from "react";
import { View, TouchableOpacity, Platform, Text, Linking } from "react-native";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import storage from "@react-native-firebase/storage";
import clsx from "clsx";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { ScrollView } from "react-native";
import { uploadReport } from "@models/User/User";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import crashlytics from "@react-native-firebase/crashlytics";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import PdfPickButton from "./PdfPickButton";
import RNFetchBlob from "rn-fetch-blob";
import { handleStoragePermission } from "./permissionHandler";
import { loadingType } from "@screens/UploadReports";

interface Props {
  onSkip: () => void;
  setReports: Dispatch<SetStateAction<uploadReport[]>>;
  setFileProgress: Dispatch<SetStateAction<{ [id: string]: number }>>;
  children?: React.ReactNode;
  onSuccessUpload: (file: uploadReport) => Promise<void>;
}

const normaliseFiles = async (files: DocumentPickerResponse[]) => {
  const normalisedFiles: DocumentPickerResponse[] = [];
  for (const file of files) {
    const uri = file.uri;
    console.log("uri", uri);
    const finalURI = await getPathForFirebaseStorage(uri);
    console.log("finalURI", finalURI);
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

const PdfUploader: React.FC<Props> = ({
  onSkip,
  setReports,
  children,
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

      console.log("res", res);

      const filesInt = Array.isArray(res) ? res : [res];
      const files = await normaliseFiles(filesInt);
      console.log("files", files);
      const storageRef = storage().ref();

      files.forEach((file, index) => {
        const { uri, size } = file;

        const filename = uri.substring(uri.lastIndexOf("/") + 1);

        const uploadTask = storageRef.child(`pdfs/${filename}`).putFile(uri);

        const tempFile: uploadReport = {
          filename,

          id: uuidv4(),
          progress: 0,
          uploadedOn: Date.now(),
          size: size ? size : 0,
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
      await handleFileUpload();
      setLoadingState("NONE");
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
  }

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ScrollView className="flex-1 ">
          {/* {picked ? null : ( */}
          <TouchableOpacity
            className={clsx(" mx-4 px-4 pt-4")}
            onPress={mainFileUpload}
          >
            <PdfPickButton />
          </TouchableOpacity>
          {children}
        </ScrollView>
      </View>

      <View className="w-11/12 mx-auto pb-2">
        <StartButton
          title="Skip this for now"
          textColor="text-white"
          roundedStr="rounded-2xl border border-white"
          textStyle="py-2 text-center text-xl"
          onPress={onSkip}
          fontFamily="Nunito-Regular"
        />
      </View>
    </View>
  );
};

export default PdfUploader;
