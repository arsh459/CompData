import TransformationsSection from "@templates/community/Transformations/TransformationsSection";

interface Props {}

const AdminTestTemplate: React.FC<Props> = ({}) => {
  return (
    <div className="px-8 py-8">
      <TransformationsSection isAdmin={true} />
    </div>
  );
};

export default AdminTestTemplate;
