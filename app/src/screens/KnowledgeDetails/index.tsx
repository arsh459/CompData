import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import SinglePost from "@modules/Knowledge/SinglePost";
import { useRoute } from "@react-navigation/native";

export interface KnowledgeDetailsProps {
  postId: string;
}

const KnowledgeDetails = () => {
  const route = useRoute();
  const params = route.params as KnowledgeDetailsProps;

  useScreenTrack();

  return (
    <>
      <Header
        back={true}
        tone="light"
        headerColor="#FFFFFF"
        headerType="transparent"
      />
      <SinglePost postId={params.postId} />
    </>
  );
};

export default KnowledgeDetails;
