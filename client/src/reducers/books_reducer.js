import {
  GET_BOOKS_BY_ARRIVAL,
  GET_BOOKS_BY_SELL,
  GET_CATEGORIES,
  GET_BOOKS_TO_SHOP,
  ADD_BOOK,
  CLEAR_BOOK,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  GET_BOOK_DETAILS,
  CLEAR_BOOK_DETAILS
} from '../utils/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOOKS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_BOOKS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: action.payload };
    case REMOVE_CATEGORY:
      return { ...state };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_BOOKS_TO_SHOP:
      return { ...state, books: action.payload.books, size: action.payload.size };
    case GET_BOOK_DETAILS:
      return { ...state, book: action.payload };
    case CLEAR_BOOK_DETAILS:
      return { ...state, book: action.payload };
    case ADD_BOOK:
      return { ...state, addBook: action.payload };
    case CLEAR_BOOK:
      return { ...state, addBook: action.payload };
    default:
      return { ...state };
  }
}
