import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import CustomerDashboard from "views/Customer/Dashboard"
import CustomerResturantDetail from "views/Customer/resturantDetail"
import CustomerMyOrder from "views/Customer/myOrders"
import jwt from 'jwt-decode'

export default class Customer extends Component {
  componentWillMount() {
    const localData = JSON.parse(localStorage.getItem('userData'));
    if (localData === null) {
      this.props.history.push("/")
    } else {

      const userTokenDecode = jwt(JSON.parse(localStorage.getItem('userData')).data.data.token)
      console.log(userTokenDecode.role);
      console.log(localData)
      if (userTokenDecode.role !== "Customer") {
        this.props.history.push("/404")

      }
    }
  }
  render() {
    return (
      <div>
        <Route path="/Customer/dashbord" component={CustomerDashboard} />
        <Route path="/Customer/resturant" component={CustomerResturantDetail} />
        <Route path="/Customer/My-order" component={CustomerMyOrder} />
      </div>
    );
  }
}