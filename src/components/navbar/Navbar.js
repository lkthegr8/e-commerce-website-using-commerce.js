import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

function Navbar({ totalItems }) {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className="classes.appBar" color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
          >
            <img
              src="https://image.shutterstock.com/image-vector/lk-logo-600w-672858562.jpg"
              alt="commerce"
              height="25px"
              className={classes.image}
            />
            LkTheGr8
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
