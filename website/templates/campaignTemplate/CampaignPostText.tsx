interface Props {
  label: string;
  text?: string;
}

const CampaignPostText: React.FC<Props> = ({ label, text }) => {
  return text ? (
    <div className="flex">
      <p className="text-gray-700 font-semibold text-sm">{label}:</p>
      <p className="pl-1 text-gray-700 text-sm">{text}</p>
    </div>
  ) : null;
};

export default CampaignPostText;
