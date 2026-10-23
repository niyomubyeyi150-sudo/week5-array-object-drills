
import "./style.css";
import { orders } from "./data.js";
import {
  orderTotal,
  averageRating,
  bestSellingItem
} from "./helpers.js";
const ORIGINAL = JSON.stringify(orders);

// Currency formatting
const formatMoney = (value) =>
  value.toLocaleString("en-RW");

// Calculate dashboard statistics
const totalRevenue = orders.reduce(
  (sum, order) => sum + orderTotal(order),
  0
);

const deliveredOrders = orders.filter(
  (order) => order.status === "delivered"
);

const [bestItemName, bestItemQuantity] = bestSellingItem(orders);

// Display statistic cards
document.querySelector("#total-revenue").textContent =
  `${formatMoney(totalRevenue)} RWF`;

document.querySelector("#delivered-count").textContent =
  deliveredOrders.length;

document.querySelector("#average-rating").textContent =
  `${averageRating(orders)} / 5`;

document.querySelector("#best-selling").textContent =
  bestItemName;

document.querySelector("#best-selling-quantity").textContent =
  `${bestItemQuantity} units sold`;

// Calculate delivered revenue for each district
const districtRevenue = deliveredOrders.reduce(
  (revenue, order) => {
    const district = order.customer.district;

    revenue[district] =
      (revenue[district] || 0) + orderTotal(order);

    return revenue;
  },
  {}
);

// Render the horizontal bar chart
const chartContainer = document.querySelector("#district-chart");
const districtEntries = Object.entries(districtRevenue);
const maxRevenue = Math.max(
  ...districtEntries.map(([, value]) => value),
  1
);

chartContainer.innerHTML = districtEntries
  .map(([district, value]) => {
    const width = (value / maxRevenue) * 100;

    return `
      <div>
        <div class="mb-2 flex items-center justify-between gap-3 text-sm">
          <span class="font-medium">${district}</span>
          <span class="font-semibold">${formatMoney(value)} RWF</span>
        </div>

        <div class="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-emerald-600"
            style="width: ${width}%"
          ></div>
        </div>
      </div>
    `;
  })
  .join("");

// Full Tailwind class names for each status
const statusClasses = {
  delivered: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800"
};

// State: the currently selected filter
let currentFilter = "all";

// Render the orders table based on the current state
const renderTable = () => {
  const filteredOrders =
    currentFilter === "all"
      ? orders
      : orders.filter((order) => order.status === currentFilter);

  document.querySelector("#order-count").textContent =
    `Showing ${filteredOrders.length} of ${orders.length} orders`;

  // innerHTML is acceptable here because the workshop uses our own trusted dataset.
  const rows = filteredOrders
    .map((order) => {
      const badgeClass =
        statusClasses[order.status] || "bg-slate-100 text-slate-700";

      return `
        <tr class="transition hover:bg-slate-50">
          <td class="px-4 py-4 font-medium">${order.id}</td>
          <td class="px-4 py-4">${order.customer.name}</td>
          <td class="px-4 py-4">${order.customer.district}</td>
          <td class="px-4 py-4 font-medium">
            ${formatMoney(orderTotal(order))}
          </td>
          <td class="px-4 py-4">
            <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}">
              ${order.status}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");

  document.querySelector("#orders-table").innerHTML =
    rows ||
    `<tr><td colspan="5" class="px-4 py-8 text-center text-slate-500">
      No orders found.
    </td></tr>`;

  // Update the active filter button
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;

    button.className = isActive
      ? "rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white"
      : "rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200";
  });
};

// Handle filter button clicks
document.querySelector("#filter-buttons").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  currentFilter = button.dataset.filter;
  renderTable();
});

// Show all orders on the first render
renderTable();

// Verify the original data has not changed
console.log(
  "Original orders unchanged:",
  JSON.stringify(orders) === ORIGINAL
);
