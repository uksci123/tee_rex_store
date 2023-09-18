import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * FilterComponent is a reusable component that displays filter options.
 *
 * @param {object} filterCheckbox - The filter options state.
 * @param {function} onFilterCheckBox - Callback function to handle filter checkbox changes.
 */
function FilterComponent({ filterCheckbox, onFilterCheckBox }) {
  return (
    <Box>
      <FormControl component="fieldset">
        <FormGroup>
          <h4>Color</h4>
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.color.Red} onChange={() => onFilterCheckBox('color', 'Red')} />}
            label="Red"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.color.Blue} onChange={() => onFilterCheckBox('color', 'Blue')} />}
            label="Blue"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.color.Green} onChange={() => onFilterCheckBox('color', 'Green')} />}
            label="Green"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.color.Purple} onChange={() => onFilterCheckBox('color', 'Purple')} />}
            label="Purple"
          />
        </FormGroup>

        <FormGroup>
          <h4>Gender</h4>
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.gender.Men} onChange={() => onFilterCheckBox('gender', 'Men')} />}
            label="Men"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.gender.Women} onChange={() => onFilterCheckBox('gender', 'Women')} />}
            label="Women"
          />
        </FormGroup>

        <FormGroup>
          <h4>Price Range</h4>
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.price.range1} onChange={() => onFilterCheckBox('price', 'range1')} />}
            label="0 - Rs250"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.price.range2} onChange={() => onFilterCheckBox('price', 'range2')} />}
            label="Rs250 - Rs450"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.price.range3} onChange={() => onFilterCheckBox('price', 'range3')} />}
            label="Rs450+"
          />
        </FormGroup>

        <FormGroup>
          <h4>Type</h4>
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.type.Polo} onChange={() => onFilterCheckBox('type', 'Polo')} />}
            label="Polo"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.type.Hoodies} onChange={() => onFilterCheckBox('type', 'Hoodie')} />}
            label="Hoodie"
          />
          <FormControlLabel
            control={<Checkbox checked={filterCheckbox.type.Basic} onChange={() => onFilterCheckBox('type', 'Basic')} />}
            label="Basic"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default FilterComponent;
