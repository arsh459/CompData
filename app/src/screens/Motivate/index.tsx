import Header from "@modules/Header";
import MotivateMain from "@modules/Motivate";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";
import { ProfileProvider } from "@providers/profile/ProfileProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface ViewerParams {
  viewerId: string;
}

const MotivateEarn = () => {
  // const [typeHeader, setTypeHeader] = useState<headerTypes>("transparent");
  const route = useRoute();
  const params = route.params as ViewerParams;

  useScreenTrack();

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        headerType="transparent"
        tone="dark"
      />
      <ProfileProvider userId={params.viewerId}>
        <MotivateMain />
      </ProfileProvider>
    </>
  );
};

export default MotivateEarn;
