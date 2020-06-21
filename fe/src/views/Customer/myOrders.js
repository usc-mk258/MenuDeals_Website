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
import { CUSTOMER_ORDERS_URL, CUSTOMER_ORDER_RECEVIED_URL } from "Apis";
import axios from "axios";
import jwt from "jwt-decode";
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
  "Dec",
];
const rows = [
  createData(1, 101, "Frozen yoghurt", "John", "03-04-2020", "New"),
  createData(2, 102, "Ice cream sandwich", "Berlin", "03-04-2020", "Pendig"),
  createData(3, 103, "Eclair", "Tokyo", "03-04-2020", "Rejected"),
  createData(4, 104, "Cupcake", "Professor", "03-04-2020", "New"),
  createData(5, 105, "Gingerbread", "Denver", "03-04-2020", "Pending"),
];

export default function Deals(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [open, setOpen] = React.useState(false);
  const [orders, setOrder] = React.useState([]);
  const [ordersItem, setOrderItem] = React.useState({});

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleClickOpen = (orderItem) => {
    if (orderItem.status === "ACCEPTED") {
      setOpen(true);
      setOrderItem(orderItem);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getAllCustomerOrders();
  }, []);
  const handleRecivedOrder = () => {
    axios
      .get(`${CUSTOMER_ORDER_RECEVIED_URL}/${ordersItem.id}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token,
        },
      })
      .then((res) => {
        console.log(res);
        getAllCustomerOrders();
        handleClose();
      });
  };
  const getAllCustomerOrders = () => {
    axios
      .get(CUSTOMER_ORDERS_URL, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userData")).data.data.token,
        },
      })
      .then((res) => {
        console.log(res);
        setOrder(res.data.data.orders);
        // setDeals(res.data.data.restaurants[0])
      });
  };
  return (
    <div>
      {/* dialog start */}
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Order Info
        </DialogTitle>
        <DialogContent style={{ width: "700px" }} dividers>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "16px" }}>Status: </p>
            <p style={{ fontWeight: "bold" }}>{ordersItem.status}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: "9px",
            }}
          >
            <Button
              className={classes.registerNavLink}
              onClick={() => handleRecivedOrder()}
              color="rose"
              round
            >
              Mark Delivered
            </Button>
            <Button
              className={classes.registerNavLink}
              onClick={handleClose}
              color="red"
              style={{ backgroundColor: "red" }}
              round
            >
              Go back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* dialog end */}
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
                        <TableCell>ETA</TableCell>
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
                          <TableCell>
                            {row.status === "ACCEPTED" ? row.eta : "-"}
                          </TableCell>
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
