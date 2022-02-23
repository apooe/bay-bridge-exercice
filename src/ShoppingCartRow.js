import React from 'react';
import QuantitySelectorsInput from "./QuantitySelectorsInput";
import PropTypes from 'prop-types';

const ShoppingCartRow = ({product, quantity, onQuantityChanged, onProductDeleted}) => {
    return product && (
        <tr className={'cartRow'}>
            <td><img src={product.image} alt={`${product.title} image`} className={'img-fluid img-thumbnail'}/></td>
            <td className={'text-muted'}>{product.title}</td>
            <td><QuantitySelectorsInput onChange={onQuantityChanged} on quantity={quantity} /></td>
            <td>{product.price} $</td>
            <td><button className={'btn btn-danger'} onClick={onProductDeleted}><span className="oi oi-trash"></span></button></td>
        </tr>
    );
};

ShoppingCartRow.propTypes = {
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    onQuantityChanged: PropTypes.func.isRequired,
    onProductDeleted: PropTypes.func.isRequired
}

export default ShoppingCartRow;
