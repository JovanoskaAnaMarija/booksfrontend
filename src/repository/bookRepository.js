import axios from "axios";
import InstanceService from "../services/InstanceService";
const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const BookService = {
  getAllBooksWithPagination: (page, size, bookFilter) => {
    return instance.post(`rest/books/allBooks/${page}/${size}`, bookFilter, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllBooksByShop: (page, size, shop) => {
    return instance.post(
      `rest/books/shop/${page}/${size}`,
      {},
      {
        headers: {
          shop: shop,
          "Content-Type": "application/json",
        },
      }
    );
  },
  getAllBooksByShopWithoutPagination: (shop) => {
    return instance.post(
      `rest/books/shop/all`,
      {},
      {
        headers: {
          shop: shop,
          "Content-Type": "application/json",
        },
      }
    );
  },
  sortBooksByPrice: (page, size) => {
    return instance.get(`rest/books/sortByPrice/${page}/${size}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllBooks: () => {
    return instance.get("rest/books/allBooks");
  },
  addToFavourites: (id) => {
    return instance.post(`rest/books/addToFavourites/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  removeFromFavourites: (id) => {
    return instance.post(`rest/books/removeFromFavourites/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  findAllFavourites: (page, size) => {
    return instance.get(`rest/books/favourites/${page}/${size}`);
  },
  addBookToFavoruites: (bookUserHelper) => {
    return InstanceService.post(`/rest/bookuser/add`, bookUserHelper, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  removeBookFromFavourites: (bookId, userId) => {
    return InstanceService.delete(`/rest/bookuser/delete/${bookId}/${userId}`);
  },
  getBooksForUser: (id) => {
    return InstanceService.get(`rest/bookuser/getForUser/${id}`);
  },

  getBooksForUserWithPagination: (id, page, size) => {
    return InstanceService.get(
      `rest/bookuser/getForUser/${id}/${page}/${size}`
    );
  },
};
export default BookService;
