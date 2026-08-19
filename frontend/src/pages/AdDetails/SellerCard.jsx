import styles from "./AdDetails.module.css";

function SellerCard({ seller }) {
  return (
    <aside className={styles.sellerCard}>
      <h2 className={styles.sectionTitle}>Seller</h2>

      <div className={styles.seller}>
        <div className={styles.avatar}>
          {seller?.avatar ? (
            <img
              src={seller.avatar}
              alt={seller.name}
              className={styles.avatarImage}
            />
          ) : (
            seller?.name?.charAt(0).toUpperCase()
          )}
        </div>

        <div>
          <p className={styles.sellerName}>{seller?.name || "Seller"}</p>

          {seller?.location?.city && (
            <p className={styles.sellerLocation}>{seller.location.city}</p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SellerCard;
