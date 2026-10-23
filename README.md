# Week 5 — Array & Object Manipulation Drills

## Workshop Overview

This workshop focuses on using JavaScript array and object methods to manipulate realistic data. Using the **Kigali Eats** food delivery dataset, the exercises develop skills in transforming, filtering, calculating, grouping, ranking, and updating data without modifying the original dataset.

The workshop also includes a Mini Dashboard that presents the transformed data in a responsive user interface.

## Learning Objectives

By completing this workshop, I practiced how to:

- Choose the appropriate array method for a given problem.
- Chain array methods into readable data-processing pipelines.
- Use `map()`, `filter()`, `find()`, `some()`, and `every()`.
- Calculate totals, averages, counts, and rankings with `reduce()`.
- Group and summarize data using `Object.groupBy()`, `Object.entries()`, and `Object.fromEntries()`.
- Update nested objects immutably using the spread operator.
- Render dynamic HTML using template literals.
- Build a responsive dashboard with Tailwind CSS.

## Dataset: Kigali Eats

The workshop uses a sample food delivery dataset containing eight orders. Each order includes:

- Order ID
- Customer name and district
- Ordered items, prices, and quantities
- Order status
- Customer rating
- Order date

The dataset supports exercises involving order totals, revenue, customer spending, product sales, district performance, and order status.

## Repository Structure

```text
week5-array-object-drills/
├── data.js
├── drills.js
├── README.md
├── screenshots/
│   └── dashboard.png
└── mini-dashboard/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── src/
        ├── main.js
        ├── data.js
        ├── helpers.js
        └── style.css
```

## Workshop Stations

### Station 1 — Warm-up: Map, Filter and Find

**Maximum score: 8 points**

This station covers selecting order IDs, extracting customer names, filtering by status and district, finding a specific order, checking ratings, and identifying unique customers.

### Station 2 — Calculations with Reduce

**Maximum score: 12 points**

This station focuses on calculating order totals, delivered revenue, average ratings, product quantities, the most expensive order, and the number of orders per status.

### Station 3 — Grouping and Ranking

**Maximum score: 15 points**

This station covers revenue per district, grouping orders by date, ranking best-selling items, summarizing customer spending, and creating a menu price list.

### Station 4 — Immutable Updates

**Maximum score: 18 points**

This station implements functions that return updated arrays without modifying the original data. Tasks include marking orders as delivered, rating orders, changing customer districts, adding items, removing cancelled orders, and applying discounts.

The original dataset is checked using:

```javascript
console.log(JSON.stringify(orders) === ORIGINAL);
```

The expected result is `true`.

### Station 5 — Mini Dashboard

**Maximum score: 10 points**

The dashboard presents the Kigali Eats data in a responsive interface with:

- **Statistics cards:** Total revenue, delivered orders, average rating, and best-selling item.
- **Revenue by district:** A horizontal bar chart showing revenue from delivered orders.
- **Orders table:** Order ID, customer, district, formatted total, and status badge.
- **Status filters:** All, Delivered, Pending, and Cancelled.
- **Dynamic rendering:** Table rows generated using `map()`, template literals, and `join("")`.

## Technologies Used

- JavaScript (ES Modules)
- HTML5
- Tailwind CSS v4
- Vite
- Node.js

## Coding Rules

The drill solutions follow the workshop requirements:

- Use array methods instead of `for`, `while`, or `forEach` loops in the drills.
- Do not mutate the original `orders` dataset.
- Use the spread operator for immutable updates.
- Use destructuring in callback parameters where it improves readability.
- Number the solutions in `drills.js` using comments.
- Check that the original dataset remains unchanged after each relevant section.

## Dashboard Screenshot

![Kigali Eats Mini Dashboard](![kigali eta dash](/screenshoot/dashboard.png))
## How to Run the Project

### Run the drills

From the repository root, make sure Node.js is installed and that `package.json` contains `"type": "module"`. Then run:

```bash
node drills.js
```

### Run the Mini Dashboard

Open a terminal in the dashboard directory:

```bash
cd mini-dashboard
npm install
npm run dev

## Scoring

| Workshop Station | Maximum Points |
|---|---:|
| Station 1 — Warm-up | 8 |
| Station 2 — Reduce | 12 |
| Station 3 — Grouping and Ranking | 15 |
| Station 4 — Immutable Updates | 18 |
| Station 5 — Mini Dashboard | 10 |
| **Total** | **63** |
| Readability bonus | +2 |



