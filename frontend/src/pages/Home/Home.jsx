import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAds } from "@/services/ads.service";

import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./Home.module.css";

function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchAds = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAds();

        if (cancelled) {
          return;
        }

        setAds(response.data.ads || []);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setError(error.message || "Unable to load ads.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAds();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Latest Ads</h1>

          <p className={styles.subtitle}>
            Find what you need from sellers in Sargodha.
          </p>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingState}>
          <Spinner />
          <p>Loading ads...</p>
        </div>
      )}

      {!loading && error && (
        <div className={styles.alert}>
          <Alert>{error}</Alert>
        </div>
      )}

      {!loading && !error && ads.length === 0 && (
        <div className={styles.emptyState}>
          <h2>No ads available</h2>

          <p>There are no active ads right now. Check back later.</p>
        </div>
      )}

      {!loading && !error && ads.length > 0 && (
        <div className={styles.adsGrid}>
          {ads.map((ad) => (
            <Link key={ad._id} to={`/ads/${ad._id}`} className={styles.adCard}>
              <div className={styles.imageWrapper}>
                {ad.images?.length > 0 ? (
                  <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.noImage}>No image</div>
                )}
              </div>

              <div className={styles.adContent}>
                <p className={styles.price}>
                  Rs. {Number(ad.price).toLocaleString()}
                </p>

                <h2 className={styles.adTitle}>{ad.title}</h2>

                <div className={styles.meta}>
                  <span>{ad.category}</span>

                  <span>{ad.location?.city}</span>
                </div>

                {ad.seller?.name && (
                  <p className={styles.seller}>{ad.seller.name}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
