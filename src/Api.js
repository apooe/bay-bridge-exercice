/**
 * Get All Products from the API
 */
export function getProducts() {
  return fetch("https://fakestoreapi.com/products").then((res) => res.json());
}
