import { testimonialSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import AddTestimonialTemplate from "@templates/TestimonialTemplate";

interface Props {}

const AddTestimonial: React.FC<Props> = ({}) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  return (
    <DefaultLayout
      title={testimonialSEO.title}
      link={testimonialSEO.link}
      canonical={testimonialSEO.link}
      img={testimonialSEO.img}
      noIndex={true}
      description={testimonialSEO.description}
    >
      {authStatus === "PENDING" ? (
        <></>
      ) : authStatus === "SUCCESS" && user ? (
        <div>
          <AddTestimonialTemplate user={user} />
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      )}

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </DefaultLayout>
  );
};

export default AddTestimonial;
