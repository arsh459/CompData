import LoadingModal from "@components/loading/LoadingModal";
import { useGameConfiguration } from "@hooks/games/useGameConfiguration";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import Tags from "./Tags";

interface Props {
  gameId: string;
}

const AdminGameConfiguration: React.FC<Props> = ({ gameId }) => {
  const router = useRouter();
  const { configuration, addTags, removeTags, onSave, loading } =
    useGameConfiguration(gameId);

  return (
    <>
      {loading ? (
        <LoadingModal fill="#ff735c" width={80} height={80} />
      ) : (
        <div className="p-4">
          <div className="pb-3">
            <p className="text-gray-700 text-4xl font-semibold flex items-center">
              <span onClick={() => router.back()}>
                <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
              </span>
              &nbsp; Game Configuration
            </p>
          </div>
          <hr />

          <Tags
            configuration={configuration}
            addTags={addTags}
            removeTags={removeTags}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50">
            <BottomNavComV2 cta={"Save Configuration"} onClick={onSave} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminGameConfiguration;
