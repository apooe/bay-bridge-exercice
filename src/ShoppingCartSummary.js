import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Get Total price by shopping crt content
 */
const calculateFinalPrice = (cartContent) => {
  return cartContent.reduce((sum, cart) => {
    sum = cart.product.price * cart.quantity;
    return sum;
  }, 0);
};
/**
 * Get Total shipping price (Increase when each 4 products  different TYPE added)
 */
const calculateShipping = (cartContent) => {
  const minShipping = 20;
  return cartContent.length > 4
    ? (minShipping * cartContent.length) / 4
    : minShipping;
};

const ShoppingCartSummary = ({ cartContent }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    if (!cartContent) {
      return;
    }
    const finalPrice = calculateFinalPrice(cartContent);
    const shipping = calculateShipping(cartContent);
    setTotalPrice(finalPrice);
    setShipping(shipping);
  }, [cartContent]);

  return (
    <div>
      <div className="row">
        <h1 className="col-12 text-center my-5">Summary</h1>
        <div className="col-12">
          <table className="table">
            <tbody>
              {cartContent &&
                cartContent.map((cart) => (
                  <tr key={cart.product.id}>
                    <td>
                      {cart.product.title} x {cart.quantity}
                    </td>
                    <td>{(cart.product.price * cart.quantity).toFixed(2)} $</td>
                  </tr>
                ))}
              <tr>
                <td>Shipping price</td>
                <td>{shipping.toFixed(2)} $</td>
              </tr>
              <tr className={"font-weight-bold"}>
                <td>Total</td>
                <td>
                  <small>{totalPrice.toFixed(2)} $</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ShoppingCartSummary.propTypes = {
  cartContent: PropTypes.array.isRequired,
};

export default ShoppingCartSummary;
