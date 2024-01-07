import Header from "@components/header";
// import FooterV2 from "@modules/footer/Footer";
import clsx from "clsx";
// import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";
import DefaultLayout from "@layouts/DefaultLayout";
import { applySEO } from "@constants/seo";
// import { useAuth } from "@hooks/auth/useAuth";
import FooterV2 from "@modules/footer/Footer";
import { useZoomAuth } from "@hooks/zoom/useZoomAuth";
// import { internalRequestZoomAccessToken } from "@hooks/zoom/authUtils";
import { internalGetZoomMeetings } from "@utils/zoom/meetings";
import { useState } from "react";
import { Meeting } from "@utils/zoom/getMeetings";
import ZoomCard from "@components/cards/meetingCard/zoomCard";
import Link from "next/link";
// import { requestZoomAccessToken } from "pages/api/zoom/utils/zoomToken";

interface Props {}

const InfluencerHome: React.FC<Props> = ({}) => {
  // const { authStatus, loadComplete } = useAuth();
  const { authToken } = useZoomAuth();

  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const getZoomMeetings = async () => {
    const meetingResponse = await internalGetZoomMeetings(
      authToken?.access_token
    );

    if (meetingResponse?.meetings) {
      setMeetings(meetingResponse?.meetings);
    }
  };

  //   console.log("auth status");
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
        <div id="form" className="w-screen h-screen">
          <div className="p-20">
            <button
              className="bg-gray-100 shadow-2xl w-52 h-52"
              onClick={getZoomMeetings}
            >
              get meetings
            </button>
          </div>

          <div className="p-20 flex">
            {meetings.map((item) => {
              return (
                <Link key={item.uuid} href={`/editEvent?id=${item.id}`}>
                  <div className="mr-4">
                    <ZoomCard
                      zoomMeeting={item}
                      images={[]}
                      cost={0}
                      currency="₹"
                      suffix=""
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-0 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InfluencerHome;
