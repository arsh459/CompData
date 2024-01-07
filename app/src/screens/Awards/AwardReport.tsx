import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ReportMain from "@modules/Awards/ReportMain";
import { useRoute } from "@react-navigation/native";

export interface AwardReportParams {
  achivementId: string;
}

const AwardReport = () => {
  const route = useRoute();
  const params = route.params as AwardReportParams | undefined;

  useScreenTrack();

  return params ? <ReportMain {...params} /> : null;
};

export default AwardReport;
