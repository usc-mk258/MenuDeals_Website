import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AdminDashboard from "views/Admin/dashboard"
import jwt from 'jwt-decode'

export default class Admin extends Component {
  componentWillMount() {
    const localData = JSON.parse(localStorage.getItem('userData'));
    if (localData === null) {
      this.props.history.push("/")
    } else {

      const userTokenDecode = jwt(JSON.parse(localStorage.getItem('userData')).data.data.token)
      console.log(userTokenDecode.role);
      console.log(localData)
      if (userTokenDecode.role !== "ADMIN") {
        this.props.history.push("/404")

      }
    }
  }
  render() {
    return (
      <div>
        <Route path="/Admin/Dashboard" component={AdminDashboard} />
      </div>
    );
  }
}