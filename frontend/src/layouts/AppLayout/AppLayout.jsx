import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar/Navbar";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
