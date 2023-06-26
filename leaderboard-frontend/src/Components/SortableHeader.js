import React from "react";

const SortableHeader = ({ name, field, requestSort, sortConfig }) => {
  return (
    <th onClick={() => requestSort(field)}>
      {name}{" "}
      <span>
        {sortConfig &&
          sortConfig.key === field &&
          sortConfig.direction === "ascending" &&
          "↑"}
        {sortConfig &&
          sortConfig.key === field &&
          sortConfig.direction === "descending" &&
          "↓"}
      </span>
    </th>
  );
};

export default SortableHeader;
