/* eslint-disable react/display-name */
import React, { useState } from "react";

const Quantity = () => {
  const [quantity, setQuantity] = useState(0);

  const onCLickCountdown = () => {
    if (quantity <= 0) {
      setQuantity(0);
      return;
    }
    setQuantity(quantity - 1);
  };
  const onClickCountUp = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="quantity">
      <button type="button" onClick={onCLickCountdown}>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={onClickCountUp}>
        +
      </button>
    </div>
  );
};

export default Quantity;
