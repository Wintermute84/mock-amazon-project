export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart =  [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryOptionId: '1'
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryOptionId: '2'
}];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId){
  let matchingItem;
      const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      if(matchingItem){
        matchingItem.quantity += quantity;
      }else {
      cart.push({
        productId: productId,
        quantity:quantity,
        deliveryOptionId: '1'
      });}

      saveToStorage();
    
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    console.log(cartItem);
    cartQuantity += cartItem.quantity;
    });
  return cartQuantity;
}

export function updateCartQuantity(){
    const cartQuantity = calculateQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function updateQuantity(productId,quantity){
  let matchingItem;
  cart.forEach((item)=>{
    if(item.productId === productId){
      matchingItem = item;
      console.log(matchingItem);
      matchingItem.quantity = quantity;
    }
    saveToStorage();
  });
}
