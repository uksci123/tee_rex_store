import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

/**
 * Header component represents the top navigation bar.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.cartQuantity - The quantity of items in the cart to be displayed.
 *
 * @returns {JSX.Element} - The rendered header component.
 */
const Header = ({ cartQuantity }) => {
    return (
        <>
            <AppBar component='nav'>
                <Toolbar>
                    {/* Site Title */}
                    <Typography variant="h6" component="div">
                        TeeRex Store
                    </Typography>
                    <div style={{ flexGrow: 1 }} /> {/* This will push the next items to the right */}
                    
                    {/* Link to Products Page */}
                    <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
                        <IconButton color="inherit">
                            <Typography variant="h6" component="div">
                                Product
                            </Typography>
                        </IconButton>
                    </Link>

                    {/* Link to Cart Page */}
                    <Link to='/cart' style={{ textDecoration: "none", color: "inherit" }}>
                        <IconButton color="inherit">
                            {/* Shopping Cart Icon */}
                            <ShoppingCartIcon />
                            {/* Cart Quantity Display */}
                            <Typography variant="subtitle2" component="span" marginBottom='1rem'>
                                {cartQuantity}
                            </Typography>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
