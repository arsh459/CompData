import { AuthProvider } from "@providers/auth/AuthProvider";
import { ConfigProvider } from "@providers/Config/ConfigProvider";
import { DNProvider } from "@providers/dnLinks/DNProvider";
import { NotificationPermissionProvider } from "@providers/notificationPermissions/NotificationPermissionProvider";
import { UserProvider } from "@providers/user/UserProvider";
import MainStackNavigator from "./MainStack";
import { TestimonialsProvider } from "@providers/testimonials/TestimonialsProvider";
import { BootcampProvider } from "@providers/bootcamp/BootcampProvider";
// import { AfterInteractions } from "react-native-interactions";
// import { View } from "react-native";

const AuthWrappedMainStack = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <UserProvider>
          <BootcampProvider>
            <DNProvider>
              <NotificationPermissionProvider>
                <TestimonialsProvider>
                  <MainStackNavigator />
                </TestimonialsProvider>
              </NotificationPermissionProvider>
            </DNProvider>
          </BootcampProvider>
        </UserProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default AuthWrappedMainStack;
