import React from "react";
import styles from "./cart.module.css";
const cartCoupon = () => {
  return (
    <div className={styles.cart_couponWrap}>
      <div
        className={styles.couponBtn}
        onClick={() => {
          alert("10% 할인쿠폰이 발급되었습니다");
        }}
      >
        쿠폰받기
      </div>
      <p>3만원 이상 구매 시 배송비 무료입니다</p>
    </div>
  );
};

export default cartCoupon;
