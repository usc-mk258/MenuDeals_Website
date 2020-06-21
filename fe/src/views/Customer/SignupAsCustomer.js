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
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { CUSTOMER_SIGNUP_URL } from "Apis"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorType, setErrorType] = React.useState();

  const handleClick = (message, errorType) => {
    setOpen(true);
    setErrorMessage(message)
    setErrorType(errorType)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeName = (event=>{
    setName(event.target.value)
  })
  const submit = () => {
    axios({
      method: 'post',
      url: CUSTOMER_SIGNUP_URL,
      headers: {},
      data: {
        "email": email,
        "password": password,
        "name":name
      }
    }).then((res) => {
      localStorage.setItem('Customer', JSON.stringify(res));
      handleClick("signup Successfull", res.data.success)
      props.history.push("/Login")
    }).catch((error) => {
      handleClick(error.response.data.message, error.response.data.success)
      console.log(error.response.data);
    });
  }
  return (
    <>
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
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Signup As Customer</h4>
                </CardHeader>
                <form className={classes.form}>
                  <CardBody>

                    {/* <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                                            <Input id="component-simple" value={name} onChange={handleChangeEmail} />
                                            <InputLabel htmlFor="component-simple">Password</InputLabel>
                                            <Input id="component-simple" type="password" value={password} onChange={handleChangePassword} />
                                        </FormControl> */}

                    <TextField
                      fullWidth
                      style={{ marginBottom: "20px" }}
                      id="outlined-read-only-input"
                      label="Name"
                      value={name}
                      onChange={handleChangeName}
                      InputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              user_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                      variant="outlined"
                    />
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
                        autoComplete: "off"
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
                        autoComplete: "off"
                      }}
                      variant="outlined"
                    />
                    {/* <CustomInput
                                            labelText="Enter Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                            </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        /> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple onClick={() => submit()} color="primary" size="lg">
                      Signup
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errorType ? "success" : "error"}>
          {errorMessage}
        </Alert>
      </Snackbar>
   </>
  );
}
