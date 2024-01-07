import {
  adminDashboardQuery,
  adminDashboardQueryKeys,
} from "@hooks/dashboard/useAdminDashboard";
import { useState } from "react";
import Filter from "./Filter";
import FilterModalHolder from "./FilterModal/FilterModalHolder";
import { filters, getFilterName, getFilterState } from "./FilterModal/utils";

interface Props {
  urlState: adminDashboardQuery;
  onClearFilter: (type: adminDashboardQueryKeys | "NOT_VISIBLE") => void;
}

const FilterHolder: React.FC<Props> = ({ urlState, onClearFilter }) => {
  const [modalState, setModalState] = useState<
    adminDashboardQueryKeys | "NOT_VISIBLE"
  >("NOT_VISIBLE");
  const onClose = () => setModalState("NOT_VISIBLE");
  return (
    <>
      <FilterModalHolder
        q={urlState}
        modalState={modalState}
        onClose={onClose}
        onClearFilter={onClearFilter}
      />
      <div className="pt-4 flex items-center gap-4 flex-wrap px-4">
        {filters.map((item) => {
          return (
            <div key={item.id}>
              <Filter
                text={getFilterName(item.id, urlState)}
                selected={getFilterState(item.id, urlState)}
                onClick={() => setModalState(item.id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterHolder;
