import React, { useEffect, useState } from "react";

import BookService from "../../repository/bookRepository";
import SakamKnigi from "../SakamKnigi/SakamKnigi";
import { Card } from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../loading/loading";
import { RiChatHeartFill } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthenticationService from "../../services/AuthenticationService";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import "./Book.css";
import { Grid, CardContent } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
const Book = (props) => {
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const [shop, setShop] = useState(props.shop);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [addedBook, setAddedBook] = useState({});
  const [bookId, setBookId] = useState(0);
  const [newBooks, setNewBooks] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [user, setUser] = useState(false);
  const [disabledArr, setDisabledArr] = useState([]);
  const [booksForUser, setBooksForUser] = useState([]);

  const getAllBooksByShop = (page) => {
    page = page - 1;
    setLoading(true);
    BookService.getAllBooksByShop(page, rowsPerPage, shop)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setBooks(data.content);
        setTotalElements(data.totalPages);
        setPage(data.number + 1);

        console.log(data.content);
      });
  };
  const getAllBooksByShopWithoutPagination = () => {
    BookService.getAllBooksByShopWithoutPagination(shop).then((res) => {
      console.log(res.data);
      setNewBooks(res.data);
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllBooksByShop(newPage);
    setLoading(true);
  };

  const addToFavourites = (book) => {
    // setFavouriteBooks([book, ...favouriteBooks]);
    // setBooks([book, ...books ]);
    BookService.addToFavourites(book.id).then((res) => {
      setBooks((preBooks) =>
        preBooks.map((book) => {
          if (book.id === res.data.id) {
            return {
              ...book,
              favourite: res.data.favourite,
            };
          }
          return book;
        })
      );
    });
  };
  const getUserDetails = () => {
    AuthenticationService.getUserDetails().then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  };
  const addBookToFavoruites = (book) => {
    const bookHelper = {
      userId: user,
      bookId: book,
    };

    BookService.addBookToFavoruites(bookHelper).then((res) => {
      // console.log(res.data)
      setAddedBook(res.data);
      setBookId(res.data.books.id);
      console.log(res.data.books);
      setDisabledArr((disabledArr) => [...disabledArr, res.data.books.id]);
      MySwal.fire({
        title: <strong>Додадено!</strong>,
        icon: "success",
      }).then();
    });
  };
  const sortByPriceAsc = () => {
    setLoading(true);
    setClicked(!clicked);

    var obj = [...newBooks];
    for (let k in obj) {
      if (obj[k].new_price !== "") {
        obj.sort((a, b) => a.new_price - b.new_price);
      } else {
        obj.sort((a, b) => a.price - b.price);
      }
    }
    setBooks(obj);
    setLoading(false);
  };
  const sortByPriceDesc = () => {
    setLoading(true);
    setClicked(!clicked);

    var obj = [...newBooks];
    for (let k in obj) {
      if (obj[k].new_price !== "") {
        obj.sort((a, b) => b.new_price - a.new_price);
      } else {
        obj.sort((a, b) => b.price - a.price);
      }
    }
    setBooks(obj);
    setLoading(false);
  };
  const getBooksForUser = () => {
    var newFav = [];
    var disabledIds = [];
    BookService.getBooksForUser(localStorage.getItem("loggedUserId")).then(
      (res) => {
        res.data.map((book) => {
          newFav.push(book.books);
        });
        setBooksForUser(newFav);
        console.log("newFav", newFav);
        console.log("booksForUser", booksForUser);
        for (var i = 0; i < newFav.length; i++) {
          disabledIds.push(newFav[i].id);
        }
        console.log("disabledIds", disabledIds);
        setDisabledArr(disabledIds);
        console.log("arrrr", disabledArr);
      }
    );
  };
  useEffect(() => {
    console.log(shop);
    getAllBooksByShop(page);
    getAllBooksByShopWithoutPagination();
    if (localStorage.getItem("Token") !== null) {
      getUserDetails();
      getBooksForUser();
    }

    return () => {};
  }, []);

  return (
    <div>
      <div className="row mt-5 filter" style={{ marginLeft: "100px" }}>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          {clicked ? (
            <button
              type="button"
              id="sortAll"
              onClick={sortByPriceAsc}
              className="btn"
            >
              Сортирај по цена <TiArrowSortedUp />{" "}
            </button>
          ) : (
            <button
              type="button"
              id="sortAll"
              onClick={sortByPriceDesc}
              className="btn"
            >
              Сортирај по цена <TiArrowSortedDown />{" "}
            </button>
          )}
        </div>
      </div>

      {/* {clicked ?
          
            <button type="button" onClick={sortByPriceAsc}  className="btn btn btn-outline-danger mt-3" >Сортирај по цена <TiArrowSortedUp/> </button>
            :
            <button type="button" onClick={sortByPriceDesc}  className="btn btn btn-outline-danger mt-3" >Сортирај по цена <TiArrowSortedDown/> </button>
          } */}
      {loading && <Loading />}
      {!loading && (
        <div className="container">
          <div className="row mt-5">
            {books.map((elem) => {
              return (
                <div className="col-md-3 mt-5">
                  <div className="card mb-2">
                    <a href={elem.linkToBook}>
                      <img className="card-img-top" src={elem.image} />
                    </a>
                    <div className="card-body" style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {localStorage.getItem("Token") !== null ? (
                          // elem.id===bookId && addedBook.favourite ?

                          <button
                            className="btn btn-warning addFav"
                            disabled={disabledArr.indexOf(elem.id) !== -1}
                            id={`addToFavourites-${elem.id}`}
                            style={{ color: "white" }}
                            onClick={() => {
                              addBookToFavoruites(elem);
                            }}
                          >
                            <RiChatHeartFill
                              id="heaart"
                              style={{ fontSize: "2rem" }}
                            />
                          </button>
                        ) : null}
                        <h4 className="card-title">{elem.name}</h4>
                      </div>
                      <p className="card-text" style={{ textAlign: "center" }}>
                        {elem.author !== "" ? elem.author : <br />}
                      </p>
                      {elem.new_price !== "" ? (
                        <del style={{ color: "red" }}>
                          {parseInt(elem.price)}
                        </del>
                      ) : elem.price === "" ? (
                        ""
                      ) : (
                        parseInt(elem.price) + " ден."
                      )}
                      <br />

                      {elem.new_price === "" ? (
                        ""
                      ) : (
                        <p style={{ color: "green" }}>
                          {parseInt(elem.new_price) + " ден."}
                        </p>
                      )}
                      {/* <div style={{textTransform:"uppercase", color:"red", fontWeight:"bold"}}>{elem.shop}</div> */}
                      {elem.shop === "sakamknigi" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Сакам книги
                        </p>
                      ) : elem.shop === "tri" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Три
                        </p>
                      ) : elem.shop === "matica" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Матица
                        </p>
                      ) : elem.shop === "kupikniga" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Купи книга
                        </p>
                      ) : elem.shop === "antolog" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Антолог
                        </p>
                      ) : elem.shop === "gjurgja" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Ѓурѓа
                        </p>
                      ) : elem.shop === "martina" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Мартина
                        </p>
                      ) : elem.shop === "toper" ? (
                        <p
                          id="knizara"
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Топер
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
            {books.length === 0 ? (
              <div></div>
            ) : (
              <Pagination
                style={{ float: "right" }}
                className="my-3"
                count={totalElements}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Book;
