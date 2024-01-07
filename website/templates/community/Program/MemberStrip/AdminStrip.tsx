import { useState } from "react";
import {
  reconcileCoachesCall,
  reconcileUsersCall,
  reconcilePrizesCall,
  reconcileLevelsCall,
} from "./utils";

// const tabsData: tabs[] = ["Players", "Coaches", "My Team"];

interface Props {
  //   selectedTab: tabs;
  //   onClick: (newVal: tabs) => void;
  isAdmin: boolean;
  eventId?: string;
}

const AdminStrip: React.FC<Props> = ({
  eventId,
  //   selectedTab,
  //   onClick,
  isAdmin,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCoachRefresh = async () => {
    if (eventId) {
      setLoading(true);

      try {
        await reconcileCoachesCall(eventId);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleUserRefresh = async () => {
    if (eventId) {
      setLoading(true);

      try {
        await reconcileUsersCall(eventId);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handlePrizeRefresh = async () => {
    if (eventId) {
      setLoading(true);

      try {
        await reconcilePrizesCall(eventId);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleLevelRefresh = async () => {
    try {
      await reconcileLevelsCall();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // refreshUserLevels;

  return (
    <>
      {isAdmin && !loading ? (
        <div className="border flex items-center justify-center py-1">
          <div className="">
            <p
              onClick={handleCoachRefresh}
              className="text-sm text-gray-500 text-center cursor-pointer"
            >
              Refresh Coaches
            </p>
          </div>
          <div className=" pl-2">
            <p
              onClick={handleUserRefresh}
              className="text-sm text-gray-500 text-center cursor-pointer"
            >
              Refresh Users
            </p>
          </div>

          <div className=" pl-2">
            <p
              onClick={handlePrizeRefresh}
              className="text-sm text-gray-500 text-center cursor-pointer"
            >
              Refresh Prizes
            </p>
          </div>

          <div className=" pl-2">
            <p
              onClick={handleLevelRefresh}
              className="text-sm text-gray-500 text-center cursor-pointer"
            >
              Refresh Levels
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="pt-2">
          <p className="text-sm text-gray-500 text-center cursor-pointer">
            Loading...
          </p>
        </div>
      ) : null}
    </>
  );
};

export default AdminStrip;
