import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
// the material ui classes custom made
import useStyles from "./styles";

function Product({ product, onAddToCart }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_code}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions
        disableSpacing
        className="classes.cardActions"
        onClick={() => onAddToCart(product.id, 1)}
      >
        <IconButton aria-label="Add to cart">
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
