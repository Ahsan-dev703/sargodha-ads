import { Link } from "react-router-dom";

import styles from "./Home.module.css";

function AdCard({ ad }) {
  return (
    <Link to={`/ads/${ad._id}`} className={styles.adCard}>
      <div className={styles.imageWrapper}>
        {ad.images?.length > 0 ? (
          <img src={ad.images[0]} alt={ad.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
      </div>

      <div className={styles.adContent}>
        <p className={styles.price}>Rs. {Number(ad.price).toLocaleString()}</p>

        <h2 className={styles.adTitle}>{ad.title}</h2>

        <div className={styles.meta}>
          <span>{ad.category}</span>
          <span>{ad.location?.city}</span>
        </div>

        {ad.seller?.name && <p className={styles.seller}>{ad.seller.name}</p>}
      </div>
    </Link>
  );
}

export default AdCard;
