import React from 'react';

const SearchBar = (props) => {

  const toggleSort = (e, props) => {
    e.target.checked = !e.target.checked
    props.setSortMethod(e.target.value)
  }

  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="None" checked={props.sort === "None" ? true : false} onChange={(e) => props.setSortMethod(e.target.value)}/>
        None
      </label>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sort === "Alphabetically" ? true : false} onChange={(e) => props.setSortMethod(e.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sort === "Price" ? true : false} onChange={(e) => props.setSortMethod(e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={ (e) => props.setFilterState(e.target.value)}>
          <option value="None">None</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
