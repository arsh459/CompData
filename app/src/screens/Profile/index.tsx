import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import EditProfile from "@modules/UserProfile/EditProfile";
// import { UserProvider } from "@providers/user/UserProvider";

const EditUserProfile = () => {
  useScreenTrack();
  return (
    // <UserProvider>
    <EditProfile />
    // </UserProvider>
  );
};

export default EditUserProfile;
