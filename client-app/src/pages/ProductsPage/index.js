import React, { Component } from 'react';
import { getProducts } from '../../api/products';
import ProductsCard from '../../components/ProductCard';
import scriptLoader from 'react-async-script-loader';
import style from './style.module.scss';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      products: []
    }
  }

  async componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
    await this._getProducts();
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (!this.state.show) {
      if (isScriptLoaded && !this.props.isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setState({ showButton: true });
        } else {
          console.log('Cannot load Paypal script!');
          this.props.onError();
        }
      }
    }
  }

  _setProducts = (products) => this.setState({ products });

  _getProducts = async () => {
    try {
      const result = await getProducts();
      this._setProducts(result.data);
    }
    catch(e) {
      //
    }
  };

  _payment = () => {
    const {
      total,
      currency,
      env,
      client,
    } = this.props;

    if(paypal) {
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });
    }
  };

  _onAuthorize = (data, actions) => {
    const { onSuccess } = this.props;

    actions.payment.execute()
      .then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };

        onSuccess(payment);
      });
  };

  _renderProducts = () => {
    const {
      env,
      commit,
      client,
      onError,
      onCancel,
    } = this.props;
    const { products, showButton } = this.state;

    return products.map((item, index) => (
      <ProductsCard
        key={index}
        showButton={showButton}
        className={'bp3-dark'}
        values={item}
        env={env}
        client={client}
        commit={commit}
        payment={this._payment}
        onAuthorize={this._onAuthorize}
        onCancel={onCancel}
        onError={onError}
      />
    ));
  };

  render() {
    return (
      <div className={style.wrapper}>
        { this._renderProducts() }
      </div>
    )
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(ProductsPage);
