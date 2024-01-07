import Loading from "@components/loading/Loading";
import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { useAlgoliaSearch } from "@hooks/search/algolia/useAlgoliaSearch";
import { Pagination } from "@mui/material";
import ActivityAdder from "./ActivityAdder";
import Task from "./Task";

interface Props {
  urlState: adminDashboardQuery;
  onPageChange: (newPage: number) => void;
}

const LiveView: React.FC<Props> = ({ urlState, onPageChange }) => {
  const { hits, onRefresh, loading, nbPages, nbHits } =
    useAlgoliaSearch(urlState);
  // console.log("hits", hits);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-4">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : null}

      <div className="py-4 m-8 border">
        <ActivityAdder gameId={urlState.game} onRefresh={onRefresh} />
      </div>

      <div className="px-4 pt-8">
        <p className="text-3xl text-center text-gray-700">{nbHits} hits</p>
      </div>

      <div className="flex flex-wrap justify-evenly w-full p-4 py-8">
        {hits.map((item) => {
          return (
            <div className="pb-4" key={item.objectID}>
              <Task activity={item} onRefresh={onRefresh} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        {nbPages > 1 ? (
          <Pagination
            size="large"
            count={nbPages}
            page={urlState.page ? parseInt(urlState.page) + 1 : 1}
            onChange={(_, val: number) => onPageChange(val - 1)}
          />
        ) : null}
      </div>
    </>
  );
};

export default LiveView;
