import { View, ScrollView } from "react-native";
import Header from "@modules/Header";
import { useEffect, useState } from "react";
import FileViewTile from "@components/FileViewTile";
import { useUserStore } from "@providers/user/store/useUserStore";
import PdfUploaderV2 from "./components/PdfUploaderV2";
import { uploadReport } from "@models/User/User";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import firestore from "@react-native-firebase/firestore";
import { shallow } from "zustand/shallow";

const MedicalReportModule = () => {
  const [fileReports, setReports] = useState<uploadReport[]>([]);
  const [fileProgress, setFileProgress] = useState<{
    [id: string]: number;
  }>({});
  const { uploadedReports, uid } = useUserStore(({ user }) => {
    return {
      uploadedReports: user?.dietForm?.uploadedReports,
      uid: user?.uid,
    };
  }, shallow);

  // console.log("uploaded reports", uploadedReports);

  useEffect(() => {
    if (uploadedReports) {
      setReports(uploadedReports);
    }
  }, [uploadedReports]);

  const onSuccessUpload = async (file: uploadReport) => {
    if (file.url) {
      const updatedFile: uploadReport = {
        ...file,
        progress: 1,
      };

      // saves in db
      await updateUserField(uid, {
        [`dietForm.uploadedReports`]:
          firestore.FieldValue.arrayUnion(updatedFile),
      });

      // setReports((prev) => {
      //   return prev?.map((item) => {
      //     if (item.id === file.id) {
      //       return file;
      //     } else {
      //       return item;
      //     }
      //   });
      // });

      setFileProgress((prev) => {
        return {
          ...prev,
          [file.id]: 1,
        };
      });
    }
  };

  return (
    <View className="flex-1 w-full h-full">
      <Header
        back={true}
        title="My Medical Reports"
        centerTitle={true}
        headerColor="#232136"
        tone="dark"
      />
      <View className="relative flex-1 justify-start items-center w-full h-full bg-[#232136] pt-7 px-4">
        <ScrollView className="flex-1 w-full z-0">
          {fileReports?.map((item) => {
            if (
              item.url ||
              (typeof item.progress === "number" &&
                item.progress > 0 &&
                item.progress < 1)
            )
              return (
                <View key={item.id} className="w-full  pb-2">
                  <FileViewTile
                    fileName={item.filename}
                    downloadUrl={item.url}
                    download={true}
                    progress={fileProgress[item.id]}
                    uri={item.url}
                    id={item.id}
                  />
                </View>
              );
          })}
          {/* {uploadedReports?.map((item) => {
            return (
              <View
                key={item.id}
                className="w-full h-20 pb-2"
              >
                <FileViewTile uri={item.url} id={item.id} />
              </View>
            );
          })} */}
          <View key={"xyz"} className="w-full h-20 pb-2">
            {/* <FileViewTile uri={item.url} id={item.id} /> */}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 z-20 left-0 right-0 h-20 px-8">
          <PdfUploaderV2
            setReports={setReports}
            setFileProgress={setFileProgress}
            onSuccessUpload={onSuccessUpload}
          />
        </View>

        {/* <View className=" w-full border border-white">
          <ScrollView className="w-full">
            {uploadedReports?.map((item) => {
              return (
                <View key={item.id}>
                  <FileViewTile uri={item.url} id={item.id} />
                </View>
              );
            })}
          </ScrollView>

          <View className="absolute border border-white bottom-0">
            <View className="w-full">
              <Text className="text-white"></Text>
            </View>
            <PdfUploaderV2
              // setReports={setReports}
              setFileProgress={setFileProgress}
              onSuccessUpload={onSuccessUpload}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default MedicalReportModule;
