import axios from 'axios';
import { BOOKS_SERVER } from '../utils/misc';
import {
  GET_BOOKS_BY_SELL,
  GET_BOOKS_BY_ARRIVAL,
  GET_CATEGORIES,
  GET_BOOKS_TO_SHOP,
  ADD_BOOK,
  CLEAR_BOOK,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  GET_BOOK_DETAILS,
  CLEAR_BOOK_DETAILS
} from '../utils/types';

export function getBooksBySell() {
  const request = axios.get(`${BOOKS_SERVER}?sortBy=sold&order=desc&limit=4`).then(response => response.data);

  return {
    type: GET_BOOKS_BY_SELL,
    payload: request
  };
}

export function getBooksByArrival() {
  const request = axios.get(`${BOOKS_SERVER}?sortBy=createdAt&order=desc&limit=4`).then(response => response.data);

  return {
    type: GET_BOOKS_BY_ARRIVAL,
    payload: request
  };
}

export function getCategories() {
  const request = axios.get(`${BOOKS_SERVER}/categories`).then(response => response.data);

  return {
    type: GET_CATEGORIES,
    payload: request
  };
}

export function getBooksToShop(skip, limit, filters = {}, sortBy, order, previousBooks = []) {
  const data = { skip, limit, filters, sortBy };
  const request = axios.post(`${BOOKS_SERVER}/shop`, data).then(response => {
    const { size, books } = response.data;
    const totalBooks = [...previousBooks, ...books];
    return { size, books: totalBooks };
  });

  return {
    type: GET_BOOKS_TO_SHOP,
    payload: request
  };
}

export function addBook(dataToSubmit) {
  const request = axios.post('/api/book', dataToSubmit).then(response => response.data);

  return {
    type: ADD_BOOK,
    payload: request
  };
}

export function clearBook() {
  return {
    type: CLEAR_BOOK,
    payload: []
  };
}

export function addCategory(dataToSubmit, existingCategories) {
  const request = axios.post(`${BOOKS_SERVER}/category`, dataToSubmit).then(response => {
    return [...existingCategories, response.data.category];
  });

  return {
    type: ADD_CATEGORY,
    payload: request
  };
}

export function removeCategory(category) {
  const request = axios.post(`${BOOKS_SERVER}/category/remove`, category);

  return {
    type: REMOVE_CATEGORY,
    payload: request
  };
}

export function getBookDetails(id) {
  const request = axios.get(`${BOOKS_SERVER}/book?id=${id}`).then(response => response.data);

  return {
    type: GET_BOOK_DETAILS,
    payload: request
  };
}

export function clearBookDetails() {
  return {
    type: CLEAR_BOOK_DETAILS,
    payload: null
  };
}
