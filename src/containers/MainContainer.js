import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    clickedStockIds: [],
    sortMethod: '',
    filter: ''
  }

  sortStocks = () => {
    let stocks = [...this.filterStocks()]
    switch (this.state.sortMethod) {
      case 'Alphabetically':
        return stocks.sort((stockA, stockB) => stockA.name.localeCompare(stockB.name))
      case 'Price':
        return stocks.sort((stockA, stockB) => stockA.price - stockB.price)
      default:
        return stocks
    }
  }

  setSortMethod = (method) => {
    return this.setState({sortMethod: method})
  }

  filterStocks = () => {
    let stocks = [...this.state.stocks]
    switch (this.state.filter) {
      case 'Tech':
        return stocks.filter(stock => stock.type === 'Tech')
      case 'Sportswear':
        return stocks.filter(stock => stock.type === 'Sportswear')
      case 'Finance':
        return stocks.filter(stock => stock.type === 'Finance')
      default:
        return this.state.stocks
    }
  }

  setFilterState = (filterCriteria) => {
    this.setState({filter: filterCriteria})
  }

  componentDidMount() {
    return fetch('http://localhost:3000/stocks/')
    .then(res => res.json())
    .then(stocks => this.setState({ stocks: stocks }))
  } 

  clickStock = (stockId) => {
    let clicked = [...this.state.clickedStockIds]
    if (clicked.includes(stockId)) {
      clicked = clicked.filter(id => id !== stockId)
      this.setState({clickedStockIds: clicked})
    } else {
      clicked.push(stockId)
      this.setState({clickedStockIds: clicked})
    }
  }

  selectedStocks = stocks => stocks.filter(stock => this.state.clickedStockIds.includes(stock.id))

  render() {
    return (
      <div>
        <SearchBar 
          setFilterState={this.setFilterState}
          setSortMethod={this.setSortMethod}
          sort={ this.state.sortMethod }
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                stocks={this.sortStocks()}
                clickStock={this.clickStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
                stocks={this.selectedStocks(this.state.stocks)}
                clickStock={this.clickStock}
              /> 
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
