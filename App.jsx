import React, { useReducer } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Coffee Mug', price: 699 },
  { id: 2, name: 'Notebook', price: 120 },
  { id: 3, name: 'Tote Bag', price: 4000 },
];

function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = cart.find((item) => item.id === action.product.id);

      if (existingItem) {
        return cart.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...cart, { ...action.product, quantity: 1 }];
    }
    case 'INCREASE_ITEM':
      return cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_ITEM':
      return cart
        .map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    case 'REMOVE_ITEM':
      return cart.filter((item) => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return cart;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="shop">
      <h1>ShopEasy</h1>
      <p className="intro">Choose something you like and add it to your cart.</p>

      <section aria-labelledby="products-heading">
        <h2 id="products-heading">Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price.toFixed(2)}</p>
              <button
                onClick={() => dispatch({ type: 'ADD_ITEM', product })}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="cart-section" aria-labelledby="cart-heading">
        <h2 id="cart-heading">
          Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <span className="cart-item-name">
                    {item.name} — ₹{item.price.toFixed(2)} each
                  </span>
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => dispatch({ type: 'DECREASE_ITEM', id: item.id })}
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => dispatch({ type: 'INCREASE_ITEM', id: item.id })}
                  >
                    +
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p><strong>Total: ₹{total.toFixed(2)}</strong></p>
            <button
              className="clear-button"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Clear cart
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
