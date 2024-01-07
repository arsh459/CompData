import { Activity } from "@models/Activities/Activity";
import UnpairWearable from "./UnpairWearable";
import { useAllDayActivitiesData } from "@hooks/activities/useAllDayActivitiesData";
import { TerraUser } from "@models/Terra/TerraUser";

interface Props {
  uid: string;
  activities: Activity[];
  terraUser: TerraUser | undefined;
  gotoComponent: () => void;
}

const WearableData: React.FC<Props> = ({
  uid,
  activities,
  terraUser,
  gotoComponent,
}) => {
  const { calories, fitpoints, duration } = useAllDayActivitiesData(activities);

  return (
    <div className="bg-[#FBFCFC] p-4 rounded-3xl w-full relative">
      <div className="flex justify-center items-center pb-4">
        <svg width="15" height="22" viewBox="0 0 17 24">
          <path
            d="M13.4554 0H3.54457L2.22857 6.6058C0.795133 8.0783 0 10.0029 0 12C0 13.9971 0.795133 15.9217 2.22857 17.3942L3.54457 24H13.4554L14.7714 17.3942C16.2049 15.9217 17 13.9971 17 12C17 10.0029 16.2049 8.0783 14.7714 6.6058L13.4554 0ZM4.95546 1.6H12.0445L12.7352 5.06555C11.447 4.36744 9.98665 4 8.50021 4C7.01378 4 5.55341 4.36744 4.26527 5.06555L4.95546 1.6ZM12.0445 22.4H4.95546L4.26484 18.9345C5.55299 19.6326 7.01335 20 8.49979 20C9.98622 20 11.4466 19.6326 12.7347 18.9345L12.0445 22.4ZM8.5 18.4C7.15509 18.4 5.84039 18.0246 4.72214 17.3214C3.60389 16.6182 2.73232 15.6186 2.21765 14.4492C1.70297 13.2797 1.56831 11.9929 1.83069 10.7514C2.09307 9.50994 2.7407 8.36957 3.69169 7.47452C4.64269 6.57946 5.85433 5.96992 7.17339 5.72297C8.49246 5.47603 9.8597 5.60277 11.1022 6.08717C12.3448 6.57157 13.4068 7.39188 14.154 8.44435C14.9012 9.49683 15.3 10.7342 15.3 12C15.2979 13.6968 14.5809 15.3235 13.3061 16.5234C12.0313 17.7232 10.3028 18.3981 8.5 18.4Z"
            fill="#335E7D"
          />
          <path d="M1 24L17 1" stroke={terraUser ? "transparent" : "#F05757"} />
        </svg>
        <h5 className="flex-1 mx-2 font-bold">
          {terraUser ? terraUser.provider : "No Wearable"}
        </h5>
        {terraUser ? <UnpairWearable uid={uid} terraUser={terraUser} /> : null}
      </div>
      <div className="h-40 flex flex-col justify-center">
        {terraUser ? (
          <>
            <div className="flex justify-between items-center my-2">
              <h5 className="text-xl">Calories Burned</h5>
              <h4 className="text-3xl font-extrabold">{calories}</h4>
            </div>
            <div className="flex justify-between items-center my-2">
              <h5 className="text-xl">Fitpoints earned</h5>
              <h4 className="text-3xl font-extrabold">{fitpoints}FP</h4>
            </div>
            <div className="flex justify-between items-center my-2">
              <h5 className="text-xl">Duration of task</h5>
              <h4 className="text-3xl font-extrabold">
                {duration < 3600
                  ? new Date(duration * 1000).toISOString().substr(14, 5)
                  : new Date(duration * 1000).toISOString().substr(11, 8)}
              </h4>
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer"
            onClick={gotoComponent}
          >
            <svg width="15" height="22" viewBox="0 0 17 24">
              <path
                d="M13.4554 0H3.54457L2.22857 6.6058C0.795133 8.0783 0 10.0029 0 12C0 13.9971 0.795133 15.9217 2.22857 17.3942L3.54457 24H13.4554L14.7714 17.3942C16.2049 15.9217 17 13.9971 17 12C17 10.0029 16.2049 8.0783 14.7714 6.6058L13.4554 0ZM4.95546 1.6H12.0445L12.7352 5.06555C11.447 4.36744 9.98665 4 8.50021 4C7.01378 4 5.55341 4.36744 4.26527 5.06555L4.95546 1.6ZM12.0445 22.4H4.95546L4.26484 18.9345C5.55299 19.6326 7.01335 20 8.49979 20C9.98622 20 11.4466 19.6326 12.7347 18.9345L12.0445 22.4ZM8.5 18.4C7.15509 18.4 5.84039 18.0246 4.72214 17.3214C3.60389 16.6182 2.73232 15.6186 2.21765 14.4492C1.70297 13.2797 1.56831 11.9929 1.83069 10.7514C2.09307 9.50994 2.7407 8.36957 3.69169 7.47452C4.64269 6.57946 5.85433 5.96992 7.17339 5.72297C8.49246 5.47603 9.8597 5.60277 11.1022 6.08717C12.3448 6.57157 13.4068 7.39188 14.154 8.44435C14.9012 9.49683 15.3 10.7342 15.3 12C15.2979 13.6968 14.5809 15.3235 13.3061 16.5234C12.0313 17.7232 10.3028 18.3981 8.5 18.4Z"
                fill="#335E7D"
              />
            </svg>
            <h5 className="w-2/3 text-center font-bold leading-tight py-1.5">
              Try connecting your wearable again
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default WearableData;
