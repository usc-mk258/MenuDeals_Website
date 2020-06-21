import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupAsCustomer from "views/Customer/SignupAsCustomer"
import SignupAsResturant from "views/Resturant/signupAsResturant"
import ResturantInfo from "views/Resturant/info"
import ResturantDeals from "views/Resturant/deals"
import ResturantOrder from "views/Resturant/orders"
import CustomerDashboard from "views/Customer/Dashboard"
import CustomerResturantDetail from "views/Customer/resturantDetail"
import CustomerMyOrder from "views/Customer/myOrders"
import AdminSignin from "views/Admin/AdminSignin"
import AdminDashboard from "views/Admin/index"
import Resturant from "views/Resturant/index"
import Customer from "views/Customer/index"
import Login from "views/LoginPage/LoginPage"
import FourZeroFour from "views/404/index"


var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/Resturant/signup" component={SignupAsResturant} />
      <Route path="/Customer/signup" component={SignupAsCustomer} />
      <Route path="/Admin/signin" component={AdminSignin} />
      <Route path="/Login" component={Login}/>
      {/* <Route path="/Resturant/info" component={ResturantInfo} />
      <Route path="/Resturant/deals" component={ResturantDeals} />
      <Route path="/Resturant/orders" component={ResturantOrder} />
      <Route path="/Customer/dashbord" component={CustomerDashboard} />
      <Route path="/Customer/resturant" component={CustomerResturantDetail} />
      <Route path="/Customer/My-order" component={CustomerMyOrder} /> */}
      <Route path="/Resturant/" component={Resturant} />
      <Route path="/Admin/" component={AdminDashboard} />
      <Route path="/Customer/" component={Customer} />
      <Route path="/404" component={FourZeroFour} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
