
 // Question 1: Calculate the total cost of all items in one order.
export const orderTotal = (order) => {
  return order.items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
};

// Question 2: Calculate the average rating from orders that have ratings.
export const averageRating = (orders) => {
  const ratedOrders = orders.filter((order) => order.rating !== null);

  if (ratedOrders.length === 0) {
    return 0;
  }

  const totalRating = ratedOrders.reduce((sum, order) => {
    return sum + order.rating;
  }, 0);

  return Math.round((totalRating / ratedOrders.length) * 10) / 10;
};

// Question 3: Find the best-selling item by total quantity sold.
export const bestSellingItem = (orders) => {
  const quantities = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      quantities[item.name] =
        (quantities[item.name] || 0) + item.qty;
    });
  });

  return Object.entries(quantities).sort((a, b) => b[1] - a[1])[0];
};
