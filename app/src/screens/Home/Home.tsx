import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import SvgIcons from "@components/SvgIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";

import BlurBG from "@components/BlurBG";
import HomeScreen from "@modules/HomeScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ShopScreen from "@screens/ShopScreen";
import {
  // SubscriptionProvider,
  useSubscriptionContext,
} from "@providers/subscription/SubscriptionProvider";
import Knowledge from "@modules/Knowledge";
import { useRoute } from "@react-navigation/native";
import JourneyLogHome from "@modules/JourneyLogHome";
import PeriodTrackerScreen from "@screens/PeriodTrackerScreen";

const Tab = createBottomTabNavigator();

export type TabTypes =
  | "HomeTab"
  | "Ranking"
  | "Journey"
  | "Progress"
  | "JourneyLogs"
  | "Community"
  | "Knowledge"
  | "Shop"
  | "Period"
  | "Upgrade";
export type IconTypes =
  | "home"
  | "ranking"
  | "journey"
  | "journeyLog"
  | "progress"
  | "period"
  | "community"
  | "book"
  | "shop"
  | "upgrade";

const tabs: {
  name: TabTypes;
  icon: IconTypes;
  component: () => JSX.Element;
}[] = [
  { name: "HomeTab", icon: "home", component: HomeScreen },
  {
    name: "Period",
    icon: "period",
    component: PeriodTrackerScreen,
  },
  {
    name: "Progress",
    icon: "progress",
    component: JourneyLogHome,
  },
  {
    name: "Knowledge",
    icon: "book",

    component: Knowledge,
  },
  { name: "Shop", icon: "shop", component: ShopScreen },
];

const TabBarBackground = () => {
  return (
    <BlurBG
      style={{
        width: "100%",
        height: "100%",
      }}
      blurType="dark"
      blurAmount={35}
      fallbackColor="#100F1A"
    />
  );
};

interface IconProps {
  target: IconTypes;
  color: string;
}

const TabBarIcon: React.FC<IconProps> = ({ color, target }) => {
  const { subStatus } = useSubscriptionContext();

  return (
    <View className="flex justify-center items-center">
      <View className="w-3.5 iphoneX:w-5 aspect-square mb-1">
        <SvgIcons iconType={target} color={color} />
      </View>
      <Text
        className="text-[10px] iphoneX:text-xs capitalize"
        style={{ color, fontFamily: "Nunito-Regular" }}
      >
        {target === "upgrade" && subStatus === "SUBSCRIBED"
          ? "pro"
          : target === "book"
          ? "knowledge"
          : target}
      </Text>
    </View>
  );
};

export interface HomeParams {
  initialRouteName: TabTypes;
}

const Home = () => {
  const route = useRoute();
  const params = route.params as HomeParams | undefined;
  const insets = useSafeAreaInsets();
  const { state } = useAuthContext();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <SubscriptionProvider> */}
      <Tab.Navigator
        initialRouteName={params ? params.initialRouteName : "HomeTab"}
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarBackground: () => <TabBarBackground />,
          tabBarInactiveTintColor: "#FFFFFF99",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarStyle: {
            position: "absolute",
            height: 60 + insets.bottom,
          },
          tabBarShowLabel: false,
        }}
      >
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ color }) => (
                <TabBarIcon target={tab.icon} color={color} />
              ),
            }}
            listeners={{
              tabPress: () => {
                weEventTrack(
                  `tab_click${tab.name === "HomeTab" ? "Home" : tab.name}`,
                  {}
                );
              },
            }}
          />
        ))}
      </Tab.Navigator>
      {/* </SubscriptionProvider> */}
    </GameProvider>
  );
};

export default Home;
