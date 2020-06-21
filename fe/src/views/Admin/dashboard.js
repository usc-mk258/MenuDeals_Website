import React, { useEffect, useState } from "react";
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ALL_RESTURANTS_URL, RESTURANT_APPROVE } from "Apis"
var localData = JSON.parse(localStorage.getItem('userData'));

const useStyles = makeStyles(styles);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function createData(sNo, orderNumber, Product, orderBy, date, Status) {
    return { sNo, orderNumber, Product, orderBy, date, Status };
}
const rows = [
    createData(1, 101, 'Frozen yoghurt', "John", "03-04-2020", "New"),
    createData(2, 102, 'Ice cream sandwich', "Berlin", "03-04-2020", "Pendig"),
    createData(3, 103, 'Eclair', "Tokyo", "03-04-2020", "Rejected"),
    createData(4, 104, 'Cupcake', "Professor", "03-04-2020", "New"),
    createData(5, 105, 'Gingerbread', "Denver", "03-04-2020", "Pending"),
];

export default function Dashboard(props) {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [open, setOpen] = useState(false);
    const [allResturants, setAllresturants] = useState([]);
    useEffect(() => {
        getAllResturantCall()
        
    },[]);
    const getAllResturantCall = ()=>{
        axios.get(ALL_RESTURANTS_URL, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).data.data.token
            }
        }).then((res) => {
            setAllresturants(res.data.data.restaurants[0])
        })
    }
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleApproved = (resturantId) => {
        console.log(resturantId)
        axios.get(`${RESTURANT_APPROVE}/${resturantId}/${true}`, {

            headers: {
                Authorization: 'Bearer ' +JSON.parse(localStorage.getItem('userData')).data.data.token
            }
        }).then((res) => {
            getAllResturantCall()
            console.log(res)
        })
    }
    return (
        <div>

            {/* dialog start */}
            <Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Order Info
        </DialogTitle>
                <DialogContent style={{ width: "700px" }} dividers>
                    <h2>Orders # 101</h2>
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "16px" }}>Customer Name:    </p>
                        <p style={{ fontWeight: "bold" }}>Johon</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "16px" }}>Price: </p>
                        <p style={{ fontWeight: "bold" }}>$100</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "16px" }}>Address: </p>
                        <p style={{ fontWeight: "bold" }}>House 36/7 DHA Lahore </p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "16px" }}>Status: </p>
                        <p style={{ fontWeight: "bold" }}>New</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", paddingBottom: "9px" }}>
                        <Button
                            className={classes.registerNavLink}
                            onClick={handleClose}
                            color="rose"
                            round
                        >
                            Accept
                  </Button>
                        <Button
                            className={classes.registerNavLink}
                            onClick={handleClose}
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
            <Header
                absolute
                color="transparent"
                brand="Foodie"
                rightLinks={
                    <List className={classes.list}>

                        <Link to="/" style={{ color: "white" }}>
                            <ListItem className={classes.listItem}>
                                <Button
                                    // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
                                    color="transparent"
                                    target="_blank"
                                    className={classes.navLink}
                                    onClick={() => { localStorage.clear(); }}
                                >
                                    Logout
                  </Button>
                            </ListItem>
                        </Link>
                    </List>
                }
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
                            <Card style={{ backgroundColor: "transparent", }} className={classes[cardAnimaton]}>
                                <h2 style={{ color: "white", textAlign: "center" }}>All Resturants</h2>
                            </Card>
                            <Card style={{ backgroundColor: "transparent", }} className={classes[cardAnimaton]}>

                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell>S.no</TableCell>
                                                <TableCell >Resturant Name</TableCell>
                                                <TableCell >Email</TableCell>
                                                <TableCell >password</TableCell>
                                                <TableCell >Date</TableCell>
                                                <TableCell >Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allResturants.map((items,index) => (
                                                <TableRow >
                                                    <TableCell component="th" scope="row">
                                                        {index+1}
                                                    </TableCell>
                                                    <TableCell >{items.name}</TableCell>
                                                    <TableCell >{items.email}</TableCell>
                                                    <TableCell >{items.password}</TableCell>
                                                    <TableCell >{`${new Date(items.updatedAt.substring(0, 19)).getDate()}-${months[new Date(items.updatedAt).getMonth()]}-${new Date(items.updatedAt).getFullYear()}`}</TableCell>
                                                    <TableCell >
                                                        {items.status ?
                                                            <Button
                                                                className={classes.registerNavLink}
                                                                // onClick={() => props.history.push('/Customer/signup')}
                                                                color=""
                                                                round
                                                                disabled
                                                            >
                                                                Approved
</Button> :
                                                            <Button
                                                                className={classes.registerNavLink}
                                                                onClick={() => handleApproved(items.id)}
                                                                color="rose"

                                                                round
                                                            >
                                                                Approve
</Button>
                                                        }


                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {/* {rows.map((row) => (
                                                <TableRow style={{cursor:"pointer"}} onClick={handleClickOpen} key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.sNo}
                                                    </TableCell>
                                                    <TableCell >{row.orderNumber}</TableCell>
                                                    <TableCell >{row.Product}</TableCell>
                                                    <TableCell >{row.orderBy}</TableCell>
                                                    <TableCell >{row.date}</TableCell>
                                                    <TableCell >{row.Status}</TableCell>
                                                </TableRow>
                                            ))} */}
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
