import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 4,
    name: "Backpack",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <img src={product.image} alt={product.name} />

      <div className="product-info">

        <h2>{product.name}</h2>

        <p className="price">₹{product.price}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

      </div>

    </div>
  );
}

function App() {

  const [page, setPage] = useState("home");

  const [cartItems, setCartItems] = useState([]);

  // Login states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  // Add to cart
  const addToCart = (product) => {
    setCartItems((previousItems) => [
      ...previousItems,
      product
    ]);
  };

  // Login function
  const login = (e) => {

    e.preventDefault();

    if (Number(age) >= 18) {

      setIsLoggedIn(true);

      setMessage(`You are logged in, ${name}!`);

      setPage("home");

    } else {

      setIsLoggedIn(false);

      setMessage("You must be 18 or older to login.");

    }
  };

  return (
    <div>

      {/* NAVBAR */}

      <nav className="navbar">

        <h1>MyStore</h1>

        <div className="nav-links">

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("products")}>
            Products
          </button>

          <button onClick={() => setPage("counter")}>
            Cart ({cartItems.length})
          </button>

          <button onClick={() => setPage("about")}>
            About
          </button>

          {!isLoggedIn && (
            <button onClick={() => setPage("login")}>
              Login
            </button>
          )}

          {isLoggedIn && (
            <span className="user-name">
              {name}
            </span>
          )}

        </div>

      </nav>


      {/* LOGIN MESSAGE */}

      {message && (
        <div className="message">
          {message}
        </div>
      )}


      {/* HOME */}

      {page === "home" && (

        <section className="home">

          <h1>Welcome to MyStore</h1>

          {isLoggedIn ? (
            <h2>Welcome, Brhamjyot! 👋</h2>
          ) : (
            <p>Welcome! Please login to continue.</p>
          )}

          <button
            className="shop-button"
            onClick={() => setPage("products")}
          >
            Shop Now
          </button>

        </section>

      )}


      {/* PRODUCTS */}

      {page === "products" && (

        <section className="products">

          <h1>Our Products</h1>

          <div className="product-container">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />

            ))}

          </div>

        </section>

      )}


      {/* CART COUNTER */}

      {page === "counter" && (

        <section className="counter-page">

          <h1>Items in Cart</h1>

          <div className="counter-number">
            {cartItems.length}
          </div>

          <p>
            Total products added to cart
          </p>

        </section>

      )}


      {/* LOGIN */}

      {page === "login" && (

        <section className="login-page">

          <div className="login-card">

            <h1>Login</h1>

            <form onSubmit={login}>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <button type="submit">
                Login
              </button>

            </form>

            {message && (
              <p className="login-message">
                {message}
              </p>
            )}

          </div>

        </section>

      )}


      {/* ABOUT */}

      {page === "about" && (

        <section className="about">

          <h1>About Me</h1>

          <div className="about-card">

            <h2>My Details</h2>

            <p>
              <strong>Name:</strong> Brhamjyot Kaur
            </p>

            <p>
              <strong>Class:</strong> 2nd Year
            </p>

            <p>
              <strong>University:</strong> Chitkara University
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default App;