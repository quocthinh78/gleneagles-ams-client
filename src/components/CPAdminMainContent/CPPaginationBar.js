import {
  TablePagination,
  TablePrev,
  PaginateBtn,
  TableNext,
} from "../../styles/AdminPage.styles";

function CPPaginationBar({ pageIndex, totalPage, onPageChange }) {
  let pages = [];
  let arrPages = Array.apply(null, { length: totalPage }).map(function (
    _,
    idx
  ) {
    return idx + 1;
  });
  let index = arrPages.indexOf(pageIndex);

  if (arrPages.length >= 6) {
    if (index <= 2) {
      const lastValue = arrPages[arrPages.length - 1];
      arrPages = arrPages.slice(0, 4);
      pages = arrPages.concat(["...", lastValue]);
    } else if (index > arrPages.length - 4) {
      arrPages = arrPages.slice(arrPages.length - 4);
      pages = [1, "..."].concat(arrPages);
    } else {
      const lastValue = arrPages[arrPages.length - 1];
      arrPages = arrPages.slice(index - 1, index + 2);
      let pageTem = [1, "..."].concat(arrPages);
      pages = pageTem.concat(["....", lastValue]);
    }
  } else {
    pages = arrPages;
  }

  const defineClassName = (page) => {
    return page === pageIndex
      ? "active"
      : page === "..." || page === "...."
      ? "disabled"
      : "";
  };
  return (
    <TablePagination>
      <TablePrev onClick={() => onPageChange(pageIndex - 1)}>
        <i className="fas fa-chevron-left"></i>
      </TablePrev>
      <span>
        {pages.map((p) => (
          <PaginateBtn
            key={p}
            onClick={() => {
              p !== "..." && p !== "...." && onPageChange(p);
            }}
            className={defineClassName(p)}
          >
            {p}
          </PaginateBtn>
        ))}
      </span>
      <TableNext onClick={() => onPageChange(pageIndex + 1)}>
        <i className="fas fa-chevron-right"></i>
      </TableNext>
    </TablePagination>
  );
}

export default CPPaginationBar;
