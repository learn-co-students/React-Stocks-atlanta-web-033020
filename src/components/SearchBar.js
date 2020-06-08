import React from 'react';

const SearchBar = props => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortMethod === 'Alphabetically'} onChange={props.updateSortMethod} />
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sortMethod === 'Price'} onChange={props.updateSortMethod} />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={props.setFilter}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
