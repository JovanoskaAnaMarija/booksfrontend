import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { React, useEffect, useState } from "react";
import Books from "../Books/Books";
import { BsTrash } from "react-icons/bs";
import BookService from "../../repository/bookRepository";
import Pagination from "@material-ui/lab/Pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const WishList = () => {
  let favBooks = JSON.parse(localStorage.getItem("favouriteBooks"));
  const MySwal = withReactContent(Swal);
  const [favouritesList, setFavouritesList] = useState(favBooks);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [favouritesBooks, setFavouritesBooks] = useState([]);
  const [newFavouriteBooks, setNewFavouriteBooks] = useState([]);
  const handleRemoveBook = (id) => {
    // favBooks.splice(id, 1);
    //  setFavouritesList(favouritesList.filter((book) => book.id !== id));
    // localStorage.setItem("favouriteBooks", JSON.stringify(favouritesList))

    BookService.removeFromFavourites(id).then((res) => {
      setFavouritesBooks(favouritesBooks.filter((book) => book.id !== id));
      // setFavouritesBooks(favouritesBooks)
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getBooksForUser(newPage);
    // getAllBooks(newPage)
    // setLoading(true)
  };

  const findAllFavourites = (page) => {
    page = page - 1;

    //  setLoading(true)

    BookService.getBooksForUserWithPagination(
      localStorage.getItem("loggedUserId"),
      page,
      rowsPerPage
    )
      .then((response) => response.data)
      .then((data) => {
        // setLoading(false)
        setNewFavouriteBooks(data.content);
        setTotalElements(data.totalPages);
        setPage(data.number + 1);
      });
  };
  const deleteFromFavourites = (id) => {
    BookService.removeBookFromFavourites(
      id,
      localStorage.getItem("loggedUserId")
    ).then((res) => {
      setNewFavouriteBooks(newFavouriteBooks.filter((book) => book.id !== id));
      console.log(res.data);
      MySwal.fire({
        title: <strong>Избришано од листа на омилени</strong>,
        html: "Успешно ја избришавте книгата",
        icon: "success",
      }).then();
    });
  };
  const getBooksForUser = (page) => {
    page = page - 1;
    var newFav = [];
    BookService.getBooksForUserWithPagination(
      localStorage.getItem("loggedUserId"),
      page,
      rowsPerPage
    )
      .then((response) => response.data)
      .then((data) => {
        // console.log(res.data)
        data.content.map((book) => {
          console.log(book.books);
          newFav.push(book.books);

          console.log(newFav);
        });
        setTotalElements(data.totalPages);
        setPage(data.number + 1);
        setNewFavouriteBooks(newFav);
        // console.log("newFac", newFavouriteBooks)
      });
  };
  useEffect(() => {
    //  console.log(favBooks)
    getBooksForUser(page);
    // findAllFavourites(page)
    return () => {};
  }, []);
  function transliterate(word) {
    word.toLowerCase();
    word.replace("– (тврд повез)", "");
    var answer = "",
      a = {};

    a["а"] = "a";
    a["б"] = "b";
    a["в"] = "v";
    a["г"] = "g";
    a["д"] = "d";
    a["ѓ"] = "g";
    a["е"] = "e";
    a["ж"] = "z";
    a["з"] = "z";
    a["ѕ"] = "z";
    a["и"] = "i";
    a["ј"] = "j";
    a["к"] = "k";
    a["л"] = "l";
    a["м"] = "m";
    a["н"] = "n";
    a["њ"] = "nj";
    a["о"] = "o";
    a["п"] = "p";
    a["р"] = "r";
    a["с"] = "s";
    a["т"] = "t";
    a["ќ"] = "ќ";
    a["у"] = "u";
    a["ф"] = "f";
    a["х"] = "h";
    a["ц"] = "c";
    a["ч"] = "c";
    a["џ"] = "џ";
    a["ш"] = "s";
    a[" "] = "-";

    a["А"] = "a";
    a["Б"] = "b";
    a["В"] = "v";
    a["Г"] = "g";
    a["Д"] = "d";
    a["Ѓ"] = "g";
    a["Е"] = "e";
    a["Ж"] = "z";
    a["З"] = "z";
    a["Ѕ"] = "z";
    a["И"] = "i";
    a["Ј"] = "j";
    a["К"] = "k";
    a["Л"] = "l";
    a["Љ"] = "l";
    a["М"] = "m";
    a["Н"] = "n";
    a["Њ"] = "nj";
    a["О"] = "o";
    a["П"] = "p";
    a["Р"] = "r";
    a["С"] = "s";
    a["Т"] = "t";
    a["Ќ"] = "ќ";
    a["У"] = "u";
    a["ф"] = "f";
    a["Х"] = "h";
    a["Ц"] = "c";
    a["Ч"] = "c";
    a["Џ"] = "џ";
    a["Ш"] = "s";
    a[" "] = "-";

    for (var i in word) {
      if (word.hasOwnProperty(i)) {
        if (a[word[i]] === undefined) {
          answer += word[i];
        } else {
          answer += a[word[i]];
        }
      }
    }

    return answer;
  }
  function transliterateKupiKniga(word) {
    word.toLowerCase();
    word.replace("– (тврд повез)", "");
    var answer = "",
      a = {};

    a["а"] = "a";
    a["б"] = "b";
    a["в"] = "v";
    a["г"] = "g";
    a["д"] = "d";
    a["ѓ"] = "g";
    a["е"] = "e";
    a["ж"] = "z";
    a["з"] = "z";
    a["ѕ"] = "z";
    a["и"] = "i";
    a["ј"] = "j";
    a["к"] = "k";
    a["л"] = "l";
    a["м"] = "m";
    a["н"] = "n";
    a["њ"] = "nj";
    a["о"] = "o";
    a["п"] = "p";
    a["р"] = "r";
    a["с"] = "s";
    a["т"] = "t";
    a["ќ"] = "ќ";
    a["у"] = "u";
    a["ф"] = "f";
    a["х"] = "h";
    a["ц"] = "c";
    a["ч"] = "c";
    a["џ"] = "џ";
    a["ш"] = "s";
    a[" "] = "-";
    a["Č"] = "c";
    a["Š"] = "s";
    a["đ"] = "d";
    a["“"] = "";
    a["”"] = "";
    a["č"] = "c";
    a["š"] = "s";
    a["ž"] = "z";
    a["ć"] = "c";

    a["А"] = "a";
    a["Б"] = "b";
    a["В"] = "v";
    a["Г"] = "g";
    a["Д"] = "d";
    a["Ѓ"] = "g";
    a["Е"] = "e";
    a["Ж"] = "z";
    a["З"] = "z";
    a["Ѕ"] = "z";
    a["И"] = "i";
    a["Ј"] = "j";
    a["К"] = "k";
    a["Л"] = "l";
    a["Љ"] = "l";
    a["М"] = "m";
    a["Н"] = "n";
    a["Њ"] = "nj";
    a["О"] = "o";
    a["П"] = "p";
    a["Р"] = "r";
    a["С"] = "s";
    a["Т"] = "t";
    a["Ќ"] = "ќ";
    a["У"] = "u";
    a["ф"] = "f";
    a["Х"] = "h";
    a["Ц"] = "c";
    a["Ч"] = "c";
    a["Џ"] = "џ";
    a["Ш"] = "s";
    a[" "] = "-";
    a["Č"] = "c";
    a["đ"] = "d";
    a["“"] = "";
    a["č"] = "c";

    for (var i in word) {
      if (word.hasOwnProperty(i)) {
        if (a[word[i]] === undefined) {
          answer += word[i];
        } else {
          answer += a[word[i]];
        }
      }
    }

    return answer;
  }

  function transliterateMatica(word) {
    word.toLowerCase();
    word.replace("– (тврд повез)", "");
    var answer = "",
      a = {};

    a["а"] = "a";
    a["б"] = "b";
    a["в"] = "v";
    a["г"] = "g";
    a["д"] = "d";
    a["ѓ"] = "g";
    a["е"] = "e";
    a["ж"] = "z";
    a["з"] = "z";
    a["ѕ"] = "z";
    a["и"] = "i";
    a["ј"] = "j";
    a["к"] = "k";
    a["л"] = "l";
    a["м"] = "m";
    a["н"] = "n";
    a["њ"] = "nj";
    a["о"] = "o";
    a["п"] = "p";
    a["р"] = "r";
    a["с"] = "s";
    a["т"] = "t";
    a["ќ"] = "ќ";
    a["у"] = "u";
    a["ф"] = "f";
    a["х"] = "h";
    a["ц"] = "c";
    a["ч"] = "c";
    a["џ"] = "dz";
    a["ш"] = "s";
    a[" "] = "-";
    a["Č"] = "c";
    a["Š"] = "s";
    a["đ"] = "d";
    a["“"] = "";
    a["”"] = "";
    a["č"] = "c";
    a["š"] = "s";
    a["ž"] = "z";
    a["ć"] = "c";

    a["А"] = "a";
    a["Б"] = "b";
    a["В"] = "v";
    a["Г"] = "g";
    a["Д"] = "d";
    a["Ѓ"] = "g";
    a["Е"] = "e";
    a["Ж"] = "z";
    a["З"] = "z";
    a["Ѕ"] = "z";
    a["И"] = "i";
    a["Ј"] = "j";
    a["К"] = "k";
    a["Л"] = "l";
    a["Љ"] = "l";
    a["М"] = "m";
    a["Н"] = "n";
    a["Њ"] = "nj";
    a["О"] = "o";
    a["П"] = "p";
    a["Р"] = "r";
    a["С"] = "s";
    a["Т"] = "t";
    a["Ќ"] = "ќ";
    a["У"] = "u";
    a["ф"] = "f";
    a["Х"] = "h";
    a["Ц"] = "c";
    a["Ч"] = "c";
    a["Џ"] = "dz";
    a["Ш"] = "s";
    a[" "] = "-";
    a["Č"] = "c";
    a["đ"] = "d";
    a["“"] = "";
    a["č"] = "c";

    for (var i in word) {
      if (word.hasOwnProperty(i)) {
        if (a[word[i]] === undefined) {
          answer += word[i];
        } else {
          answer += a[word[i]];
        }
      }
    }

    return answer;
  }
  return (
    <div>
      <h1>Листа на омилени книги</h1>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Име</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Нова цена</TableCell>
              <TableCell>Продавница</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newFavouriteBooks.map((favourite) => {
              return (
                <TableRow key={favourite.id}>
                  <TableCell>
                    <a href={favourite.linkToBook}>
                      <img
                        src={favourite.image}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </a>
                  </TableCell>
                  <TableCell>
                    <p style={{ textDecoration: "none", color: "black" }}>
                      {favourite.name}
                    </p>
                  </TableCell>
                  <TableCell>{favourite.author}</TableCell>
                  <TableCell>{favourite.price}</TableCell>
                  <TableCell>{favourite.new_price}</TableCell>
                  <TableCell>
                    {favourite.shop === "sakamknigi"
                      ? "Сакам Книги"
                      : favourite.shop === "kupikniga"
                      ? "Купи Книга"
                      : favourite.shop === "tri"
                      ? "Три"
                      : favourite.shop === "matica"
                      ? "Матица"
                      : favourite.shop === "antolog"
                      ? "Антолог"
                      : favourite.shop === "gjurgja"
                      ? "Ѓурѓа"
                      : favourite.shop === "toper"
                      ? "Топер"
                      : favourite.shop === "martina"
                      ? "Мартина"
                      : null}
                  </TableCell>
                  <TableCell>
                    <button className="btn">
                      <BsTrash
                        onClick={() => {
                          deleteFromFavourites(favourite.id);
                        }}
                        style={{ fontSize: "1.5rem" }}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ float: "right" }}
        className="my-3"
        count={totalElements}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        onChange={handleChangePage}
      />
    </div>
  );
};
export default WishList;
