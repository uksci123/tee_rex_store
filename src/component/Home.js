import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from './Header'; // Import your header component here
import Filter from './Filter'; // Import your filter component here
import Search from './Search'; // Import your search component here
import Product from './Product'; // Import your product component here
import "./Home.css"
import { Dialog, DialogContent, Stack } from '@mui/material';

/**
 * Home component represents the main content of the home page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.cartQuantity - The quantity of items in the cart.
 * @param {string} props.filterQuery - The filter query.
 * @param {function} props.handleFilterMobile - A function to handle filter actions on mobile.
 * @param {Object} props.filterCheckbox - An object representing filter checkboxes.
 * @param {function} props.handleFilterChange - A function to handle filter checkbox changes.
 * @param {function} props.handleSearch - A function to handle search actions.
 * @param {Object[]} props.filteredProducts - An array of filtered product objects.
 * @param {function} props.addToCart - A function to add a product to the cart.
 *
 * @returns {JSX.Element} - The rendered home page component.
 */
const Home = (props)=> {
  const{
    cartQuantity,
    filterQuery,
    handleFilterMobile,
    filterCheckbox,
    handleFilterChange,
    handleSearch,
    filteredProducts,
    addToCart
  } = props

  return (
    <Box className='home'>
      {/* Header Component */}
      <Header cartQuantity={cartQuantity}/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} >
          {/* Filter Component */}
           {
            filterQuery ? 
              <Dialog open = {filterQuery} onClose={handleFilterMobile} sx={{maxHeight:'100vh'}}>
                <DialogContent className='custom-dialog-content' >
                  <Stack className='filterDialog'  justifyContent="center" alignItems="center">
                    <Filter filterCheckbox={filterCheckbox}  onFilterCheckBox={handleFilterChange}/>
                  </Stack>
                </DialogContent>
              </Dialog>
              :
              <Box className="filter">
                <Filter filterCheckbox={filterCheckbox} onFilterCheckBox={handleFilterChange} />
              </Box> 
           } 
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Search Component */}
          <Box className="search">
            <Search onSearch={handleSearch} onFilter={handleFilterMobile} onfilterQuery={filterQuery}/>
          </Box>
          {/* Product Component */}
           <Box className="product">
              <Product products={filteredProducts} addToCart={addToCart} />
           </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
