import { useState, useEffect } from "react";
import Link from "next/link";
import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import clsx from "clsx";

interface Props {
  numUsers?: number;
  title?: string;
  showImages?: boolean;
  buttonTitle?: string;
  route: string;
}

const OverlayButton: React.FC<Props> = ({
  numUsers,
  showImages = true,
  title,
  buttonTitle,
  route,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  // const { participantsCount } = useParticipants();

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const targetSection = document.getElementById("faqSection");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (targetSection) {
        const sectionTop = targetSection.offsetTop - 80;

        if (
          scrollY >= sectionTop ||
          (scrollY < screenHeight - 200 && width > 1024)
        ) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (width > 1024) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [width]);

  return (
    <>
      {isVisible ? (
        <>
          <div className="w-full xs:px-0 lg:px-4 bg-white bg-opacity-10 xs:backdrop-blur-lg  border border-white border-opacity-10 xs:flex xs:flex-col md:flex-row md:justify-around fixed right-0 backdrop-blur-3xl left-0 bottom-0 z-50">
            <div
              className={clsx(
                "flex items-center xs:border xs:border-white xs:border-opacity-10 md:border-none",
                showImages ? "" : "justify-center"
              )}
            >
              <div className="font-pJSL text-zinc-100 text-opacity-80 md:text-3xl font-bold leading-9 xs:text-lg xs:leading-snug   xs:py-2 xs:px-4 ">
                {title ? title : "The Habit Builder Challenge"}
              </div>
            </div>
            <div
              className={clsx(
                "flex  xs:py-2 xs:px-4",
                showImages
                  ? "xs:justify-between"
                  : "justify-center sm:justify-center"
              )}
            >
              {showImages ? (
                <div className="flex xs:w-40 md:w-48 justify-between items-center ">
                  <div className="mr-4 ">
                    <div className="w-14 h-7">
                      <img
                        src="https://ik.imagekit.io/socialboat/Frame%201000001120%20(1)_3bdAeTdxt.png?updatedAt=1696830050845"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="text-zinc-100 text-opacity-80 xs:text-xs md:text-sm font-bold font-pJSEL leading-none pr-2">
                    {numUsers} {numUsers === 1 ? "person" : "people"} Joined
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-center">
                <div className=" text-center text-purple-900 text-xs bg-[#A8E723] font-medium font-['Poppins'] tracking-tight rounded-full flex items-center justify-center">
                  <Link passHref href={route} className="">
                    <p className=" text-center text-[#521D7A] px-8 py-3 font-popM text-base">
                      {buttonTitle ? buttonTitle : "Start Challenge"}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OverlayButton;
