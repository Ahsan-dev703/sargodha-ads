import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAdById } from "@/services/ads.service";

import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";
import Button from "@/components/ui/Button/Button";

import SellerCard from "./SellerCard";
import styles from "./AdDetails.module.css";

function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchAd = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdById(id);

        if (cancelled) {
          return;
        }

        setAd(response.data.ad);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setError(error.message || "Unable to load this ad.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchAd();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className={styles.page}>
        <div className={styles.loadingState}>
          <Spinner />
          <p>Loading ad...</p>
        </div>
      </section>
    );
  }

  if (error || !ad) {
    return (
      <section className={styles.page}>
        <div className={styles.errorState}>
          <Alert>{error || "Ad not found."}</Alert>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <div className={styles.content}>
          <div className={styles.mainCard}>
            <div className={styles.imagePlaceholder}>
              {ad.images?.length > 0 ? (
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className={styles.image}
                />
              ) : (
                <span>No image available</span>
              )}
            </div>

            <div className={styles.details}>
              <div className={styles.category}>{ad.category}</div>

              <h1 className={styles.title}>{ad.title}</h1>

              <div className={styles.price}>
                Rs. {Number(ad.price).toLocaleString()}
              </div>

              <div className={styles.meta}>
                <span>{ad.condition}</span>

                <span>{ad.location?.city}</span>

                {ad.location?.area && <span>{ad.location.area}</span>}
              </div>

              <div className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>Description</h2>

                <p className={styles.description}>{ad.description}</p>
              </div>
            </div>
          </div>

          <SellerCard seller={ad.seller} />
        </div>
      </div>
    </section>
  );
}

export default AdDetails;
