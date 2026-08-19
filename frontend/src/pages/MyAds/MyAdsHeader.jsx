import styles from "./MyAds.module.css";

function MyAdsHeader() {
  return (
    <div className={styles.header}>
      <div>
        <span className={styles.eyebrow}>Seller dashboard</span>
        <h1 className={styles.title}>My Ads</h1>
        <p className={styles.subtitle}>
          Keep track of the items you have posted on Sargodha Ads.
        </p>
      </div>
    </div>
  );
}

export default MyAdsHeader;
