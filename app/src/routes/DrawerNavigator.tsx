import { createDrawerNavigator } from "@react-navigation/drawer";
// import { UserProvider } from "@providers/user/UserProvider";
import AppDrawer from "@modules/Drawer";
import MyCurrentPlan from "@screens/MyCurrentPlan";
import Home from "@screens/Home/Home";
import { useRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const route = useRoute();

  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={() => (
        // <UserProvider>
        <AppDrawer tone="dark" />
        // </UserProvider>
      )}
      useLegacyImplementation={false}
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 1,
        headerShown: false,
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={Home}
        initialParams={route.params}
      ></Drawer.Screen>
      <Drawer.Screen
        name="MyCurrentPlan"
        component={MyCurrentPlan}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
