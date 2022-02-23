import React, {useEffect, useState} from 'react';
import ShoppingCartRow from "./ShoppingCartRow";

const ShoppingCart = ({products, cartContent, onCartChanged, onCartProductDeleted}) => {


    return (
        <div className={'card'}>
            <div className="card-body">
                <h1 className={'text-center'}>Shopping Cart</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th></th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products && products.map(p => <ShoppingCartRow
                        key={p.id}
                        product={p}
                        quantity={cartContent?.find(c => c.product.id === p.id)?.quantity || 0}
                        onQuantityChanged={(qty) => onCartChanged(p, qty)}
                        onProductDeleted = {() => onCartProductDeleted(p)}
                    />)}


                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default ShoppingCart;
