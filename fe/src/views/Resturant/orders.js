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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/Signup.jpg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import {
  RESTURANT_GET_ALL_ORDERS,
  RESTURANT_ORDER_DELIVER,
  RESTURANT_ORDER_REJECT
} from "Apis";
import axios from "axios";
const useStyles = makeStyles(styles);
function createData(sNo, orderNumber, Product, orderBy, date, Status) {
  return { sNo, orderNumber, Product, orderBy, date, Status };
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const rows = [
  createData(1, 101, "Frozen yoghurt", "John", "03-04-2020", "New"),
  createData(2, 102, "Ice cream sandwich", "Berlin", "03-04-2020", "Pendig"),
  createData(3, 103, "Eclair", "Tokyo", "03-04-2020", "Rejected"),
  createData(4, 104, "Cupcake", "Professor", "03-04-2020", "New"),
  createData(5, 105, "Gingerbread", "Denver", "03-04-2020", "Pending")
];

export default function Deals(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [etaOpen, setEtaOpen] = React.useState(false);
  const [orders, setOrder] = React.useState([]);
  const [orderItem, setOrderItem] = React.useState([]);
  const [etaValue, setEtaValue] = React.useState(0);

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleClickOpen = orderItem => {
    if (orderItem.status === "PENDING") {
      setConfirmationOpen(true);
      setOrderItem(orderItem);
    }
  };
  const handleClose = () => {
    setConfirmationOpen(false);
    setEtaOpen(false);
  };
  useEffect(() => {
    getAllOrdersCall();
  }, []);
  const getAllOrdersCall = () => {
    axios
      .get(RESTURANT_GET_ALL_ORDERS, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token
        }
      })
      .then(res => {
        setOrder(res.data.data);
        // setDeals(res.data.data.restaurants[0])
      });
  };

  const acceptOrder = () => {
    debugger;
    axios
      .get(
        `${RESTURANT_ORDER_REJECT}/${orderItem.id}/${true}?eta=${etaValue}`,
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
        getAllOrdersCall();
        handleClose();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleOrderReject = () => {
    axios
      .get(`${RESTURANT_ORDER_REJECT}/${orderItem.id}/${false}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token
        }
      })
      .then(res => {
        console.log(res);
        getAllOrdersCall();
        handleClose();
      })
      .catch(error => {
        console.log(error);
      });
  };
  console.log(orderItem);

  const etcDialog = () => {
    return (
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={etaOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Enter Estimated Time (in hour)
        </DialogTitle>
        <DialogContent style={{ width: "700px" }} dividers>
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-multiline-static"
              label="Enter ETA"
              fullWidth
              variant="outlined"
              value={etaValue}
              onChange={e => setEtaValue(e.target.value)}
            />
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
              onClick={() => acceptOrder()}
              color="rose"
              round
            >
              Accept
            </Button>
            <Button
              className={classes.registerNavLink}
              onClick={() => handleOrderReject()}
              color="red"
              style={{ backgroundColor: "red" }}
              round
            >
              Reject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      {/* dialog start */}
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={confirmationOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Order Info
        </DialogTitle>
        <DialogContent style={{ width: "700px" }} dividers>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "16px" }}>Status: </p>
            <p style={{ fontWeight: "bold" }}>{orderItem.status}</p>
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
              onClick={() => setEtaOpen(true)}
              color="rose"
              round
            >
              Accept
            </Button>
            <Button
              className={classes.registerNavLink}
              onClick={() => handleOrderReject()}
              color="red"
              style={{ backgroundColor: "red" }}
              round
            >
              Reject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* dialog end */}

      {etcDialog()}
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
          backgroundPosition: "top center"
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
                  Our Orders
                </h2>
              </Card>
              <Card
                style={{ backgroundColor: "transparent" }}
                className={classes[cardAnimaton]}
              >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>S.no</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((row, index) => (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickOpen(row)}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{`${new Date(
                            row.updatedAt.substring(0, 19)
                          ).getDate()}-${
                            months[new Date(row.updatedAt).getMonth()]
                          }-${new Date(
                            row.updatedAt
                          ).getFullYear()}`}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}
