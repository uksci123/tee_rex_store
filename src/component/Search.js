import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { FilterAlt } from '@mui/icons-material';
import './Search.css'
import { InputAdornment } from '@mui/material';

/**
 * Search component represents the search input field with optional filter button.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.onSearch - A callback function to handle search actions.
 * @param {function} props.onFilter - A callback function to handle filter actions.
 * @param {boolean} props.onfilterQuery - The current filter query state.
 *
 * @returns {JSX.Element} - The rendered search input component.
 */
const Search = ({ onSearch , onFilter , onfilterQuery}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery , setFilterQuery] = useState(onfilterQuery)

  useEffect(()=>{
    setFilterQuery(onfilterQuery)
  },[onfilterQuery])

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Call the onSearch callback with the search query
    onSearch(searchQuery);
  };

  const handleFilter = () => {
    // Call the onSearch callback with the search query
    setFilterQuery(!filterQuery)
    onFilter(filterQuery);
  };
  
  return (
    <div>
      {/* Search on Larger Screen */}
      <TextField
        placeholder="Search For Products..."
        value={searchQuery}
        className='search-desktop'
        onChange={handleInputChange}
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch} color="primary">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      {/* Search on Smaller Screen */}
      <TextField
        placeholder="Search For Products..."
        value={searchQuery}
        className='search-mobile'
        onChange={handleInputChange}
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSearch} color="primary">
                <SearchIcon />
              </IconButton>
              {/* Filter Button */}
              <IconButton onClick={handleFilter} color="primary">
                <FilterAlt />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
