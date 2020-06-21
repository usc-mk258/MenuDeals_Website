import { FILE_UPLOAD } from "./../../Apis/index";
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
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import AutoSuggest from "components/AutoSuggest";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/Signup.jpg";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import {
  RESTURANT_GET_ALL_DEALS,
  RESTURANT_ADD_DEAL,
  RESTURANT_REVIEWS,
} from "Apis";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import jwt from "jwt-decode";

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
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Deals(props) {
  console.log(userTokenDecode);
  const userTokenDecode = jwt(
    JSON.parse(localStorage.getItem("userData")).data.data.token
  );
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [open, setOpen] = React.useState(false);
  const [reviewOpen, setreviewOpen] = React.useState(false);
  const [file, setFile] = React.useState([]);
  const [deals, setDeals] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [review, setReview] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const { ...rest } = props;
  const handleImage = async (e) => {
    if (!e) return;
    let file = e[0];
    let formData = new FormData();
    formData.append("customFile", file);
    axios
      .post(FILE_UPLOAD, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(`Success`, res);
        setImageUrl(res.data.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    getAllDealsCall();
    getAllReviewCall();
  }, []);
  const getAllDealsCall = () => {
    axios
      .get(`${RESTURANT_GET_ALL_DEALS}/${userTokenDecode.id}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token,
        },
      })
      .then((res) => {
        console.log(res);
        setDeals(res.data.data);
      });
  };
  const getAllReviewCall = () => {
    axios
      .get(`${RESTURANT_REVIEWS}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token,
        },
      })
      .then((res) => {
        console.log(res);
        setReview(res.data.data.reviews);
      });
  };
  const submitDeal = () => {
    axios({
      method: "post",
      url: RESTURANT_ADD_DEAL,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userData")).data.data.token,
      },
      data: {
        description: description,
        price: price,
        image_url: imageUrl,
      },
    }).then((res) => {
      handleClose();
      console.log(res);
      getAllDealsCall();
    });
  };
  console.log(review);

  return (
    <div>
      {/* dialog start */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Deal
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            style={{ marginBottom: "20px" }}
            id="outlined-read-only-input"
            label="Price"
            value={price}
            onChange={handleChangePrice}
            variant="outlined"
          />
          <TextField
            fullWidth
            style={{ marginBottom: "20px" }}
            id="outlined-read-only-input"
            label="Description"
            value={description}
            rows={4}
            multiline
            onChange={handleChangeDes}
            variant="outlined"
          />

          <Grid style={{ marginTop: "20px" }}>
            <DropzoneArea onChange={(e) => handleImage(e)} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => submitDeal()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog end */}
      <Dialog
        onClose={() => setreviewOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={reviewOpen}
      >
        <h2>Reviews</h2>
        <div
          style={{
            height: "395px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          {review &&
            review.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "13px",
                    cursor: "pointer",
                  }}
                >
                  <img src={item.image_url} height="119px" />
                  <div>
                    <h3 style={{ paddingLeft: "20px" }}>{item.description}</h3>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        width: "394px",
                        paddingLeft: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Rating({item.rating}/5)
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Dialog>
      <Header
        absolute
        color="transparent"
        brand="Foodie"
        rightLinks={<HeaderLinks resturant={true} />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card
                style={{ backgroundColor: "transparent" }}
                className={classes[cardAnimaton]}
              >
                <h2 style={{ color: "white", textAlign: "center" }}>
                  Our Deals
                </h2>
              </Card>
              <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className={classes.registerNavLink}
                  onClick={handleClickOpen}
                  // onClick={() => props.history.push('/Customer/signup')}
                  color="rose"
                  round
                >
                  Add Deal
                </Button>
                <Button
                  className={classes.registerNavLink}
                  onClick={() => {
                    setreviewOpen(true);
                  }}
                  // onClick={() => props.history.push('/Customer/signup')}
                  color="rose"
                  round
                >
                  Reviews
                </Button>
              </Grid>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  {deals.map((item) => {
                    console.log(item);
                    return (
                      <Grid item xs={4}>
                        <Card style={{}} className={classes[cardAnimaton]}>
                          <img
                            src={
                              item.image_url
                                ? item.image_url
                                : require("assets/img/biryani.png")
                            }
                            height="219px"
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              paddingLeft: "14px",
                              paddingRight: "20px",
                            }}
                          >
                            <h3 style={{ textAlign: "center" }}>
                              {item.description}
                            </h3>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                              }}
                            >
                              {item.price}
                            </p>
                          </div>
                          {/* <p style={{ padding: "15px" }}>{item.description}</p> */}
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {deals.map((item) => {
                                    console.log(item)
                                    return (
                                       
                                    )
                                })

                                }

                            </div> */}
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}
