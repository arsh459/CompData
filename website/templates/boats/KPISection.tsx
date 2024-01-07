interface Props {
  sbStudents: number | undefined;
  sbEvents: number | undefined;
}

const KPISection: React.FC<Props> = ({ sbEvents, sbStudents }) => {
  return (
    <div>
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
          <p className="text-xs text-gray-500">{sbStudents ? sbStudents : 0}</p>
          <p className="text-sm text-gray-700 font-medium">Members</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs text-gray-500">{sbEvents ? sbEvents : 0}</p>
          <p className="text-sm text-gray-700 font-medium">Events</p>
        </div>
      </div>
    </div>
  );
};

export default KPISection;
