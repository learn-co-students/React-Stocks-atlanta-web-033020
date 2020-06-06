import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  mapStocks = (stocks) => {
    return (
    stocks.map(stock => <Stock 
        key={stock.id}
        id={stock.id}
        ticker={stock.ticker}
        name={stock.name}
        price={stock.price}
      />)
    )
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.mapStocks(this.props.stocks)}
      </div>
    )
  }

}

export default StockContainer;
