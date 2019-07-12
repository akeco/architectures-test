import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import style from './style.module.scss';

const ProductCard = (props) => {
  const {
    values,
    className,
    showButton,
    env,
    client,
    commit,
    payment,
    onAuthorize,
    onCancel,
    onError
  } = props;

  return (
    <Card interactive={true} className={className} elevation={Elevation.ONE}>
      <img className={style.img} src={values.image} />
      <h5><a href="#">{values.productName}</a></h5>
      <p>{values.productAdjective}</p>
      <p>{values.price}</p>
      {
        showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError} />
      }
    </Card>
  );
};

export default ProductCard;
