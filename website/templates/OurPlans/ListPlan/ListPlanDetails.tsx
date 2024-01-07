import React, { useState } from "react";
import clsx from "clsx";
import ListPlanModal from "./ListPlanModal";
import { SbPlans } from "@models/SbPlans/interface";
import PlanDetailItem from "./PlanDetailItem";
import { getPrefixSuffix } from "@constants/organization";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { discriminator, modalContent, modalDetails } from "./constants";
import { useRouter } from "next/router";
import { planParams } from "../Components/PlanTypeToggler";

interface Props {
  plans: SbPlans[];
}

const ListPlanDetails: React.FC<Props> = ({ plans }) => {
  // const [selectedIndex, setSelectedIndex] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [modalC, setModalC] = useState<modalContent>();

  const onClose = () => setIsOpen(false);
  const onClickArrow = (imageURI?: string, text?: string) => {
    if (imageURI && text) {
      setIsOpen(true);
      setModalC({ imageURI, text });
    }
  };

  const router = useRouter();
  const q = router.query as planParams;

  const planType = q.type ? q.type : "pro";

  return (
    <div className="w-screen  max-w-screen-lg mx-auto mt-20 pb-20 relative z-0">
      <p className="text-white text-center capitalize font-popM text-2xl pb-4">
        Compare plans
      </p>
      <div className="grid grid-cols-4 gap-2 px-4">
        <div className="flex flex-col pt-4 relative">
          <p className="font-popSB text-white text-base opacity-0 sm:opacity-100 py-4">
            Offerings
          </p>

          {discriminator?.map((label, idx) => {
            const modalContent = modalDetails[label];

            // console.log("label", label);

            return (
              <div
                key={label}
                className={clsx(
                  "text-xs h-16 sm:h-12 text-white/70 py-4 font-popL cursor-pointer flex items-center",
                  label === "Weekly Challenges" && "mt-8 relative z-0",
                  // idx !== discriminator.length - 1 &&
                  "sm:border-b sm:border-white/20"
                )}
                onClick={() =>
                  onClickArrow(modalContent?.imageURI, modalContent?.text)
                }
              >
                <p className="">{label}</p>
                {modalContent ? (
                  <div className="">
                    <ChevronRightIcon className="w-4 aspect-[6/4] " />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {plans?.map((item) => {
          const duration = getPrefixSuffix(
            item.durationInDays ? item.durationInDays : 0
          );

          if (item.planType === planType)
            return (
              <div
                key={item.id}
                className="relative z-0 cursor-pointer"
                // onClick={() => setSelectedIndex(idx)}
              >
                <h2
                  className={clsx(
                    "font-popSB text-base py-4 text-center text-transparent bg-clip-text bg-gradient-to-b",
                    item.durationInDays === 30
                      ? "from-[#52F7D9]  to-[#0CBAFF]"
                      : item.durationInDays === 90
                      ? "from-[#FFAB71]  to-[#FF6D78]"
                      : item.durationInDays === 365
                      ? "from-[#E377FF]  to-[#FD5FB1]"
                      : ""
                  )}
                >
                  {duration.prefix} {duration.unit}
                </h2>

                <div
                  className={clsx(
                    "rounded-2xl p-4",
                    item.mostPopular && "bg-white/10"
                  )}
                >
                  <PlanDetailItem
                    showBorder={true}
                    label="Cost"
                    value={item?.cost ? `INR ${item?.cost}` : "-"}
                  />

                  <PlanDetailItem
                    showRight={!!item?.offerings?.nbLiveClasses}
                    showWrong={!item?.offerings?.nbLiveClasses}
                    showBorder={true}
                    label="Live classes"
                    value={
                      item?.offerings?.nbLiveClasses
                        ? `${item?.offerings?.nbLiveClasses} sessions`
                        : "No"
                    }
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Doctor Consultation"
                    value={
                      item?.offerings?.nbDoctorConsultation
                        ? item?.offerings?.nbDoctorConsultation
                        : "No"
                    }
                    showRight={
                      item?.offerings?.nbDoctorConsultation &&
                      item?.offerings?.nbDoctorConsultation > 0
                        ? true
                        : false
                    }
                    showWrong={
                      item?.offerings?.nbDoctorConsultation &&
                      item?.offerings?.nbDoctorConsultation > 0
                        ? false
                        : true
                    }
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Diet Consultation"
                    value={item?.offerings?.nbDietConsultation}
                    showRight={
                      item?.offerings?.nbDietConsultation &&
                      item?.offerings?.nbDietConsultation > 0
                        ? true
                        : false
                    }
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Daily Workout Videos"
                    value={`${item?.offerings?.nbDailyVideoes} Day Course`}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Accountability Coach"
                    value={item?.benefits?.isAccountabilityCoach ? "Yes" : "No"}
                    showRight={true}
                  />
                  {/* <PlanDetailItem
                    showBorder={true}
                    label="Live Interactions with Greesha"
                    value={item?.offerings?.nbLiveInteraction}
                  /> */}

                  <PlanDetailItem
                    showBorder={true}
                    label="Pause Functionality"
                    value={`${item?.offerings?.nbPauseDays} Days`}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Weekly Challenges"
                    value={item?.benefits?.isWeeklyChallenges ? "Yes" : "No"}
                    styleTw="mt-8"
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Period Tracker"
                    value={item?.benefits?.isPeriodTracker ? "Yes" : "No"}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="500+ Recipes & Diet tips"
                    value={item?.benefits?.isRecipesAndDietTips ? "Yes" : "No"}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Rewards to achieve"
                    value={item?.benefits?.isRewards ? "Yes" : "No"}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="250+ expert tips & Blogs"
                    value={item?.benefits?.isExpertBlogTips ? "Yes" : "No"}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Sleep Tracker"
                    value={item?.benefits?.isSleepTracker ? "Yes" : "No"}
                  />
                  <PlanDetailItem
                    showBorder={true}
                    label="Exclusive AMA’s & sessions with Experts"
                    value={item?.benefits?.isWeeklyChallenges ? "Yes" : "No"}
                  />
                </div>
              </div>
            );
        })}
      </div>
      <ListPlanModal
        isOpen={isOpen}
        text={modalC?.text}
        imgURI={modalC?.imageURI}
        onBackdrop={onClose}
        onClose={onClose}
      />
    </div>
  );
};

export default ListPlanDetails;
