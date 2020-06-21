import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/Signup.jpg";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ADMIN_LOGIN_URL, RESTURANT_LOGIN_URL, CUSTOMER_LOGIN_URL } from "Apis";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import jwt from "jwt-decode";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorType, setErrorType] = React.useState();

  const handleClick = (message, errorType) => {
    setOpen(true);
    setErrorMessage(message);
    setErrorType(errorType);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  console.log(type);
  const submit = () => {
    axios({
      method: "post",
      url:
        type === "Admin"
          ? ADMIN_LOGIN_URL
          : type === "Customer"
          ? CUSTOMER_LOGIN_URL
          : RESTURANT_LOGIN_URL,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem("userData", JSON.stringify(res));
        debugger;
        const userTokenDecode = jwt(res.data.data.token);
        console.log(userTokenDecode);
        console.log(res);
        if (userTokenDecode.role === "ADMIN") {
          handleClick("Login Successfull", res.data.success);
          setTimeout(() => {
            props.history.push("/Admin/Dashboard");
          }, 1000);
        } else if (userTokenDecode.role === "Customer") {
          handleClick("Login Successfull", res.data.success);
          setTimeout(() => {
            props.history.push("/Customer/dashbord");
          }, 1000);
        } else if (userTokenDecode.role === "RESTAURANT") {
          handleClick("Login Successfull", res.data.success);
          setTimeout(() => {
            if (!res.data.data.introAdded)
              props.history.push("/Resturant/info");
            else {
              props.history.push("/Resturant/deals");
            }
          }, 1000);
        }
      })
      .catch((error) => {
        debugger;
        handleClick(error.response.data.message, error.response.data.success);
        console.log(error.response);
      });
  };
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Foodie"
        // rightLinks={<HeaderLinks />}
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login</h4>
                </CardHeader>
                <form onSubmit={() => submit()} className={classes.form}>
                  <CardBody>
                    <TextField
                      fullWidth
                      style={{ marginBottom: "20px" }}
                      id="outlined-read-only-input"
                      label="Email"
                      value={email}
                      onChange={handleChangeEmail}
                      InputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Password"
                      onChange={handleChangePassword}
                      value={password}
                      InputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      variant="outlined"
                    />
                    <FormControl
                      style={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Select
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={type}
                        fullWidth
                        onChange={handleChange}
                        label="Select"
                      >
                        <MenuItem value={"Customer"}>Customer</MenuItem>
                        <MenuItem value={"Resturant"}>Resturant</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      disabled={type === ""}
                      onClick={() => submit()}
                      color="primary"
                      size="lg"
                    >
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errorType ? "success" : "error"}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
