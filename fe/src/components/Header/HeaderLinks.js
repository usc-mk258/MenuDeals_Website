/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <>
    {props.landing ?
   
      <List className={classes.list}>
        <Link to="/Login" style={{ color: "white" }}>
          <ListItem className={classes.listItem}>
          <Button
                    className={classes.registerNavLink}
                    color="rose"
                    round
                  >
                    Login
                  </Button>
          </ListItem>
        </Link>
      </List>

      :
      <List className={classes.list}>

        <Link to={props.customerOrderLink ? props.customerOrderLink : "/Resturant/orders"} style={{ color: "white" }}>
          <ListItem className={classes.listItem}>
            <Button
              // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              {props.customerOrder ? props.customerOrder : "Orders"}
            </Button>
          </ListItem>
        </Link>
        <Link to={props.customerDashboardLink ? props.customerDashboardLink : "/Resturant/deals"} style={{ color: "white" }}>
          <ListItem className={classes.listItem}>
            <Button
              // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              {props.dashboard ? props.dashboard : 'Deals'}
            </Button>
          </ListItem>
        </Link>
        {
          props.resturant?
          <Link to={"/Resturant/edit-info"} style={{ color: "white" }}>
          <ListItem className={classes.listItem}>
            <Button
              // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              { 'Profile'}
            </Button>
          </ListItem>
        </Link>
        :""
        }
       
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
    </>
  );
}
