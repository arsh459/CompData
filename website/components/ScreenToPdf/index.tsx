// import { ArrowNarrowDownIcon } from "@heroicons/react/solid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ScreenToPDFProps {
  elementRef: React.RefObject<HTMLElement>;
}

const ScreenToPDF: React.FC<ScreenToPDFProps> = ({ elementRef }) => {
  const handleDownloadPDF = async () => {
    if (!elementRef.current) return;

    const canvas = await html2canvas(elementRef.current, {
      backgroundColor: "none",
      allowTaint: true,
      logging: true,
      useCORS: true, // to enable cross-origin permissions
    });

    const pdf = new jsPDF({ orientation: "portrait" });
    const imgData = canvas.toDataURL("image/png");

    // Calculate the aspect ratio of the captured image
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("prescription.pdf");
  };

  return (
    <div className="flex items-center mr-4">
      <span className="text-[#F62088]">&#8595;</span>
      <p
        className="text-[#F62088] text-sm font-nunitoB cursor-pointer pl-1"
        onClick={handleDownloadPDF}
      >
        Download
      </p>
    </div>
  );
};

export default ScreenToPDF;
