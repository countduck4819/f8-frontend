import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Pagination({convertPage,convertCheck}) {
    const [page,setPage] = useState(1);
    const state = useSelector(state => state);
    const btnRef = useRef();
    const dispatch = useDispatch();
    function handlePageClick(selected) {
        localStorage.setItem("page",selected.selected + 1)
        dispatch({
            type: "convert/page",
            payload: selected.selected + 1
        })
        setPage(selected.selected + 1)
        btnRef.current.click();
        convertPage(true)
        convertCheck(true)
    }

  return (
    <Link ref={btnRef} to={`/products/${page}`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        forcePage={page - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={1250}
        previousLabel="previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </Link>
  )
}

export default Pagination