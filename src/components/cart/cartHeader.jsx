import styles from "./cart.module.css";

export const CartHeader = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <div className={styles.cart_title_wrap}>
        <div className={styles.tab_title}>
          <input
            type="checkbox"
            onChange={(e) => props.AllChecked(e.target.checked)}
          />
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>

          <p>전체선택</p>
        </div>
      </div>
    </>
  );
};
