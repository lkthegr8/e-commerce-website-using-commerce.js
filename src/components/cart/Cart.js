import React from "react";
import { Container, Typography, Button, Grid, Card } from "@material-ui/core";
import useStyles from "./styles";
import CardItem from "./CartItem/CardItem";
import { Link } from "react-router-dom";

function Cart({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  const classes = useStyles();

  const EmptyCard = () => (
    <Typography variant="subtitle1">
      you have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCard = () => (
    <div>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CardItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal:{cart.subtotal.formatted_with_symbol}
        </Typography>
        <div className="">
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton0}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
  if (!cart.line_items) {
    return (
      <>
        <div className={classes.toolbar} />
        "loading..."
      </>
    );
  }
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCard /> : <FilledCard />}
    </Container>
  );
}

export default Cart;
