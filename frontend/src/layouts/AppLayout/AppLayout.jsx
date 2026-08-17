import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="/" className={styles.logo}>
            Sargodha Ads
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default AppLayout;
