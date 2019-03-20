import axios from 'axios';
import { USER_SERVER } from '../utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  CLEAR_CART_ITEMS,
  REMOVE_FROM_CART,
  UPDATE_PROFILE,
  CLEAR_UPDATE_PROFILE,
  ON_PAYMENT
} from '../utils/types';

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register/`, dataToSubmit).then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login/`, dataToSubmit).then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth/`).then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function addToCart(id) {
  const request = axios.post(`${USER_SERVER}/add_to_cart?bookId=${id}`).then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request
  };
}

export function removeFromCart(id) {
  const request = axios.get(`${USER_SERVER}/remove_from_cart?id=${id}`).then(response => {
    response.data.userCart.forEach(item => {
      response.data.cartItems.forEach((k, i) => {
        if (item.id === k._id) response.data.cartItems[i].quantity = item.quantity;
      });
    });

    return response.data;
  });

  return {
    type: REMOVE_FROM_CART,
    payload: request
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`/api/cart?items=${cartItems}`).then(response => {
    userCart.forEach(item => {
      response.data.forEach((k, i) => {
        if (item.id === k._id) response.data[i].quantity = item.quantity;
      });
    });

    return response.data;
  });

  return {
    type: GET_CART_ITEMS,
    payload: request
  };
}

export function clearCartItems() {
  return {
    type: CLEAR_CART_ITEMS,
    payload: []
  };
}

export function updateProfile(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/update_profile`, dataToSubmit).then(response => response.data);

  return {
    type: UPDATE_PROFILE,
    payload: request
  };
}

export function clearUpdateProfile() {
  return {
    type: CLEAR_UPDATE_PROFILE,
    payload: null
  };
}

export function onPayment(data) {
  const request = axios.post(`${USER_SERVER}/buy`, data).then(response => response.data);

  return {
    type: ON_PAYMENT,
    payload: request
  };
}
