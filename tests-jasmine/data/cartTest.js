import { addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () =>{
  it('adds an existing product to the cart', () => {
    

  });

  it('adds a new product to the cart', ()=>{

    spyOn(localStorage,'setItem').and.callFake(()=>{
      return JSON.stringify([]);
    });


    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a');
    expect(cart.length).toEqual(1);
    console.log(cart);
    expect(cart[0].productId).toEqual('58b4fc92-e98c-42aa-8c55-b6b79996769a');
  });
});