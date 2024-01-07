import { blogBgImg } from "@constants/icons/iconURLs";
import SelectEmail from "@modules/Interests/SelectEmail";
import SelectInterestTag from "@modules/Interests/SelectInterestTags";
import { validateEmail } from "@modules/Interests/utils";
import LandingHeaderV2 from "@templates/LandingPage/V2/components/LandingHeaderV2";
import { Background } from "@templates/WomenTemplate/components/Background";
import { Tag } from "@tryghost/content-api";
import { getTags } from "@utils/ghostutils";
import { GetStaticProps } from "next";
import React, { useState } from "react";
interface Props {
  tags: (Tag | undefined)[];
}
const Interests: React.FC<Props> = ({ tags }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [show, setshow] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };
  const onNextHandle = () => setshow((p) => !p);
  return (
    <div className="w-screen h-screen relative z-0">
      <Background imgUrl={blogBgImg} />
      <LandingHeaderV2 btnText="Connect to us" />
      {!show && <SelectInterestTag tags={tags} onNextHandle={onNextHandle} />}

      {show && (
        <SelectEmail
          handleChange={handleChange}
          email={email}
          error={error}
          onNextHandle={onNextHandle}
        />
      )}
    </div>
  );
};

export default Interests;
export const getStaticProps: GetStaticProps = async () => {
  const { tags } = await getTags();

  return {
    revalidate: false,
    props: {
      tags,
    },
  };
};
