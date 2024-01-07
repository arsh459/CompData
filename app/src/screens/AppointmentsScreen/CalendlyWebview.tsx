import { View, useWindowDimensions } from "react-native";
import Header from "@modules/Header";
import WebView from "react-native-webview";
import { CategoryTypes } from "@modules/Appointments/constants";

interface Props {
  cancelCalendlySession: () => void;
  id?: string;
  category?: CategoryTypes;
}

const CalendlyWebview: React.FC<Props> = ({
  id,
  category,
  cancelCalendlySession,
}) => {
  const { height } = useWindowDimensions();
  return (
    <View className="flex-1 w-full h-full">
      <Header back={true} onBack={cancelCalendlySession} />

      <View className="flex-1 w-full h-full">
        {id && category ? (
          <WebView
            startInLoadingState={true}
            originWhitelist={["*"]}
            source={{
              uri: `https://socialboat.live/calendlyV2?appointmentId=${id}&height=${height}&appType=${
                category ? category : "sales"
              }`,
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default CalendlyWebview;
