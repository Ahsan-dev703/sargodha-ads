import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAds, deleteAd } from "@/services/ads.service";
import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";
import styles from "./MyAds.module.css";

function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchMyAds = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyAds();

        if (cancelled) {
          return;
        }

        setAds(response.data.ads || []);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setError(error.message || "Unable to load your ads.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMyAds();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className={styles.page}>
        <div className={styles.loadingState}>
          <Spinner />
          <p>Loading your ads...</p>
        </div>
      </section>
    );
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ad?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(id);

      await deleteAd(id);

      setAds((currentAds) => currentAds.filter((ad) => ad._id !== id));
    } catch (error) {
      setError(error.message || "Unable to delete this ad. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Ads</h1>

          <p className={styles.subtitle}>
            Manage the ads you have posted on Sargodha Ads.
          </p>
        </div>
      </div>

      {error && (
        <div className={styles.alert}>
          <Alert>{error}</Alert>
        </div>
      )}

      {!error && ads.length === 0 && (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>You haven't posted any ads yet</h2>

          <p className={styles.emptyDescription}>
            Create your first ad and start selling on Sargodha Ads.
          </p>
        </div>
      )}

      {!error && ads.length > 0 && (
        <div className={styles.adsList}>
          {ads.map((ad) => (
            <article className={styles.adCard} key={ad._id}>
              <div className={styles.adContent}>
                <h2 className={styles.adTitle}>{ad.title}</h2>

                <p className={styles.adDescription}>{ad.description}</p>

                <div className={styles.adMeta}>
                  <span>Rs. {ad.price.toLocaleString()}</span>

                  <span>{ad.category}</span>

                  <span>{ad.condition}</span>

                  <span>{ad.location?.city}</span>
                </div>
              </div>

              <div className={styles.adActions}>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={() => navigate(`/edit-ad/${ad._id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(ad._id)}
                  disabled={deletingId === ad._id}
                >
                  {deletingId === ad._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyAds;
