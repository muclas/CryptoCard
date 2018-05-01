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
  }

  componentDidMount() {
    this.pollPrice();
    
    //setInterval(this.pollPrice, 10000);
  }

  pollPrice() {
    console.log('polling')
    const { symbol } = this.state;
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
      .then(resp => resp.json())
      .then(json => {
        this.setState((prevState) => ({
          price: json.USD,
          lastPrice: prevState.price,
        }))
      })
  }

  render() {
    const { name, symbol, price } = this.state;
    return (
      <div className='card'>
        <div className='name'>
          {name}
          <span>({symbol})</span>
        </div>
        <div className='percent'>
        </div>
        <div className='logo'>
        </div>
        <div className='price'>
          {price}
        </div>
      </div>
    );
  }
}

export default CryptoCard;
