import Header from "@components/header";
// import FooterV2 from "@modules/footer/Footer";
import clsx from "clsx";
// import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";
import DefaultLayout from "@layouts/DefaultLayout";
import { applySEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import FooterV2 from "@modules/footer/Footer";
// import PhoneForm from "./Form/PhoneForm";
import Link from "next/link";
import { redirectZoomLink } from "@hooks/zoom/interface/constants";

interface Props {}

const InboxTemplate: React.FC<Props> = ({}) => {
  const { authStatus, loadComplete } = useAuth();
  // useZoomAuth();
  // console.log("auth status");
  return (
    <DefaultLayout
      title={applySEO.title}
      link={applySEO.link}
      canonical={applySEO.link}
      img={applySEO.img}
      noIndex={false}
      description={applySEO.description}
    >
      <div>
        <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header />
          </div>
        </div>
        {/* <div id="form" className="w-screen h-screen"></div> */}
        <div
          className={clsx(
            // "pt-16",
            // "flex items-center",
            "bg-gradient-to-b from-transparent to-gray-50",
            "h-[100vh]"
          )}
        >
          {authStatus === "SUCCESS" ? (
            <Link legacyBehavior href={redirectZoomLink}>
              <a target="_blank">
                <div className="bg-blue-50 pt-40 pl-20">
                  <button>Hi</button>
                </div>
              </a>
            </Link>
          ) : null}
          <div
            className={authStatus !== "SUCCESS" && loadComplete ? "" : "hidden"}
          >
            {/* <PhoneForm /> */}
          </div>
        </div>

        <div className="pt-0 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InboxTemplate;
