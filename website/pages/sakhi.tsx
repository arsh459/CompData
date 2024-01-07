import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import SakhiExplainer from "@templates/SakhiExplainer";

interface Props {}

const SakhiExplainerScreen: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title="SocialBoat: Sakhi AI - A menstrual wellness asssistant"
      description="Meet Sakhi. An AI that takes your menstrual record as an input and generates personalised diet & workout recommendations."
      link="https://socialboat.live/sakhi"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/sakhi"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <SakhiExplainer />
    </DefaultLayout>
  );
};

export default SakhiExplainerScreen;
