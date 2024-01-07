import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import NotificationTime from "@modules/NotificationTime";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";

import { useRoute } from "@react-navigation/native";

export interface NotificationTimeScreenParams {
  badgeId: string;
  goBack?: boolean;
}

const NotificationTimeScreen = () => {
  const route = useRoute();
  const params = route.params as NotificationTimeScreenParams;

  useScreenTrack();

  return (
    <SingleBadgeProvider badgeId={params.badgeId}>
      <Header back={true} headerColor="#232136" tone="dark" />
      <NotificationTime goBack={params.goBack} />
    </SingleBadgeProvider>
  );
};

export default NotificationTimeScreen;
