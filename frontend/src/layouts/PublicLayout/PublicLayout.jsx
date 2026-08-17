import { Outlet } from "react-router-dom";
import styles from "./PublicLayout.module.css";

function PublicLayout() {
  return (
    <div className={styles.layout}>
      {/* <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="/" className={styles.logo}>
            Sargodha Ads
          </a>
        </div>
      </header> */}
      <main className={styles.main}>
        <Outlet />
      </main>
      {/* <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            © 2026 Sargodha Ads. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export default PublicLayout;
