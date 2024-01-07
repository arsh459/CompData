import CharactersIcon from "./CharactersIcon";
import CommunityIcon from "./CommunityIcon";
import ContactIcon from "./ContactIcon";
import DistanceIcon from "./DistanceIcon";
import DumbbellIcon from "./DumbbellIcon";
import FacebookIcon from "./FacebookIcon";
import FitIcon from "./FitIcon";
import FitpointIcon from "./FitpointIcon";
import HomeIcon from "./HomeIcon";
import InstaIcon from "./InstaIcon";
import LeftArrowIcon from "./LeftArrowIcon";
import LevelIcon from "./LevelIcon";
import LinkedinIcon from "./LinkedinIcon";
import MuscleIcon from "./MuscleIcon";
import OutdoorIcon from "./OutdoorIcon";
import PaceIcon from "./PaceIcon";
import ProfileIcon from "./ProfileIcon";
import QuitIcon from "./QuitIcon";
import RankingIcon from "./RankingIcon";
import RecoveryIcon from "./RecoveryIcon";
import RepsIcon from "./RepsIcon";
import ResumeIcon from "./ResumeIcon";
import RightArrowIcon from "./RightArrowIcon";
import RunIcon from "./RunIcon";
import SentencesphyIcon from "./SentencesphyIcon";
import SignOutIcon from "./SingOutIcon";
import TaskIcon from "./TaskIcon";
import TimeIcon from "./TimeIcon";
import WeightIcon from "./WeightIcon";
import WeightIconSvg from "./WeightIconSvg";
import WordsIcon from "./WordsIcon";
import UpDoubleArrowIcon from "./UpDoubleArrowIcon";
import DownDoubleArrowIcon from "./DownDoubleArrowIcon";
import MoreIcon from "./MoreIcon";
import ClapIcon from "./ClapIcon";
import ReplyIcon from "./ReplyIcon";
import ShareIcon from "./ShareIcon";
import HamMenuIcon from "./HamMenuIcon";
import SendIcon from "./SendIcon";
import ReportIcon from "./ReportIcon";
import RetryIcon from "./RetryIcon";
import DoneIcon from "./DoneIcon";
import FireIcon from "./FireIcon";
import CircledIcon from "./CircledIcon";
import ProIcon from "./ProIcon";
import AddIcon from "./Addicon";
import TeamIcon from "./TeamIcon";
import CastIcon from "./CastIcon";
import SbWaveIcon from "./SbWaveIcon";
import CalenderIcon from "./CalenderIcon";
import TickIcon from "./TickIcon";
import BlockIcon from "./BlockIcon";
import ExerciseIcon from "./ExerciseIcon";
import JourneyIcon from "./JourneyIcon";
import ShopIcon from "./ShopIcon";
import RewardIcon from "./RewardIcon";
import DifficultyLevelsIcon, {
  DifficultyLevelsTypes,
} from "./DifficultyLevelsIcon";
import DiningIcon from "./DiningIcon";
import StepsIcon from "./StepsIcon";
import LoadingIcon from "./LoadingIcon";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import UpgradeIcon from "./UpgradeIcon";
import BookIcon from "./BookIcon";
import RightArrowSlimIcon from "./RightArrowSlimIcon";
import LevelsIcon, { LevelsTypes } from "./LevelsIcon";
import NutritionIcon from "./NutritionIcon";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";
import RestDayIcon from "./RestDayIcon";
import JourneyLogIcon from "./JourneyLogIcon";
import StarIcon from "./StarIcon";
import SearchIcon from "./SearchIcon";
import ArrowIconPointed from "./ArrowIconPointed";
import TickCheck from "./TickCheck";
import Period from "./Period";
import Setting from "./Setting";
import DoubleTickIcon from "./DoubleTickIcon";
import CloseIcon from "./CloseIcon";
import QuestCompletedIcon from "./QuestCompletedIcon";
import WorkoutQuestIcon from "./WorkoutQuestIcon";
import NutritionQuestIcon from "./NutritionQuestIcon";
import GramIcon from "./gramIcon";
import CustomRecipeIcon from "@components/CustomRecipeIcon";
import IngredientSubtractIcon from "./IngredientSubtractIcon";
import IngredientAddIcon from "./IngredientAddIcon";
import Minute5 from "./Minute5";
import Minute15 from "./Minute15";
import Minute30 from "./Minute30";
import PrescriptionIcon from "./PrescriptionIcon";
import PDFicon from "./PDFicon";
import MedicalReportIcon from "./MedicalReportIcon";
import GreenPlus from "./GreenPlus";

import CameraIcon from "./CameraIcon";
import ListIcon from "./ListIcon";
import ToggleIcon from "./ToggleIcon";

export type iconTypes =
  | "weight"
  | "muscle"
  | "run"
  | "recovery"
  | "fit"
  | "home"
  | "dumbbell"
  | "outdoor"
  | "lefArrow"
  | "rightArrow"
  | "distance"
  | "pace"
  | "reps"
  | "time"
  | "weight2"
  | "characters"
  | "words"
  | "sentencesphy"
  | "fitpoint"
  | "level"
  | "task"
  | "profile"
  | "contact"
  | "signout"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "resume"
  | "quit"
  | "updoublearrow"
  | "downdoublearrow"
  | "ranking"
  | "reward"
  | "shop"
  | "community"
  | "moredot"
  | "clap"
  | "reply"
  | "share"
  | "menu"
  | "send"
  | "report"
  | "block"
  | "retry"
  | "done"
  | "fire"
  | "iCircle"
  | "add"
  | "team"
  | "pro"
  | "cast"
  | "sbwave"
  | "calender"
  | "tick"
  | "exercise"
  | "journey"
  | "shop"
  | "difficultyLevels"
  | "dining"
  | "steps"
  | "loading"
  | "sun"
  | "moon"
  | "upgrade"
  | "book"
  | "levels"
  | "nutrition"
  | "plus"
  | "minus"
  | "restDay"
  | "star"
  | "search"
  | "pointedArrow"
  | "rightArrowSlim"
  | "journeyLog"
  | "progress"
  | "period"
  | "tickCheck"
  | "star"
  | "period"
  | "setting"
  | "closeIcon"
  | "DoubleTick"
  | "questCompleted"
  | "workoutQuest"
  | "nutritionQuest"
  | "gramIcon"
  | "CustomRecipe"
  | "ingredientSubtractIcon"
  | "ingredientAddIcon"
  | "Minute5"
  | "Minute15"
  | "Minute30"
  | "camera"
  | "prescription"
  | "pdfIcon"
  | "medicalReportIcon"
  | "greenPlus"
  | "listIcon"
  | "toggle";

interface Props {
  iconType?: iconTypes;
  color?: string;
  level?: DifficultyLevelsTypes;
  difficultyLevel?: LevelsTypes;
}

const SvgIcons: React.FC<Props> = ({
  iconType,
  color,
  level,
  difficultyLevel,
}) => {
  switch (iconType) {
    case "toggle":
      return <ToggleIcon color={color} />;
    case "listIcon":
      return <ListIcon color={color} />;
    case "camera":
      return <CameraIcon color={color} />;
    case "gramIcon":
      return <GramIcon />;
    case "nutritionQuest":
      return <NutritionQuestIcon />;
    case "workoutQuest":
      return <WorkoutQuestIcon />;
    case "questCompleted":
      return <QuestCompletedIcon />;
    case "Minute5":
      return <Minute5 />;
    case "Minute15":
      return <Minute15 />;
    case "Minute30":
      return <Minute30 />;
    case "ingredientAddIcon":
      return <IngredientAddIcon color={color} />;
    case "ingredientSubtractIcon":
      return <IngredientSubtractIcon color={color} />;
    case "CustomRecipe":
      return <CustomRecipeIcon color={color} />;
    case "weight":
      return <WeightIcon color={color} />;
    case "muscle":
      return <MuscleIcon color={color} />;
    case "run":
      return <RunIcon color={color} />;
    case "recovery":
      return <RecoveryIcon color={color} />;
    case "fit":
      return <FitIcon color={color} />;
    case "home":
      return <HomeIcon color={color} />;
    case "dumbbell":
      return <DumbbellIcon color={color} />;
    case "outdoor":
      return <OutdoorIcon color={color} />;
    case "lefArrow":
      return <LeftArrowIcon color={color} />;
    case "rightArrow":
      return <RightArrowIcon color={color} />;
    case "rightArrowSlim":
      return <RightArrowSlimIcon color={color} />;
    case "distance":
      return <DistanceIcon color={color} />;
    case "pace":
      return <PaceIcon color={color} />;
    case "reps":
      return <RepsIcon color={color} />;
    case "time":
      return <TimeIcon color={color} />;
    case "weight2":
      return <WeightIconSvg color={color} />;
    case "characters":
      return <CharactersIcon color={color} />;
    case "words":
      return <WordsIcon color={color} />;
    case "sentencesphy":
      return <SentencesphyIcon color={color} />;
    case "fitpoint":
      return <FitpointIcon color={color} />;
    case "level":
      return <LevelIcon color={color} />;
    case "task":
      return <TaskIcon color={color} />;
    case "profile":
      return <ProfileIcon color={color} />;
    case "contact":
      return <ContactIcon color={color} />;
    case "signout":
      return <SignOutIcon color={color} />;
    case "instagram":
      return <InstaIcon color={color} />;
    case "linkedin":
      return <LinkedinIcon color={color} />;
    case "facebook":
      return <FacebookIcon color={color} />;
    case "resume":
      return <ResumeIcon color={color} />;
    case "quit":
      return <QuitIcon color={color} />;
    case "updoublearrow":
      return <UpDoubleArrowIcon color={color} />;
    case "downdoublearrow":
      return <DownDoubleArrowIcon color={color} />;
    case "ranking":
      return <RankingIcon color={color} />;
    case "community":
      return <CommunityIcon color={color} />;
    case "reward":
      return <RewardIcon color={color} />;
    case "shop":
      return <ShopIcon color={color} />;
    case "moredot":
      return <MoreIcon color={color} />;
    case "clap":
      return <ClapIcon color={color} />;
    case "reply":
      return <ReplyIcon color={color} />;
    case "share":
      return <ShareIcon color={color} />;
    case "menu":
      return <HamMenuIcon color={color} />;
    case "send":
      return <SendIcon color={color} />;
    case "report":
      return <ReportIcon color={color} />;
    case "retry":
      return <RetryIcon color={color} />;
    case "done":
      return <DoneIcon color={color} />;
    case "fire":
      return <FireIcon color={color} />;
    case "iCircle":
      return <CircledIcon color={color} />;
    case "pro":
      return <ProIcon color={color} />;
    case "add":
      return <AddIcon color={color} />;
    case "team":
      return <TeamIcon color={color} />;
    case "cast":
      return <CastIcon color={color} />;
    case "sbwave":
      return <SbWaveIcon color={color} />;
    case "calender":
      return <CalenderIcon color={color} />;
    case "tick":
      return <TickIcon color={color} />;
    case "block":
      return <BlockIcon color={color} />;
    case "exercise":
      return <ExerciseIcon color={color} />;
    case "shop":
      return <ShopIcon color={color} />;
    case "journey":
    case "progress":
      return <JourneyIcon color={color} />;
    case "difficultyLevels":
      return <DifficultyLevelsIcon color={color} level={level} />;
    case "levels":
      return <LevelsIcon color={color} level={difficultyLevel} />;
    case "dining":
      return <DiningIcon color={color} />;
    case "steps":
      return <StepsIcon color={color} />;
    case "loading":
      return <LoadingIcon color={color} />;
    case "sun":
      return <SunIcon color={color} />;
    case "moon":
      return <MoonIcon color={color} />;
    case "upgrade":
      return <UpgradeIcon color={color} />;
    case "book":
      return <BookIcon color={color} />;
    case "nutrition":
      return <NutritionIcon color={color} />;
    case "plus":
      return <PlusIcon color={color} />;
    case "minus":
      return <MinusIcon color={color} />;
    case "restDay":
      return <RestDayIcon color={color} />;
    case "nutrition":
      return <NutritionIcon color={color} />;
    case "journeyLog":
      return <JourneyLogIcon color={color} />;
    case "star":
      return <StarIcon color={color} />;
    case "search":
      return <SearchIcon color={color} />;
    case "pointedArrow":
      return <ArrowIconPointed color={color} />;
    case "tickCheck":
      return <TickCheck color={color} />;
    case "period":
      return <Period color={color} />;
    case "setting":
      return <Setting color={color} />;
    case "DoubleTick":
      return <DoubleTickIcon color={color} />;
    case "closeIcon":
      return <CloseIcon color={color} />;
    case "prescription":
      return <PrescriptionIcon color={color} />;
    case "pdfIcon":
      return <PDFicon color={color} />;
    case "medicalReportIcon":
      return <MedicalReportIcon color={color} />;
    case "greenPlus":
      return <GreenPlus color={color} />;
    default:
      return null;
  }
};

export default SvgIcons;
