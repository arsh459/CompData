import { dataAddMood } from "../constants";
import { getEmojiByMood } from "./utils";

interface Props {
  selectedMood: number;
  handleMoodSelect: (mood: number) => void;
}

const MoodEmojiToAdd: React.FC<Props> = ({
  selectedMood,
  handleMoodSelect,
}) => {
  return (
    <div style={{ flex: 1, overflowY: "scroll" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "12px",
        }}
      >
        {dataAddMood.map((i, index) => (
          <button
            key={index}
            style={{
              backgroundColor: selectedMood === i.mood ? "#96617D" : "#FFE4F2",
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "2px",
              aspectRatio: "68/94",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleMoodSelect(i.mood)}
          >
            <img
              src={getEmojiByMood(i.mood).icon}
              style={{ width: "30px", height: "30px", aspectRatio: "91/83" }}
            />
            <div
              style={{
                color: selectedMood === i.mood ? "#FFE4F2" : "#96617D",
                fontSize: "12px",
                textAlign: "center",
                padding: "8px",
                textTransform: "capitalize",
              }}
            >
              {i.moodType}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodEmojiToAdd;
