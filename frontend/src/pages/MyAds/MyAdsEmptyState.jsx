import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./MyAds.module.css";

function MyAdsEmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon} aria-hidden="true">
        <FiPlus />
      </div>
      <h2 className={styles.emptyTitle}>You haven't posted any ads yet</h2>
      <p className={styles.emptyDescription}>
        Create your first ad and start selling on Sargodha Ads.
      </p>
      <Link to="/create-ad" className={styles.emptyAction}>
        Post your first ad
      </Link>
    </div>
  );
}

export default MyAdsEmptyState;
