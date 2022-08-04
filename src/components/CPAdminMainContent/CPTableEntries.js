import { TableInfo } from "../../styles/AdminPage.styles";

const CPTableEntries = ({ currentPage, pageSize, totalCount, count }) => {
  const showFrom = count !== 0 ? (currentPage - 1) * pageSize + 1 : 0;

  return (
    <TableInfo>
      Showing {showFrom} to {totalCount !== 0 ? showFrom + count - 1 : 0} of{" "}
      {totalCount} entries
    </TableInfo>
  );
};

export default CPTableEntries;
