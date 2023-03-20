import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Main from "./components/main/main";
import Detail from "./components/product_detail/detail";
import Cart from "./components/cart/cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Detail convertPrice={convertPrice} cart={cart} setCart={setCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} convertPrice={convertPrice} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
