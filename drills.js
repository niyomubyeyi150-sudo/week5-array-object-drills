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

console.log("Question 14:", statusCounts);
console.log(JSON.stringify(orders) === ORIGINAL); 



