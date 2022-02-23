import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { getProducts } from "./Api";
import Loader from "./Loader";

// Key stored
const CART_STORAGE_LABEL = "cart";

function App() {
  const [cartContent, setCardContent] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((p) => {
        setProducts(p);
        // Retrieve old state saved
        const oldState = JSON.parse(localStorage.getItem(CART_STORAGE_LABEL));
        setCardContent(oldState || []);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Handle when a product cart will be updated/add
   */
  const handleProductQuantityChanged = (product, quantity) => {
    const newCardContent = cartContent.filter(
      (content) => content.product.id !== product.id
    );
    newCardContent.push({ product, quantity });
    // Save current state
    setCardContent(newCardContent);
    localStorage.setItem(CART_STORAGE_LABEL, JSON.stringify(newCardContent));
  };

  /**
   * Handle when a product card is deleted
   */
  const handleProductDeleted = (product) => {
    const newCardContent = cartContent.filter(
      (content) => content.product.id !== product.id
    );
    // Save current state
    setCardContent(newCardContent);
    localStorage.setItem(CART_STORAGE_LABEL, JSON.stringify(newCardContent));
  };

  if (isError) {
    return (
      <div className={"container p-5"}>
        <div className="alert alert-danger" role="alert">
          Error while loading products !
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-8">
            <ShoppingCart
              products={products}
              cartContent={cartContent}
              onCartChanged={handleProductQuantityChanged}
              onCartProductDeleted={handleProductDeleted}
            />
          </div>
          <div className="col-4">
            <ShoppingCartSummary cartContent={cartContent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
