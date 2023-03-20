import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import { CartHeader } from "./cartHeader";
import CartList from "./cartList";
import { TotalCart } from "./totalCart";

const Cart = ({ cart, setCart, convertPrice }) => {
  const [total, setTotal] = useState(0);
  const [checkLists, setCheckLists] = useState([]);
  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      quantity: quantity,
      price: found.price,
      provider: found.provider,
    };
    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if (quantity === 0) return;
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };

  const handleRemove = (id) => {
    setCart(cart.filter((cart) => cart.id !== id));
  };

  const handlerCheckList = (checked, id) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((item) => item !== id));
      //filter 안의 item parameter와 id가 같지 않은 것만 남긴다 = 같은 거 삭제
    }
  };

  return (
    <>
      <CartHeader />
      {cart.length !== 0 ? (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handlerCheckList={handlerCheckList}
              handleRemove={handleRemove}
            />
          );
        })
      ) : (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      )}
      {cart.length !== 0 ? (
        <TotalCart
          cart={cart}
          total={total}
          setTotal={setTotal}
          convertPrice={convertPrice}
          // found={found}
        />
      ) : null}
    </>
  );
};

export default Cart;
