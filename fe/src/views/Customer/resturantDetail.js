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
import Slider from "components/slider/index";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import ReactStars from "react-rating-stars-component";
import {
  CUSTOMER_RESTURANT_DEALS_URL,
  RESTURANT_ADD_DEAL,
  CUSTOMER_PLACE_ORDER_URL,
  CUSTOMER_RESTURANT_REVIEW
} from "Apis";
import axios from "axios";
import jwt from "jwt-decode";
import image from "assets/img/Signup.jpg";
import { GET_CUSTOMER_RESTURANT_REVIEWS } from "Apis";

const useStyles = makeStyles(styles);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Dashboard(props) {
  const userTokenDecode = jwt(
    JSON.parse(localStorage.getItem("userData")).data.data.token
  );
  console.log(userTokenDecode);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [ratingValue, setRating] = React.useState(0);
  const [deals, setDeals] = React.useState([]);
  const [restaurantReviews, setReviews] = React.useState([]);
  const [dealInfoItem, setDealInfoItem] = React.useState({});
  const [state, setState] = React.useState({
    review: "",
    description: ""
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = dealInfoItem => {
    setOpen(true);
    setDealInfoItem(dealInfoItem);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenReview = () => {
    setOpenReview(true);
  };
  const handleCloseReview = () => {
    setOpenReview(false);
  };
  useEffect(() => {
    getAllDealsCall();
    getAllReview();
  }, []);
  const getAllDealsCall = () => {
    axios
      .get(
        `${CUSTOMER_RESTURANT_DEALS_URL}/${props.location.state.resturantDetail.id}`,
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("userData")).data.data.token
          }
        }
      )
      .then(res => {
        console.log(res);
        setDeals(res.data.data);
      });
  };
  const getAllReview = () => {
    axios
      .get(
        `${GET_CUSTOMER_RESTURANT_REVIEWS}/${props.location.state.resturantDetail.id}`,
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("userData")).data.data.token
          }
        }
      )
      .then(res => {
        console.log(res);
        setReviews(res.data.data.reviews);
      });
  };

  const handleStars = e => {
    console.log(e);
    setRating(e);
  };
  const handleChangeReview = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const handleAddReview = () => {
    axios({
      method: "post",
      url: `${CUSTOMER_RESTURANT_REVIEW}/${props.location.state.resturantDetail.id}`,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userData")).data.data.token
      },
      data: {
        description: state.description,
        rating: `${ratingValue}`
      }
    }).then(res => {
      console.log(res);
      handleCloseReview();
    });
  };
  const confirmOrder = () => {
    axios({
      method: "post",
      url: `${CUSTOMER_PLACE_ORDER_URL}/${dealInfoItem.id}`,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userData")).data.data.token
      },
      data: {
        description: dealInfoItem.description,
        price: dealInfoItem.price
      }
    }).then(res => {
      console.log(res);
      handleClose();
    });
  };
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  console.log(props.location.state.resturantDetail);
  return (
    <div>
      {/* detail dialog start */}
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Deal info
        </DialogTitle>
        <DialogContent style={{ width: "700px" }} dividers>
          <div style={{ display: "flex" }}>
            <img src={dealInfoItem.image_url} height="119px" />
          </div>
          {/* <p style={{ fontSize: "16px", margin: "0", fontWeight: "bold" }}>Deal name: </p>
                    <div style={{ display: "flex" }}>
                        <p style={{}}>Deal 1</p>
                    </div> */}
          <p style={{ fontSize: "16px", margin: "0", fontWeight: "bold" }}>
            Price:{" "}
          </p>
          <div style={{ display: "flex" }}>
            <p style={{}}>{dealInfoItem.price}</p>
          </div>
          <p style={{ fontSize: "16px", margin: "0", fontWeight: "bold" }}>
            Description:{" "}
          </p>
          <div style={{ display: "flex" }}>
            <p style={{}}>{dealInfoItem.description} </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: "9px"
            }}
          >
            <Button
              className={classes.registerNavLink}
              onClick={() => confirmOrder()}
              color="rose"
              round
            >
              PLACE Order
            </Button>
            <Button
              className={classes.registerNavLink}
              onClick={handleClose}
              color="rose"
              round
            >
              Go back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* detail dialog end */}
      {/* Add review dialog start */}
      <Dialog
        maxWidth="lg"
        onClose={handleCloseReview}
        aria-labelledby="customized-dialog-title"
        open={openReview}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseReview}>
          Add Review
        </DialogTitle>
        <DialogContent style={{ width: "700px" }} dividers>
          <TextField
            id="outlined-multiline-static"
            label="Add Description"
            multiline
            fullWidth
            name="description"
            onChange={e => handleChangeReview(e)}
            rows={4}
            variant="outlined"
          />
          {/* <div style={{ display: "flex" }}> */}
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Reviews:</p>

          <ReactStars
            count={5}
            half={false}
            onChange={e => handleStars(e)}
            size={24}
            // emptyIcon={<i className="far fa-star"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            color2={"#ffd700"}
          />
          {/* </div> */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: "9px"
            }}
          >
            <Button
              className={classes.registerNavLink}
              onClick={handleAddReview}
              color="rose"
              round
            >
              Submit
            </Button>
            <Button
              className={classes.registerNavLink}
              onClick={handleCloseReview}
              color="rose"
              round
            >
              Go back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add review dialog end */}
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
          height: "900px"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card
                style={{ height: "auto", marginTop: "0px" }}
                className={classes[cardAnimaton]}
              >
                <h2 style={{ textAlign: "center" }}>
                  {props.location.state.resturantDetail.name
                    ? props.location.state.resturantDetail.name
                    : ""}
                </h2>
                <p style={{ padding: "24px" }}>
                  {props.location.state.resturantDetail.description
                    ? props.location.state.resturantDetail.description
                    : ""}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <AppBar
                    style={{
                      width: "329px",
                      backgroundColor: "transparent",
                      color: "black"
                    }}
                    position="static"
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab label="Deals" {...a11yProps(0)} />
                      <Tab label="Reviews" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <Button
                    className={classes.registerNavLink}
                    onClick={handleClickOpenReview}
                    // onClick={() => props.history.push('/Customer/signup')}
                    color="rose"
                    round
                  >
                    Add Review
                  </Button>
                </div>
                <TabPanel value={value} index={0}>
                  <div
                    style={{
                      width: "703px",
                      height: "259px",
                      overflow: "auto"
                    }}
                  >
                    {deals.map(item => {
                      return (
                        <div
                          onClick={() => handleClickOpen(item)}
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginBottom: "13px",
                            cursor: "pointer"
                          }}
                        >
                          <img
                            src={
                              item.image_url
                                ? item.image_url
                                : require("assets/img/Pizza.jpg")
                            }
                            height="119px"
                          />
                          <div>
                            <h3 style={{ paddingLeft: "20px" }}>
                              {item.description}
                            </h3>
                            <p
                              style={{
                                whiteSpace: "nowrap",
                                width: "473px",
                                paddingLeft: "20px",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              }}
                            >
                              {item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <div
                    style={{
                      width: "703px",
                      height: "259px",
                      overflow: "auto"
                    }}
                  >
                    {restaurantReviews &&
                      restaurantReviews.map(item => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              marginBottom: "13px",
                              cursor: "pointer"
                            }}
                          >
                            <div>
                              <h3 style={{ paddingLeft: "20px" }}>
                                {item.description}
                              </h3>
                              <p
                                style={{
                                  whiteSpace: "nowrap",
                                  width: "473px",
                                  paddingLeft: "20px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis"
                                }}
                              >
                                Rating(5/{item.rating})
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </TabPanel>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
