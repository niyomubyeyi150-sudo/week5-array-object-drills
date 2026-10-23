import {orders} from "./data.js"
const ORIGINAL = JSON.stringify(orders);

 // Helper function required for Question 9
const orderTotal = (order) => {
  if (!order || !Array.isArray(order.items)) {
    console.log("Invalid order:", order);
    return 0;
  }

  return order.items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
};

// nation 1
// question 1
 const orderIds= orders.map(({id}) =>id);
 console.log("Array of all order ids." ,orderIds); //Array of all order ids. [101, 102, 103,104, 105, 106,107, 108] 
console.log(JSON.stringify(orders)=== ORIGINAL);// true


/* question 2
//output:
 The names of the customers are: [
  'Aline', 'Eric',
  'Grace', 'Aline',
  'Jean',  'Eric',
  'Diane', 'Grace'
]
true*/
const customerNames=orders.map(({customer}) => customer.name);
console.log("The names of the customers are:",customerNames);
console.log(JSON.stringify(orders)=== ORIGINAL);// true


// question 3
//All delivered orders.
/*All delivered orders. [ 101, 102, 104, 106, 107 ]
true */
const deliveredOrders = orders.filter( ({ status }) => status === "delivered");
console.log("All delivered orders.",deliveredOrders.map(({ id }) => id));
console.log(JSON.stringify(orders) === ORIGINAL); 

//question 4:All orders from Gasabo.
const gasaboOrders = orders.filter(({customer}) => customer.district === "Gasabo");
console.log("The customer live in Gasabo are:",gasaboOrders.map(({id}) => id));
console.log(JSON.stringify(orders) === ORIGINAL);


// question 5:The order with id 106.

const order106 = orders.find(({ id }) => id === 106);

console.log("The order with id 106:", order106);
console.log(JSON.stringify(orders) === ORIGINAL); 

// question 6:Does any order have a rating of 3 or lower? (some)

const hasLowRating = orders.some(({ rating }) => rating !== null && rating <= 3);
console.log("any order have a rating of 3", hasLowRating);
console.log(JSON.stringify(orders) === ORIGINAL); 

// question 7:Are all pending orders unrated? (filter + every)

const pendingOrders = orders.filter(({ status }) => status === "pending");
const allPendingUnrated = pendingOrders.every(({ rating }) => rating === null);
console.log("all pending orders:", allPendingUnrated);
console.log(JSON.stringify(orders) === ORIGINAL);

// question 8:Unique customer names (Set + spread).
const uniqueCustomerNames = [
  ...new Set(orders.map(({ customer }) => customer.name))
];

console.log("Question 8:", uniqueCustomerNames);
console.log(JSON.stringify(orders) === ORIGINAL);

// station 2 Calculations with reduce
// 9. Add a total to every order — a new array of new objects.
const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: orderTotal(order)
}));

console.log("total to every order:", ordersWithTotals);
console.log("Original data unchanged:", JSON.stringify(orders) === ORIGINAL);

// Question 10: Total revenue from delivered orders only
const deliveredRevenue = orders
  .filter((order) => order.status === "delivered")
  .reduce((sum, order) => sum + orderTotal(order), 0);

console.log("Total revenue:", deliveredRevenue, "RWF");
console.log(JSON.stringify(orders) === ORIGINAL);

// Question 11: Average rating, ignoring null
const ratedOrders = orders.filter((order) => order.rating !== null);

const averageRating =
  Math.round(
    (ratedOrders.reduce((sum, order) => sum + order.rating, 0) /
      ratedOrders.length) * 10
  ) / 10;

console.log("Average rating:", averageRating); 
console.log(JSON.stringify(orders) === ORIGINAL); 

// Question 12: Total quantity of Brochettes sold
const brochetteQuantity = orders
  .flatMap((order) => order.items)
  .filter((item) => item.name === "Brochette")
  .reduce((sum, item) => sum + item.qty, 0);

console.log("Total quantity of Brochettes sold:", brochetteQuantity);
console.log(JSON.stringify(orders) === ORIGINAL); 

// Question 13: Find the most expensive order
const mostExpensiveOrder = orders.reduce((highest, order) =>
  orderTotal(order) > orderTotal(highest) ? order : highest
);

console.log("most expensive order:", {
  id: mostExpensiveOrder.id,
  customer: mostExpensiveOrder.customer.name,
  total: orderTotal(mostExpensiveOrder)
}); 

console.log(JSON.stringify(orders) === ORIGINAL); 

// Question 14: Count orders per status
const statusCounts = orders.reduce((counts, order) => {
  counts[order.status] = (counts[order.status] || 0) + 1;
  return counts;
}, {});

console.log(" Count orders per status:", statusCounts);
console.log(JSON.stringify(orders) === ORIGINAL); 

// station 3:Grouping &amp; ranking


// Question 15: Revenue per district from delivered orders
const revenuePerDistrict = orders
  .filter((order) => order.status === "delivered")
  .reduce((revenue, order) => {
    const district = order.customer.district;
    revenue[district] =
      (revenue[district] || 0) + orderTotal(order);
    return revenue;
  }, {});

console.log("Revenue per district from delivered orders:", revenuePerDistrict);
console.log(JSON.stringify(orders) === ORIGINAL);


// Question 16: Group orders by date
const ordersByDate = Object.groupBy(
  orders,
  (order) => order.date
);

const dailySummary = Object.entries(ordersByDate).map(
  ([date, dateOrders]) => ({
    date,
    count: dateOrders.length,
    revenue: dateOrders.reduce(
      (sum, order) => sum + orderTotal(order),
      0
    )
  })
);

console.log("Group orders by date:", dailySummary);
console.log(JSON.stringify(orders) === ORIGINAL);


// Question 17: Top 3 best-selling items by quantity
const itemQuantities = orders
  .flatMap((order) => order.items)
  .reduce((totals, item) => {
    totals[item.name] =
      (totals[item.name] || 0) + item.qty;
    return totals;
  }, {});

const topThreeItems = Object.entries(itemQuantities)
  .map(([name, qty]) => ({ name, qty }))
  .toSorted((a, b) => b.qty - a.qty)
  .slice(0, 3);

console.log("Top 3 best-selling items:", topThreeItems);

console.log(JSON.stringify(orders) === ORIGINAL); 


// Question 18: Customer order count and total spent
const customerSummary = orders.reduce((customers, order) => {
  const name = order.customer.name;

  if (!customers[name]) {
    customers[name] = {
      name,
      orders: 0,
      spent: 0
    };
  }

  customers[name].orders += 1;
  customers[name].spent += orderTotal(order);

  return customers;
}, {});

const customerRanking = Object.values(customerSummary)
  .toSorted((a, b) => b.spent - a.spent);
console.log("Customer order count and total spent:", customerRanking);
console.log(JSON.stringify(orders) === ORIGINAL); 


// Question 19: Build a menu price list
const menuPrices = Object.fromEntries(
  orders
    .flatMap((order) => order.items)
    .map((item) => [item.name, item.price])
);
console.log("Build a menu price list:", menuPrices);
console.log(JSON.stringify(orders) === ORIGINAL);

// station 4 Immutable updates

// Question 20: Mark a pending order as delivered
const markDelivered = (orders, id) =>
  orders.map((order) =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );

const updatedOrders20 = markDelivered(orders, 105);
console.log(" pending order as delivered", updatedOrders20.find((order) => order.id === 105));
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL); 



// Question 21: Rate only delivered orders
const rateOrder = (orders, id, rating) => {
  const order = orders.find((order) => order.id === id);

  // If the order does not exist or is not delivered, return the same array
  if (!order || order.status !== "delivered") {
    return orders;
  }

  // Create a new array and update only the selected order
  return orders.map((order) =>
    order.id === id ? { ...order, rating } : order
  );
};

//Question 21 rateOrder(orders, id, rating) — only allowed on delivered orders; otherwise return the array

const updatedOrders21 = rateOrder(orders, 106, 4);
console.log(
  " Delivered order rating:",
  updatedOrders21.find((order) => order.id === 106).rating
);
const pendingResult = rateOrder(orders, 108, 5);
console.log(
  " Pending order unchanged:",
  pendingResult === orders
); 
console.log( "Original orders unchanged:",JSON.stringify(orders) === ORIGINAL);



// Question 22: Change a customer's district
const changeDistrict = (orders, id, district) =>
  orders.map((order) =>
    order.id === id
      ? {...order,customer: { ...order.customer, district}}
      : order
  );
const updatedOrders22 = changeDistrict(orders, 101, "Kicukiro");
console.log("Change a customer's district:", updatedOrders22.find((order) => order.id === 101));
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL); 



// Question 23: Add an item to an order
const addItem = (orders, id, item) =>
  orders.map((order) =>
    order.id === id
      ? {
          ...order,
          items: [...order.items, { ...item }]
        }
      : order
  );

const updatedOrders23 = addItem(orders, 101, {
  name: "Sambusa",
  price: 500,
  qty: 2
});
console.log("Add an item to an order", updatedOrders23.find((order) => order.id === 101));
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL); 


// Question 24: Remove cancelled orders
const removeCancelled = (orders) =>
  orders.filter((order) => order.status !== "cancelled");

const updatedOrders24 = removeCancelled(orders);
console.log("Remaining orders:", updatedOrders24.length); 
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL);


// Question 25: Apply a discount to every item
const applyDiscount = (orders, percent) =>
  orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100))
    }))
  }));

const discountedOrders = applyDiscount(orders, 10);
console.log(" discount to every item:", discountedOrders[0]);
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL); // true











