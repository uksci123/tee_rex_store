import { Box, Stack, Typography, TextField, Divider } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Header from "./Header";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css"

/**
 * Cart component represents the shopping cart page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object[]} props.cartItems - An array of cart items.
 * @param {Object} props.itemQty - An object mapping cart item IDs to their quantities.
 * @param {function} props.handleIncrement - A function to handle item quantity increment.
 * @param {function} props.handleDecrement - A function to handle item quantity decrement.
 * @param {function} props.handleDelete - A function to handle item deletion from the cart.
 * @param {number} props.cartQuantity - The total quantity of items in the cart.
 * @param {number} props.totalAmount - The total amount of the items in the cart.
 *
 * @returns {JSX.Element} - The rendered shopping cart page component.
 */
const Cart = (props) => {
  let { 
      cartItems ,
      itemQty , 
      handleIncrement ,
      handleDecrement ,
      handleDelete ,
      cartQuantity, 
      totalAmount
    } = props 
  let isCartEmpty = true ; 

  if (!cartItems.length) {
      isCartEmpty = false ;
  }

  return (
    <Box className='cart'>
    {/* Header Component */}
    <Header cartQuantity={cartQuantity} />
      <Box sx={{ m: 3, p: 2 }}>
        <Typography variant="h6">
          Shopping Cart
        </Typography>
        {isCartEmpty ?
          cartItems.map((cart)=>{
          return(
            <Stack key={cart.id} sx={{maxWidth:"50rem" , pt:5 }}>
              <Card className="cartItem" sx={{ display: 'flex' ,  justifyContent:"space-between" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 65 }}
                      image={cart.imageURL}
                      alt="Product Image"
                    />
                  </Box>
                  <CardContent sx={{ flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography component="div" variant="subtitle1">
                      {cart.name}
                    </Typography>
                    <Typography component="div" variant="subtitle1" >
                      Rs {cart.price}
                    </Typography>
                  </CardContent>
                </Box>
                <Box className="cartButton">
                  <TextField
                    variant="outlined"
                    value={" Qty "+ itemQty[cart.id]}
                    sx={{width: 180 , pt:2 , mx:1}}
                    InputProps={{
                      endAdornment: (
                        <>
                          <IconButton onClick={()=>{handleIncrement(cart)}}>
                            <ArrowUpwardIcon />
                          </IconButton>
                          <IconButton onClick={()=>{handleDecrement(cart)}}>
                            <ArrowDownwardIcon />
                          </IconButton>
                        </>
                      ),
                    }}
                  />
                  <TextField 
                      type="Button"
                      value="Delete"
                      sx={{width: 180 , pt:2 , mx:1}}
                      InputProps={{
                        endAdornment:(
                          <IconButton onClick={()=>{handleDelete(cart)}}>
                            <DeleteIcon/>
                          </IconButton>
                        )
                      }}
                  />
                </Box>
              </Card>
            </Stack>
          )})    
          :(
           <></>
          )
        }
        <Divider sx={{maxWidth:"50rem" ,marginTop:"2rem"}}/>
        <Box sx={{display:"fles" , justifyContent:"center" , alignItems:"center" , marginTop:"1rem" , maxWidth:"50rem"}}>
          <Typography variant="h5" component="div">
            Total Amount : {totalAmount}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart;
