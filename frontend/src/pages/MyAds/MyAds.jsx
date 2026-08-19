import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAds, deleteAd, updateAd } from "@/services/ads.service";
import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";
import MyAdCard from "./MyAdCard";
import MyAdsEmptyState from "./MyAdsEmptyState";
import MyAdsHeader from "./MyAdsHeader";
import styles from "./MyAds.module.css";

function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
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

  const handleMarkAsSold = async (id) => {
    try {
      setError("");
      setUpdatingId(id);

      const response = await updateAd({ id, status: "sold" });
      const updatedAd = response.data.ad;

      setAds((currentAds) =>
        currentAds.map((ad) => (ad._id === id ? updatedAd : ad)),
      );
    } catch (error) {
      setError(error.message || "Unable to update this ad. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className={styles.page}>
      <MyAdsHeader />

      {error && (
        <div className={styles.alert}>
          <Alert>{error}</Alert>
        </div>
      )}

      {!error && ads.length === 0 && <MyAdsEmptyState />}

      {!error && ads.length > 0 && (
        <div className={styles.adsList}>
          {ads.map((ad) => (
            <MyAdCard
              key={ad._id}
              ad={ad}
              isDeleting={deletingId === ad._id}
              isUpdating={updatingId === ad._id}
              onEdit={() => navigate(`/edit-ad/${ad._id}`)}
              onView={() => navigate(`/ads/${ad._id}`)}
              onDelete={() => handleDelete(ad._id)}
              onMarkAsSold={() => handleMarkAsSold(ad._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyAds;