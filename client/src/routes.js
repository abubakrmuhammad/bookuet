import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import Home from './components/Home';
import Shop from './components/Shop';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UpdateProfile from './components/User/UpdateProfile';
import AddBook from './components/User/Admin/AddBook';
import ManageCategories from './components/User/Admin/ManageCategories';
import ManageSite from './components/User/Admin/ManageSite';
import BookDetails from './components/BookDetails';
import PageNotFound from './utils/PageNotFound';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/user/dashboard' component={Auth(UserDashboard, true)} />
        <Route exact path='/user/cart' component={Auth(Cart, true)} />
        <Route exact path='/user/cart/checkout' component={Auth(Checkout, true)} />
        <Route exact path='/user/profile' component={Auth(UpdateProfile, true)} />
        <Route exact path='/admin/add_book' component={Auth(AddBook, true)} />
        <Route exact path='/admin/manage_categories' component={Auth(ManageCategories, true)} />
        <Route exact path='/admin/site_info' component={Auth(ManageSite, true)} />
        <Route exact path='/register' component={Auth(Register, false)} />
        <Route exact path='/register_login' component={Auth(RegisterLogin, false)} />
        <Route exact path='/books/:id' component={Auth(BookDetails, null)} />
        <Route exact path='/books' component={Auth(Shop, null)} />
        <Route exact path='/' component={Auth(Home, null)} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
