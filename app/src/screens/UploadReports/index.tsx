import { View } from "react-native";
import { useEffect, useState } from "react";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import PdfUploader from "@modules/LifeStyleMain/PdfUploader";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDailyFocus } from "@screens/DailyFocusStart";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import PdfUploadCard from "@modules/LifeStyleMain/PdfUploadCard";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { uploadReport } from "@models/User/User";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type loadingType = "NO_PERMISSION" | "LOADING" | "NONE";

const UploadReports = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, uploadedReportsDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      uploadedReportsDB: user?.dietForm?.uploadedReports,
    };
  }, shallow);

  const [fileReports, setReports] = useState<uploadReport[]>([]);
  const [fileProgress, setFileProgress] = useState<{
    [id: string]: number;
  }>({});

  useEffect(() => {
    if (uploadedReportsDB) {
      setReports(uploadedReportsDB);
    }
  }, [uploadedReportsDB]);

  const navigation = useNavigation();

  const onSuccessUpload = async (file: uploadReport) => {
    if (file.url) {
      const updatedFile: uploadReport = {
        ...file,
        progress: 1,
      };

      await updateUserField(uid, {
        [`dietForm.uploadedReports`]:
          firestore.FieldValue.arrayUnion(updatedFile),
      });

      setReports((prev) => {
        return prev?.map((item) => {
          if (item.id === file.id) {
            return file;
          } else {
            return item;
          }
        });
      });

      setFileProgress((prev) => {
        return {
          ...prev,
          [file.id]: 1,
        };
      });
    }
  };

  const handlePress = () => {
    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DailyLifeStyleStart");
    }
  };

  const onProceed = async () => {
    handlePress();
    weEventTrack("dietFormFileUpload_clickProceed", {});
  };

  const onSkip = () => {
    handlePress();
    weEventTrack("dietFormFileUpload_clickSkip", {});
  };

  const onDelete = async (id: string) => {
    if (id) {
      const filteredValue = fileReports?.filter((i) => i.id !== id);

      await updateUserField(uid, {
        [`dietForm.uploadedReports`]: filteredValue.length
          ? filteredValue
          : firestore.FieldValue.delete(),
      });

      setReports(filteredValue);
      weEventTrack("dietForm_deleteReport", {});
    }
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={5 / totalDailyFocus}
            heading="Daily Focus"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="Please upload your recent blood reports if any?"
      >
        <PdfUploader
          onSkip={onSkip}
          setReports={setReports}
          setFileProgress={setFileProgress}
          onSuccessUpload={onSuccessUpload}
        >
          <View className="flex-1">
            {fileReports?.map((report, index) => {
              const progress = fileProgress[report.id];

              return (
                <View
                  className="flex justify-center items-center  pt-4 mx-4 px-4"
                  key={report.id}
                >
                  {progress === -1 ? (
                    <PdfUploadCard
                      progress={progress * 100}
                      canDelete={false}
                      name={"File could not be uploaded"}
                      styleTw="bg-[#FF0000]/20"
                    />
                  ) : (
                    <PdfUploadCard
                      progress={progress * 100}
                      canDelete={report.url ? true : false}
                      onDelete={() => onDelete(report.id)}
                      name={report.filename}
                      size={report.size}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </PdfUploader>
      </OnboardLifeStyle>
    </View>
  );
};

export default UploadReports;
