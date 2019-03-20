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

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };
    case CLEAR_UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };
    case ADD_TO_CART:
      return { ...state, userData: { ...state.userData, cart: action.payload } };
    case REMOVE_FROM_CART:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload.userCart },
        cart: action.payload.cartItems
      };
    case GET_CART_ITEMS:
      return { ...state, cart: action.payload };
    case CLEAR_CART_ITEMS:
      return { ...state, cart: action.payload };
    case ON_PAYMENT:
      return {
        ...state,
        paymentSuccess: action.payload.success,
        cart: action.payload.cart,
        userData: { ...state.userData, cart: action.payload.cart }
      };
    default:
      return state;
  }
}
