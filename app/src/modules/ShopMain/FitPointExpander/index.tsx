import { View, Text } from "react-native";

import ExpanderHeader from "./ExpanderHeader";
import { useUserContext } from "@providers/user/UserProvider";
import useUserTasks from "@hooks/task/useUserTasks";
import TaskLists from "./TaskLists";
import Header from "@modules/Header";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";

const FitPointExpanderMain = () => {
  const { user } = useUserContext();
  const { userTasks, onNext } = useUserTasks(user?.uid, 2);

  return (
    <>
      <Header
        back={true}
        // headerColor={"#100F1A"}
        tone="dark"
        headerType="transparent"
      />
      <View className="bg-[#100F1A] flex-1 ">
        <ExpanderHeader
          fpStr={`${getUserTotalFP(user?.fpCredit, user?.fpDebit)} FP`}
        />
        <View className="px-4 flex-1 ">
          {/* <View className=" flex flex-row items-center justify-between pb-5 pt-3.5">
            <Text
              className="text-white  text-base iphoneX:text-lg "
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              My Earned Fitpoints
            </Text>
          
          </View> */}
          <Text
            className="text-white p-4  text-base iphoneX:text-lg "
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            My Earned Fitpoints
          </Text>
          <TaskLists userTasks={userTasks} onNext={onNext} />
        </View>
      </View>
    </>
  );
};

export default FitPointExpanderMain;
