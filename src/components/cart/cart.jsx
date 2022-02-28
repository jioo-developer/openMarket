import React, { useEffect, useState } from "react";
import { getCart } from "../../service/fetcher";
import { getCookie } from "../../service/cookie";
import TopNavigationBar from "../topNavigationBar/topNavigationBar";
import CartHeader from "./cartHeader";
import CartInfo from "./cartInfo";
import TotalCart from "./totalCart";

const Cart = () => {
  const token = getCookie("token");
  const [products, setProducts] = useState([]);

  const stateRefresh = () => {
    getCart(token).then((res) => setProducts(res.data.results));
  };

  useEffect(() => {
    getCart(token).then((res) => setProducts(res.data.results));
  }, [token]);

  return (
    <div>
      <TopNavigationBar />
      <CartHeader />
      {products && (
        <CartInfo
          products={products}
          setProducts={setProducts}
          token={token}
          stateRefresh={stateRefresh}
        />
      )}
      {products.length !== 0 && <TotalCart products={products} />}
    </div>
  );
};

export default Cart;