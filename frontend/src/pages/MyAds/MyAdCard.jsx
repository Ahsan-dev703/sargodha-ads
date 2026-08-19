import {
  FiCheckCircle,
  FiEdit3,
  FiEye,
  FiMapPin,
  FiMoreHorizontal,
  FiTrash2,
} from "react-icons/fi";

import styles from "./MyAds.module.css";

function MyAdCard({
  ad,
  isDeleting,
  isUpdating,
  onEdit,
  onView,
  onDelete,
  onMarkAsSold,
}) {
  const dateLabel = ad.createdAt
    ? new Date(ad.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently posted";

  return (
    <article className={styles.adCard}>
      <div className={styles.imageWrapper}>
        {ad.images?.length > 0 ? (
          <img src={ad.images[0]} alt={ad.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
        <span className={styles.statusBadge}>{ad.status || "Active"}</span>
      </div>

      <div className={styles.adContent}>
        <div className={styles.adTopline}>
          <span className={styles.category}>{ad.category}</span>
          <span className={styles.condition}>{ad.condition}</span>
        </div>

        <h2 className={styles.adTitle}>{ad.title}</h2>
        <p className={styles.price}>Rs. {Number(ad.price).toLocaleString()}</p>

        <div className={styles.adMeta}>
          <span>
            <FiMapPin />
            {ad.location?.city || "Sargodha"}
          </span>
          <span>{dateLabel}</span>
        </div>
      </div>

      <div className={styles.adActions}>
        <button
          type="button"
          className={styles.overflowButton}
          aria-label="More ad actions"
          title="More actions"
        >
          <FiMoreHorizontal />
        </button>
        <button type="button" className={styles.viewButton} onClick={onView}>
          <FiEye />
          View details
        </button>
        <button type="button" className={styles.editButton} onClick={onEdit}>
          <FiEdit3 />
          Edit ad
        </button>
        <button
          type="button"
          className={styles.soldButton}
          onClick={onMarkAsSold}
          disabled={isUpdating || ad.status === "sold"}
        >
          <FiCheckCircle />
          {isUpdating
            ? "Updating..."
            : ad.status === "sold"
              ? "Sold"
              : "Mark as sold"}
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
          disabled={isDeleting}
        >
          <FiTrash2 />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default MyAdCard;
