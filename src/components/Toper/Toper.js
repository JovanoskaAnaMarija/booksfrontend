import Book from "../Book/Book";
import { useEffect, useState } from "react";
import BookService from "../../repository/bookRepository";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, CardContent } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
const Toper = (props) => {
  const classNamees = useStyles();
  const [shop, setShop] = useState("toper");
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
export default Toper;
