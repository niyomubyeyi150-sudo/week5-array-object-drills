import {orders} from "./data.js"
const ORIGINAL = JSON.stringify(orders);
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

//




