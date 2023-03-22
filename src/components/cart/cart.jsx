import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import { CartHeader } from "./cartHeader";
import CartList from "./cartList";
import { TotalCart } from "./totalCart";
import CartCoupon from "./cartCoupon";

const Cart = ({ cart, setCart, convertPrice }) => {
  const [total, setTotal] = useState(0);
  const [checkLists, setCheckLists] = useState([]);
  const [randomNum, setRandom] = useState(0);
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

  const AllChecked = (checked) => {
    if (checked) {
      const clearItem = [];
      cart.forEach((element) => {
        clearItem.push(element.id);
        setCheckLists([...clearItem]);
      });
    } else {
      setCheckLists([]);
    }
  };

  const coupon = () => {
    if (randomNum === 0) {
      const num = Math.floor(Math.random() * (10 - 5) + 5);
      setRandom(num);
      localStorage.setItem("couponNum", num);
      alert(`${num}% 할인 쿠폰이 발급되었습니다`);
    } else {
      return randomNum;
    }
  };

  useEffect(() => {
    const isCoupon = localStorage.getItem("couponNum");
    if (isCoupon !== null) {
      setRandom(isCoupon);
    }
  }, []);

  const buyitem = checkLists.map((item) => {
    return cart.filter((el) => el.id === item);
  });

  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;
  //전체를 체크 해야되니 :  장바구니에 저장된 데이터의 값과 체크된 갯수가 같으면서 체크리스트의 갯수가 0개가 아닐때

  return (
    <>
      <CartHeader AllChecked={AllChecked} isAllChecked={isAllChecked} />
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
              checkLists={checkLists}
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
        <>
          <CartCoupon coupon={coupon} />
          <TotalCart
            cart={cart}
            total={total}
            setTotal={setTotal}
            convertPrice={convertPrice}
            randomNum={randomNum}
            buyitem={buyitem}
          />
          <div className={styles.cart_couponWrap}>
            <p className={styles.total_discount}>
              상품 할인에 배송비는 포함 되지 않습니다.
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Cart;
