import styles from "./cart.module.css";
import { useEffect, useState } from "react";

export const TotalCart = ({
  total,
  setTotal,
  cart,
  convertPrice,
  randomNum,
  buyitem,
}) => {
  const [initialPrice, setInitial] = useState(0);
  const delivery = 3000;
  useEffect(() => {
    if (buyitem.length !== 0) {
      const sum = buyitem.map((item) => item[0].price * item[0].quantity);
      const reducer = (acc, cur) => acc + cur;
      const itemTotal = sum.reduce(reducer);
      if (itemTotal <= 0) {
        setTotal(0);
      } else {
        setInitial(itemTotal);
        if (randomNum > 0) {
          const discount =
            itemTotal - Math.round(itemTotal * (randomNum / 100));
          if (discount > delivery * 10) {
            setTotal(discount);
          } else {
            setTotal(discount + delivery);
          }
        } else {
          if (itemTotal > delivery * 10) {
            setTotal(itemTotal);
          } else {
            setTotal(itemTotal + delivery);
          }
        }
      }
    } else {
      setTotal(0);
      setInitial(0);
    }
  }, [buyitem, cart, total, setTotal, randomNum]);
  return (
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}>총 상품금액</p>
        <p className={styles.cart_product_price}>
          {convertPrice(initialPrice)}
        </p>
      </div>
      <div className={styles.pay_minus}>
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className={styles.sale}>
        <p className={styles.cart_product_sale}>상품 할인</p>
        <p className={styles.cart_product_sale_price}>
          {randomNum}
          {randomNum <= 0 ? "" : "%"}
        </p>
      </div>
      <div className={styles.pay_plus}>
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className={styles.delivery}>
        <p className={styles.cart_product_delivery}>배송비</p>
        <p className={styles.cart_product_delivery_price}>
          {total > delivery * 10 ? 0 : delivery}
        </p>
      </div>

      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
        <p className={styles.cart_prouct_payment_price}>
          {convertPrice(total)}
        </p>
      </div>
    </div>
  );
};
