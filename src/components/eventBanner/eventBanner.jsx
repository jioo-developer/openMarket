import styles from "./eventBanner.module.css";

export const EventBanner = () => {
  return (
    <article className={styles.banner}>
      <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
    </article>
  );
};