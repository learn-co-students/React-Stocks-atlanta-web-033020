import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {
  mapStocks = stocks => {
    return stocks.map(stock => {
      return (
        <Stock
          key={stock.id}
          id={stock.id}
          ticker={stock.ticker}
          name={stock.name}
          type={stock.type}
          price={stock.price}
          updatePortfolio={this.props.updatePortfolio}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.mapStocks(this.props.stocks)}
      </div>
    );
  }

}

export default PortfolioContainer;
