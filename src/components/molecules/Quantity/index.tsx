import React, { useState, FC } from "react";

type Props = {
  qtyFunc: (args: any) => void;
};

const Quantity: FC<Props> = ({ qtyFunc }) => {
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

  qtyFunc(quantity);

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
