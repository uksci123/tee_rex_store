import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home'; // Import your Home component here
import Cart from "./component/Cart" // Import your Cart component here
import { useEffect, useState } from 'react';

/**
 * The main App component that handles routing and manages the application's state.
 *
 * @returns {JSX.Element} - The rendered application component.
 */
const App = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemQty, setItemQty] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [filterCheckbox, setFilterCheckbox] = useState({
    color: {
      Red: false,
      Blue: false,
      Green: false,
      Purple: false,
    },
    gender: {
      Men: false,
      Women: false,
    },
    price: {
      range1: false,
      range2: false,
      range3: false,
    },
    type: {
      Polo: false,
      Hoodie : false,
      Basic : false,
    },
  });

  /**
   * Function to handle changes in filter checkboxes.
   *
   * @param {string} category - The category of the filter (e.g., color, gender).
   * @param {string} filterName - The name of the filter option.
   */
  const handleFilterChange = (category, filterName) => {
    const updatedFilters = { ...filterCheckbox };
    updatedFilters[category][filterName] = !updatedFilters[category][filterName];
    setFilterCheckbox(updatedFilters);
    handleFilter(filterCheckbox);
  };

  // Fetch product data when the component mounts
  useEffect(() => {
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  /**
   * Function to handle the search functionality.
   *
   * @param {string} query - The search query entered by the user.
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Perform search logic based on query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.color.toLowerCase().includes(query.toLowerCase()) ||
      product.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  
  /**
   * Function to handle filter logic.
   *
   * @param {object} filters - The filter options selected by the user.
   */
  const handleFilter = (filters) => {
   const {color , price , gender , type } = filters ; 
   
   // Extract selected filter options
   const filterColor = Object.keys(color).filter(key => color[key] === true);
   const filterType = Object.keys(type).filter(key=>type[key]=== true)
   const filterGender = Object.keys(gender).filter(key=>gender[key]===true);
   const filterPrice = Object.keys(price).filter(key=>price[key]===true);

   // Define price range filters
   const filterRanges = [
   { range1 : { min: 0, max: 250 }},
   { range2 : { min: 250, max: 450 }},
   { range3 : { min: 450, max: Infinity }}
   ]
  
   // Apply filters to products
   const filteredByFilters = products.filter((product)=> {
    const colorMatch = filterColor.length === 0 || filterColor.includes(product.color);
    const filterMatch = filterType.length === 0 || filterType.includes(product.type); 
    const genderMatch = filterGender.length === 0 || filterGender.includes(product.gender); 
    const priceMatch = filterPrice.length === 0 ||   
    filterPrice.some(allowedRangeName => {
      const range = filterRanges.find(item => item[allowedRangeName]);
      if (range) {
        const { min, max } = range[allowedRangeName];
        return product.price > min && product.price <= max;
      }
      return false;
    });
    return colorMatch && filterMatch && genderMatch && priceMatch; 
   });
    setFilteredProducts(filteredByFilters);
  };

  /**
   * Function to toggle the mobile filter dialog.
   *
   * @param {boolean} filter - The current state of the filter dialog.
   */
  const handleFilterMobile = (filter) =>{
    setFilterQuery(!filter);
  }
  
  useEffect(()=>{
    // Load cart data from local storage on component mount
    const saveCartItems = localStorage.getItem('cartItems')
    const saveItemQty = localStorage.getItem('itemQty')
    const saveCartQuantity = localStorage.getItem('cartQuantity')

    if(saveCartItems && saveCartItems.length > 2 ){
      const parsedData = JSON.parse(saveCartItems)
      setCartQuantity(saveCartQuantity)
      setCartItems(parsedData);
    }
    if(saveItemQty && saveItemQty.length > 2){
      const parsedData = JSON.parse(saveItemQty)
      setItemQty(parsedData)
    }
  },[])

  useEffect(()=>{
    // Save cart data to local storage when cart items change
    getTotal()
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    localStorage.setItem('itemQty', JSON.stringify(itemQty))
    localStorage.setItem('cartQuantity', Number(cartQuantity))
  },[cartItems , itemQty, cartQuantity])

  /**
   * Function to calculate the total amount in the cart.
   */
  const getTotal = () => {
     let totalPrice = 0 ; 
     cartItems.forEach((cart)=>{
        let price = cart.price * itemQty[cart.id]
        totalPrice+=price ; 
     })
     setTotalAmount(totalPrice)
  }

  /**
   * Function to add a product to the cart.
   *
   * @param {object} product - The product to be added to the cart.
   */
  const addToCart = (product) => {
    const isDuplicate = cartItems.find((item)=>item.id === product.id);
    if(!isDuplicate){
      setCartQuantity(cartQuantity+1)
      setCartItems([...cartItems, product]);
      setItemQty({...itemQty, 
        [product.id] : 0 ,
      })
    }
  };

  /**
   * Function to increment the quantity of an item in the cart.
   *
   * @param {object} item - The item to be incremented.
   */
  const handleIncrement = (item)=>{
    if(itemQty[item.id] + 1 <= item.quantity){
      setItemQty({...itemQty,
        [item.id]:itemQty[item.id]+1,
      })
    }
  }

  /**
   * Function to decrement the quantity of an item in the cart.
   *
   * @param {object} item - The item to be decremented.
   */
  const handleDecrement = (item)=>{
    if(itemQty[item.id]-1>=0){
      setItemQty({...itemQty,
        [item.id]:itemQty[item.id]-1,
      })
    }
  }

  /**
   * Function to delete an item from the cart.
   *
   * @param {object} item - The item to be deleted from the cart.
   */
  const handleDelete = (item)=>{
    const updatedCart = cartItems.filter((cart)=>cart.id!==item.id);
    const updatedQty = {...itemQty}
    delete updatedQty[item.id]
    setItemQty(updatedQty)
    setCartItems(updatedCart)
    setCartQuantity(cartQuantity-1)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <Home
            cartQuantity={cartQuantity}
            filterQuery={filterQuery}
            handleFilterMobile={handleFilterMobile}
            filterCheckbox={filterCheckbox}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />}
        />
        <Route path="/cart" element={
          <Cart
            cartQuantity={cartQuantity}
            cartItems={cartItems}
            itemQty={itemQty}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleDelete={handleDelete}
            totalAmount={totalAmount}
          />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
