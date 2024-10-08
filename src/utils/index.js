/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array
 * @returns {Number} Total Price
 */
export const totalPrice = (products) => {
  let totalSum = 0;
  products.forEach((product) => (totalSum += product.price));
  return totalSum;
};