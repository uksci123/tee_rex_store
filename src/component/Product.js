import React from 'react';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

/**
 * Product component displays a grid of product cards.
 *
 * @param {Object[]} products - An array of product objects.
 * @param {string|number} products[].id - A unique identifier for the product.
 * @param {string} products[].name - The name or title of the product.
 * @param {string} products[].imageURL - The URL of the product's image.
 * @param {number} products[].price - The price of the product.
 *
 * @param {function} addToCart - A callback function to add a product to the shopping cart.
 *
 * @returns {JSX.Element} - A component that renders product cards with details.
 */
function Product({ products, addToCart }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4} xl={4}>
            {/* Product Card */}
            <Card>
              {/* Product Name */}
              <Typography variant="h6" paddingLeft={2}>
                {product.name}
              </Typography>

              {/* Product Image */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  height: '10rem',
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.imageURL}
                  image={product.imageURL}
                  sx={{ maxWidth: '11rem' }}
                />
              </Box>

              {/* Card Actions */}
              <CardActions>
                {/* Product Price */}
                <Typography variant="h6">Rs {product.price}</Typography>

                {/* Flexible Space */}
                <Box sx={{ flexGrow: 1 }}></Box>

                {/* Add to Cart Button */}
                <Button
                  size="large"
                  color="primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Product;
