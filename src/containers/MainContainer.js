import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const BASE_URL = 'http://localhost:3000/stocks/'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolioStocks: [],
    filter: '',
    sortMethod: ''
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(stocks => this.setState({ stocks: stocks }))
  }

  updatePortfolio = id => {
    if (this.state.portfolioStocks.find(stock => stock.id === id)) {
      this.removeStockFromPortfolio(id);
    } else {
      this.addStockToPortfolio(id);
    }
  }

  addStockToPortfolio = id => {
    let stockToAdd = this.state.stocks.find(stock => stock.id === id)
    this.setState({ portfolioStocks: [...this.state.portfolioStocks, stockToAdd] })
  }

  removeStockFromPortfolio = id => {
    let index = this.state.portfolioStocks.findIndex(stock => stock.id === id)
    let newStocks = this.state.portfolioStocks;
    newStocks.splice(index, 1);
    this.setState({ portfolioStocks: newStocks })
  }

  getStocks = () => {
    let stocks = this.filteredStocks();
    return this.sortStocks(stocks);
  }

  filteredStocks = () => {
    const stocks = this.state.stocks;

    switch (this.state.filter) {
      case ('Tech'):
        return stocks.filter(stock => stock.type === 'Tech');
      case ('Sportswear'):
        return stocks.filter(stock => stock.type === 'Sportswear');
      case ('Finance'):
        return stocks.filter(stock => stock.type === 'Finance');
      default:
        return stocks
    }
  }

  setFilter = e => {
    this.setState({ filter: e.target.value });
  }

  updateSortMethod = e => {
    this.setState({ sortMethod: e.target.value });
  }

  sortStocks = stocks => {
    switch (this.state.sortMethod) {
      case 'Alphabetically':
        return this.sortStocksAlphabetically(stocks);
      case 'Price':
        return this.sortStocksByPrice(stocks);
      default:
        return stocks;
    }
  }

  sortStocksAlphabetically = stocks => {
    return stocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
  }

  sortStocksByPrice = stocks => {
    return stocks.sort((a, b) => a.price - b.price);
  }

  render() {
    return (
      <div>
        <SearchBar setFilter={this.setFilter} updateSortMethod={this.updateSortMethod} sortMethod={this.state.sortMethod} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.getStocks()} updatePortfolio={this.updatePortfolio} />

          </div>
          <div className="col-4">

            <PortfolioContainer stocks={this.state.portfolioStocks} updatePortfolio={this.updatePortfolio} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
