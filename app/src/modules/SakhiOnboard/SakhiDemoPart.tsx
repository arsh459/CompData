import { View, useWindowDimensions } from "react-native";
import ChatBotDemo from "./ChatBotDemo";

const userText1 = `“Feeling Really low on energy. Suggest what should I eat?”`;
const userText2 = `“Have really painful periods. What light workouts can I do?”`;
const assistantText1 = `For a healthy Indian snack that can satisfy your sugar craving, try a bowl of fruit chaat. It's a mix of fresh seasonal fruits, like apples, oranges, grapes, and pomegranate, sprinkled with a pinch of chaat masala and a squeeze of lemon. This snack is naturally sweet, nutritious, and full of antioxidants. Would you like a recipe also?`;
const assistantText2 = `Try gentle yoga poses like Cat-Cow and Child's Pose or a light 15-20 minute walk to alleviate painful periods. Consult Greesha on SocialBoat for more yoga guidance. Remember to listen to your body and consult a doctor for persistent pain. Ask me about pain-relieving foods or other questions!`;

interface FloatingProps {
  startDemoAnimation1: boolean;
  startDemoAnimation2: boolean;
}

const SakhiDemoPart: React.FC<FloatingProps> = ({
  startDemoAnimation1,
  startDemoAnimation2,
}) => {
  const { height } = useWindowDimensions();

  return (
    <>
      <View className="pt-20 overflow-hidden" style={{ height }}>
        <ChatBotDemo
          init={startDemoAnimation1}
          userText={userText1}
          assistantText={assistantText1}
        />
      </View>
      <View className="pt-20 overflow-hidden" style={{ height }}>
        <ChatBotDemo
          init={startDemoAnimation2}
          userText={userText2}
          assistantText={assistantText2}
        />
      </View>
    </>
  );
};

export default SakhiDemoPart;
