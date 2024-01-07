import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import MedicalReportModule from "@modules/MedicalReportModule";

const MedicalReportScreen = () => {
  useScreenTrack();
  return <MedicalReportModule />;
};
export default MedicalReportScreen;
