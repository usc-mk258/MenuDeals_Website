import { Map } from "./../../components/Map/index";
import React, { Component } from "react";
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
import { Grid, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import { RESTURANT_ADD_INFO, FILE_UPLOAD } from "Apis";
import axios from "axios";
import jwt from "jwt-decode";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      lat: 0,
      lng: 0,
      image_url: [],
    };
  }
  setLatLng = (lat, lng) => {
    this.setState({
      lat,
      lng,
    });
  };
  handleChange = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    this.setState({ description: value });
  };

  handleImage = async (e) => {
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
        this.setState({
          image_url: this.state.image_url.concat(res.data.data.url),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submit = () => {
    console.log(this.state.description);
    console.log(this.state.lat);
    console.log(this.state.lng);
    axios({
      method: "post",
      url: RESTURANT_ADD_INFO,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userData")).data.data.token,
      },
      data: {
        description: this.state.description,
        latitude: `${
          this.state.lat === 0
            ? this.props.currentLocation.centerlat
            : this.state.lat
        }`,
        longitude: `${
          this.state.lng === 0
            ? this.props.currentLocation.centerlng
            : this.state.lng
        }`,
        image_url:
          this.state.image_url < 1
            ? ["data:image/png;base64,DecTGHE...."]
            : this.state.image_url,
      },
    }).then((res) => {
      console.log(res);
      this.props.props.history.push("/Resturant/deals");
    });
  };
  render() {
    console.log(this.state.description);
    console.log(this.state.lat);
    console.log(this.state.lng);
    console.log(this.props.currentLocation);
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Foodie"
          // rightLinks={<HeaderLinks />}
          {...rest.props}
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
                <Card>
                  <form className={classes.form}>
                    <h2
                      style={{ textAlign: "center" }}
                      className={classes.divider}
                    >
                      {
                        jwt(
                          JSON.parse(localStorage.getItem("userData")).data.data
                            .token
                        ).name
                      }
                    </h2>
                    <CardBody>
                      {/* <InputLabel id="demo-controlled-open-select-label">{"Description"}</InputLabel> */}

                      <TextField
                        id="outlined-multiline-static"
                        label="Add Description"
                        multiline
                        fullWidth
                        name="description"
                        onChange={(e) => this.handleChange(e)}
                        rows={4}
                        variant="outlined"
                      />
                      <div style={{ width: "100%", marginTop: "8px" }}>
                        <DropzoneArea
                          dropzoneText={
                            "Upload restaurant pictures (max 3 uploads)"
                          }
                          onChange={(e) => this.handleImage(e)}
                        />
                      </div>
                      <div style={{ width: "100%", marginTop: "8px" }}>
                        <h4 style={{ fontWeight: "bold" }}>Select location:</h4>
                        <Map
                          currentLocation={{
                            center: this.props.currentLocation,
                          }}
                          setLatLng={this.setLatLng}
                        />
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        style={{ marginTop: "100px" }}
                        className={classes.registerNavLink}
                        onClick={() => this.submit()}
                        color="rose"
                        round
                      >
                        Submit
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Info);
