import React, { useEffect, useState } from "react";
import BookService from "../../repository/bookRepository";
import Book from "../Book/Book";
import SakamKnigi from "../SakamKnigi/SakamKnigi";
import { Card } from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../loading/loading";
import { Grid, CardContent } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
const Matica = () => {
  const classNamees = useStyles();
  const [shop, setShop] = useState("matica");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const getAllBooksByShop = (page) => {
    page = page - 1;
    return BookService.getAllBooksByShop(page, rowsPerPage, shop)
      .then((response) => response.data)
      .then((data) => {
        setBooks(data.content);
        setTotalElements(data.totalPages);
        setPage(data.number + 1);

        console.log(data.content);
      });
  };

  useEffect(() => {
    console.log(shop);
    getAllBooksByShop(page);
    return () => {};
  }, []);

  return (
    <div>
      <Book shop={shop} />
    </div>
  );
};
export default Matica;
