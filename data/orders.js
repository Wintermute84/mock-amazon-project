import { cart } from "./cart.js";
import { getProduct, loadProductsFetch } from "./products.js";
import {formatCurrency} from "../scripts/utils/money.js"
import { calculateDate, calculateDeliveryDate } from "../scripts/utils/date.js";
import { products } from "./products.js";

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

let cartLength = JSON.parse(localStorage.getItem('cart')) || [];


document.querySelector('.js-cart-quantity').innerHTML = cartLength.length; 

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function loadFromStorage() {
  orders = JSON.parse(localStorage.getItem('orders')) || [];
  return orders;
}

export function renderOrderDetails(orderItems){
  let orderItemsHtml = '';
  orderItems.forEach((item) => {
    let productDetails = getProduct(item.productId);
    orderItemsHtml += `
        <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${productDetails.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productDetails.name}
              </div>
              <div class="product-delivery-date">
                ${item.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                ${item.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>

    `;
  });
  return orderItemsHtml;
}

export function renderOrderHtml(){
  orders = loadFromStorage();
  console.log(orders);
  let products = [];
  let orderDetailsHtml = '';
  orders.forEach((order)=>{
    products = order.products;
    orderDetailsHtml += `
    <div class="order-container">      
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      ${renderOrderDetails(products)}
    </div>
      `;
  });
  document.querySelector('.js-orders').innerHTML = orderDetailsHtml;
}


async function loadOrder() {
    try {
      //throw 'error1';
      await  loadProductsFetch();
    } catch(error){
    console.log('unexpected error.. Please try again later');
    }
    renderOrderHtml();
   }


   loadOrder();