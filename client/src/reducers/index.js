import { combineReducers } from 'redux';
import user from './user_reducer';
import books from './books_reducer';
import site from './site_reducer';

const rootReducer = combineReducers({
  user,
  books,
  site
});

export default rootReducer;
