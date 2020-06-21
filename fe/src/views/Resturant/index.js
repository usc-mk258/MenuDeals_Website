import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ResturantInfo from "views/Resturant/info"
import ResturantDeals from "views/Resturant/deals"
import ResturantOrder from "views/Resturant/orders"
import ResturantEditInfo from "views/Resturant/editInfo"
import jwt from 'jwt-decode'

export default class Resturant extends Component {
  state = {
    centerlat: 0,
    centerlng: 0

  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((success) => {
      console.log(success.coords.latitude)
      this.setState({ centerlat: success.coords.latitude, centerlng: success.coords.longitude })

    })
    const localData = JSON.parse(localStorage.getItem('userData'));
    if (localData === null) {
      this.props.history.push("/")
    } else {

      const userTokenDecode = jwt(JSON.parse(localStorage.getItem('userData')).data.data.token)
      console.log(userTokenDecode);
      console.log(localData)
      if (userTokenDecode.role !== "RESTAURANT") {
        this.props.history.push("/404")

      }
    }
  }
  render() {

    return (
      <div>
        <Route path="/Resturant/info" component={() => <ResturantInfo currentLocation={this.state} props={this.props} />} />
        <Route path="/Resturant/deals" component={ResturantDeals} />
        <Route path="/Resturant/edit-info" component={ResturantEditInfo} />
        <Route path="/Resturant/orders" component={ResturantOrder} />
      </div>
    );
  }
}