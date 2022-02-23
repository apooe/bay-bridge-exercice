import './App.css';
import React, {useEffect, useState} from "react";
import ShoppingCart from "./ShoppingCart";
import ShoppingCartSummary from "./ShoppingCartSummary";
import {getProducts} from "./Api";
import Loader from "./Loader";

function App() {
    const [cartContent, setCardContent] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getProducts()
            .then(p => {
                setProducts(p)
                const oldState = JSON.parse(localStorage.getItem('cart'));
                setCardContent(oldState || [])
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false))
    }, []);

    const handleProductQuantityChanged = (product, quantity) => {
        const newCardContent = cartContent.filter(content => content.product.id !== product.id);
        newCardContent.push({product, quantity});
        setCardContent(newCardContent);
        localStorage.setItem('cart', JSON.stringify(newCardContent));
    }

    const handleProductDeleted = (product) => {
        const newCardContent = cartContent.filter(content => content.product.id !== product.id);
        setCardContent(newCardContent)
        localStorage.setItem('cart', JSON.stringify(newCardContent));
    }

    return (
        <div className="container-fluid">
            {isLoading ? <Loader/> :
                <div className="row">
                    <div className="col-8"><ShoppingCart products={products}
                                                         cartContent={cartContent}
                                                         onCartChanged={handleProductQuantityChanged}
                                                         onCartProductDeleted={handleProductDeleted}/>
                    </div>
                    <div className="col-4"><ShoppingCartSummary cartContent={cartContent}/></div>
                </div>
            }
        </div>
    );
}

export default App;
