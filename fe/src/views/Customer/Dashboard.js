import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/Signup.jpg";
import { Grid } from "@material-ui/core";

import { CUSTOMER_NEARBY_RESTAURANT } from "Apis";
import axios from "axios";
import jwt from "jwt-decode";

import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";
const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [ResNearby, setResNearby] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState();
  const [error, setError] = React.useState();
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success.coords);
    setCurrentLocation(success.coords);
  });
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  useEffect(() => {
    if (currentLocation) {
      getAllResturantNearbyCall();
    }
  }, [currentLocation]);
  const getAllResturantNearbyCall = () => {
    axios({
      method: "post",
      url: CUSTOMER_NEARBY_RESTAURANT,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userData")).data.data.token,
      },
      data: {
        latitude: currentLocation.latitude.toString(),
        longitude: currentLocation.longitude.toString(),
      },
    })
      .then((res) => {
        console.log(res);
        setResNearby(res.data.data.restaurants);
      })
      .catch((err) => {
        setError("No Restaurant found for this region");
        setResNearby([]);
      });
  };
  console.log(ResNearby);
  const selectedPlace = async (address) => {
    const place = await geocodeByPlaceId(address.place_id);
    console.log(place[0].geometry.location.lat());
    console.log(place[0].geometry.location.lng());
    setCurrentLocation({
      latitude: place[0].geometry.location.lat(),
      longitude: place[0].geometry.location.lng(),
    });
  };
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Foodie"
        rightLinks={
          <HeaderLinks
            customerOrder={"My Orders"}
            customerOrderLink={"/Customer/My-order"}
            dashboard={"Dashboard"}
            customerDashboardLink={"/Customer/dashbord"}
          />
        }
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          height: "auto",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card
                style={{ height: "20px", marginTop: "0px" }}
                className={classes[cardAnimaton]}
              >
                <Paper component="form" className={classes.root}>
                  <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <GooglePlacesAutocomplete onSelect={selectedPlace} />
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton
                    color="primary"
                    className={classes.iconButton}
                    aria-label="directions"
                  >
                    <DirectionsIcon />
                  </IconButton>
                </Paper>
              </Card>
            </GridItem>

            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                {error && ResNearby.length < 1 ? (
                  <div style={{ marginLeft: "35vw", marginTop: "25vh" }}>
                    <h5>{error}</h5>
                  </div>
                ) : (
                  ""
                )}
                {ResNearby.map((item) => {
                  console.log(item);
                  return (
                    <Grid item xs={4}>
                      <Card
                        style={{ backgroundColor: "transparent" }}
                        className={classes[cardAnimaton]}
                      >
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Card
                            onClick={() =>
                              props.history.push({
                                pathname: "/Customer/resturant",
                                state: { resturantDetail: item },
                              })
                            }
                            style={{
                              marginRight: "37px",
                              cursor: "pointer",
                              alignItems: "inherit",
                            }}
                            className={classes.root}
                          >
                            <CardHeader
                              avatar={
                                <Avatar
                                  aria-label="recipe"
                                  className={classes.avatar}
                                >
                                  {item.name.charAt(0).toUpperCase()}
                                </Avatar>
                              }
                              title={item.name}
                              subheader={item.email}
                            />
                            <img
                              src={
                                item.image_url[0]
                                  ? item.image_url[0]
                                  : require("assets/img/pizzahut.jpeg")
                              }
                              height="200px"
                            />

                            <CardContent>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {item.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
