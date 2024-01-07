import Loading from "@components/loading/Loading";
import { useUserAppSub } from "@hooks/appSubs";
import { saveUserSubscription } from "@models/AppSubscription/createAppSubscription";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";

interface Props {
  planId: string;
  subId: string;
}

const AppSubDashboard: React.FC<Props> = ({ planId, subId }) => {
  const router = useRouter();

  const {
    appPlan,
    loading,
    onUpdatePaidUnix,
    onUpdatePaidValue,
    onUpdatePlanName,
    setLoading,
  } = useUserAppSub(planId, subId);
  console.log({ appPlan, loading });
  const onSave = async () => {
    if (loading === false) {
      console.log("task", appPlan);

      if (appPlan) {
        try {
          setLoading(true);
          await saveUserSubscription(appPlan, planId);
          router.back();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };
  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div>
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-1/2 mx-auto relative z-0">
          <div className="py-10">
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Do not change name unless needed"
                label={"Last Plan Name"}
                // variant="outlined"
                onChange={(val) => onUpdatePlanName(val.target.value)}
                value={appPlan?.lastPlanName}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Last Paid Unix"
                label={"Last Paid Unix"}
                // variant="outlined"
                onChange={(val) => onUpdatePaidUnix(val.target.value)}
                value={appPlan?.lastPaidUnix}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Last Paid Value"
                label={"Last Paid Value"}
                // variant="outlined"
                onChange={(val) => onUpdatePaidValue(val.target.value)}
                value={appPlan?.lastPaidValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {/* <div className="py-4">
              {appPlan?.lastPaidCurrency ? (
                <CurrencySwitch
                  selectedCurrency={appPlan?.lastPaidCurrency}
                  onChange={onUpdatePaidCurrency}
                />
              ) : null}
            </div> */}
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <BottomNavComV2 cta={"Save Plan"} onClick={onSave} />
          </div>
        </div>
      )}
    </>
  );
};

export default AppSubDashboard;
