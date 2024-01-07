// import Script from "next/script";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@components/loading/Loading";
import { useSbPlan } from "@hooks/sbplan/useSbPlan";
import { saveNewSbPlan } from "@models/SbPlans/createUtils";
import HandleDescription from "./HandleDescription";
import { gameAccessTypes } from "@models/AppSubscription/AppSubscription";
import { sbplansDuration } from "@models/SbPlans/interface";
import { currency } from "@templates/PaymentTemplate/SelectPlan";
import { planBenefits, planOfferings } from "@models/SbPlans/interface";
interface Props {
  uid: string;
  planId: string;
}

const AddSbPlanTemplate: React.FC<Props> = ({ planId, uid }) => {
  //   const { id } = useTestimonialParams();
  type planOfferingsKeys = keyof planOfferings;
  const keysOfPlanOfferings: planOfferingsKeys[] = [
    "nbDoctorConsultation",
    "nbDietConsultation",
    "nbLiveInteraction",
    "nbDailyVideoes",
    "nbPauseDays",
    "nbLiveClasses",
  ];
  type planBenefitsKeys = keyof planBenefits;
  const keysOfPlanBenefits: planBenefitsKeys[] = [
    "isAccountabilityCoach",
    "isAmaSessions",
    "isExpertBlogTips",
    "isPeriodTracker",
    "isRecipesAndDietTips",
    "isRewards",
    "isSleepTracker",
    "isWeeklyChallenges",
  ];
  const {
    onUpdateAppSubId,
    onUpdateBaseCost,
    onUpdateCost,
    onUpdateCurrency,
    onUpdateDescription,
    onUpdateDurationInDays,
    onUpdateDurationString,
    onUpdateFreeTrialDuration,
    onUpdateGameId,
    onUpdateMoneyBackDuration,
    onUpdateName,

    onUpdatePriority,
    onUpdateUsdBaseCost,
    onUpdateUsdCost,
    sbplans,
    addToDescList,
    removeFromDescList,
    onUpdateAppGameAccess,
    onTogglePinned,
    onToggleRecommend,
    onUpdateBenefits,
    onUpdateOfferings,
    onUpdateBaseText,
    onUpdateMostPopular,
    onUpdatePlanType,
  } = useSbPlan(uid, planId);
  // console.log(sbplans?.benefits);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (sbplans) {
        try {
          // console.log("testim", stories);
          await saveNewSbPlan(sbplans);
          router.push("/admin/sbplans");
          // setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div>
        <p className="text-gray-700 text-4xl font-semibold">Add Or Edit Plan</p>
      </div>
      <>
        {loading ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="py-8 mb-9">
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Name of plan"}
                label={"Name of plan"}
                variant="outlined"
                onChange={(val) => onUpdateName(val.target.value)}
                value={sbplans?.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Description"}
                helperText="120 characters only"
                label={"Description"}
                variant="outlined"
                onChange={(val) => onUpdateDescription(val.target.value)}
                value={sbplans?.description}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <HandleDescription
              sbplans={sbplans}
              addSteps={addToDescList}
              removeSteps={removeFromDescList}
            />
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Select Game Access Type"}
                label={"Game Access Type"}
                variant="outlined"
                onChange={(e) =>
                  onUpdateAppGameAccess(e.target.value as gameAccessTypes)
                }
                value={sbplans?.gameAcess || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="low_tier">Low Tier</MenuItem>
                <MenuItem value="mid_tier">Mid Tier</MenuItem>
                <MenuItem value="high_tier">High Tier</MenuItem>

                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Select Plan Duration"}
                label={"Plan Duration"}
                variant="outlined"
                onChange={(e) =>
                  onUpdateDurationString(e.target.value as sbplansDuration)
                }
                value={sbplans?.duration || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="THREE_MONTH">THREE_MONTH</MenuItem>
                <MenuItem value="ANNUAL">ANNUAL</MenuItem>

                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Select Currency"}
                label={"Currency"}
                variant="outlined"
                onChange={(e) => onUpdateCurrency(e.target.value as currency)}
                value={sbplans?.currency || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>

                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>
            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={sbplans?.planType === "proPlus" ? true : false}
                onChange={() =>
                  onUpdatePlanType(
                    sbplans?.planType === "proPlus" ? "pro" : "proPlus"
                  )
                }
              />
              <p className="text-gray-700">is PRO PLUS</p>
            </div>
            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={sbplans?.recommended ? true : false}
                onChange={() => onToggleRecommend(!sbplans?.recommended)}
              />
              <p className="text-gray-700">is Recommended</p>
            </div>
            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={sbplans?.pinned ? true : false}
                onChange={() => onTogglePinned(!sbplans?.pinned)}
              />
              <p className="text-gray-700">is Pinned</p>
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"gameId"}
                // helperText="120 characters only"
                label={"gameId"}
                variant="outlined"
                onChange={(val) => onUpdateGameId(val.target.value)}
                value={sbplans?.gameId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"App Subcription Id"}
                // helperText="120 characters only"
                label={"App Subcription Id"}
                variant="outlined"
                onChange={(val) => onUpdateAppSubId(val.target.value)}
                value={sbplans?.appSubId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Priority of this activity"}
                label={"Priority"}
                variant="outlined"
                onChange={(val) => onUpdatePriority(val.target.value)}
                value={sbplans?.priority}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"cost"}
                label={"cost"}
                variant="outlined"
                onChange={(val) => onUpdateCost(val.target.value)}
                value={sbplans?.cost}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"base cost"}
                label={"base cost"}
                variant="outlined"
                onChange={(val) => onUpdateBaseCost(val.target.value)}
                value={sbplans?.baseCost}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"usd cost"}
                label={"usd cost"}
                variant="outlined"
                onChange={(val) => onUpdateUsdCost(val.target.value)}
                value={sbplans?.usdCost}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"usd base cost"}
                label={"usd base cost"}
                variant="outlined"
                onChange={(val) => onUpdateUsdBaseCost(val.target.value)}
                value={sbplans?.usdBaseCost}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"duration In Days"}
                label={"duration in days"}
                variant="outlined"
                onChange={(val) => onUpdateDurationInDays(val.target.value)}
                value={sbplans?.durationInDays}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"free trial duration"}
                label={"free trial duration"}
                variant="outlined"
                onChange={(val) => onUpdateFreeTrialDuration(val.target.value)}
                value={sbplans?.freeTrialDuration}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"moneyback  duration"}
                label={"moneyback  duration"}
                variant="outlined"
                onChange={(val) => onUpdateMoneyBackDuration(val.target.value)}
                value={sbplans?.moneyBackDuration}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {keysOfPlanOfferings?.map((item) => {
              return (
                <>
                  <div className="py-4">
                    <TextField
                      style={{ width: "100%" }}
                      placeholder={item}
                      label={item}
                      variant="outlined"
                      onChange={(val) =>
                        onUpdateOfferings(item, val.target.value)
                      }
                      value={sbplans?.offerings?.[item]}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </>
              );
            })}
            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={sbplans?.mostPopular ? true : false}
                onChange={() =>
                  onUpdateMostPopular(sbplans?.mostPopular ? false : true)
                }
              />
              <p className="text-gray-700">Most Popular</p>
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Base Text"}
                label={"Base Text"}
                variant="outlined"
                onChange={(val) => onUpdateBaseText(val.target.value)}
                value={sbplans?.baseText}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {keysOfPlanBenefits?.map((item) => {
              return (
                <>
                  <div className="pr-4 flex items-center">
                    <Checkbox
                      key={item}
                      color="primary"
                      checked={sbplans?.benefits?.[item] ? true : false}
                      onChange={() =>
                        onUpdateBenefits(
                          item,
                          sbplans?.benefits?.[item] ? false : true
                        )
                      }
                    />
                    <p className="text-gray-700">{item}</p>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0  z-50">
        <BottomNavComV2 cta={"Save Plan"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddSbPlanTemplate;
