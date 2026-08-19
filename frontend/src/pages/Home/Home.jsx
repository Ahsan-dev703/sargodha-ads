import { useCallback, useEffect, useState } from "react";

import { getAds } from "@/services/ads.service";

import Alert from "@/components/ui/Alert/Alert";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Spinner from "@/components/ui/Spinner/Spinner";

import AdCard from "./AdCard";
import styles from "./Home.module.css";

function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

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
    <>
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <section className={styles.page}>
        <div className={styles.content}>
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
                <AdCard key={ad._id} ad={ad} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
