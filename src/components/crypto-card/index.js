import React from 'react';
import './styles.css';

class CryptoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      symbol: props.symbol,
      price: null,
      lastPrice: null,
    }
    this.pollPrice = this.pollPrice.bind(this);
    this.handle = 0;
  }

  componentDidMount() {
    this.pollPrice();    
    this.handle = setInterval(this.pollPrice, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.handle);
  }

  pollPrice() {
    console.log('polling')
    const { symbol } = this.state;
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
      .then(resp => resp.json())
      .then(json => {
        this.setState((prevState) => ({
          price: json.USD,
          lastPrice: prevState.price !== json.USD ? prevState.price : prevState.lastPrice,
        }))
      })
  }

  priceChange(lastPrice, price) {
    const diff = price - lastPrice;
    const change = diff / lastPrice
    return (change * 100).toFixed(3);
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state;
    const gainloss = lastPrice > price ? 'loss' : 'gain';
    return (
      <div className={`card ${gainloss}`}>
        <div className='name'>
          {name}
          <span>({symbol})</span>
        </div>
        <div className={`percent ${gainloss}`}>
        {this.priceChange(lastPrice, price)}%
        </div>
        <div className='logo'>
        </div>
        <div className={`price ${gainloss}`}>
          {price}
        </div>
      </div>
    );
  }
}

export default CryptoCard;
