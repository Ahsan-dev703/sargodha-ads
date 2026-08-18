import { Link } from "react-router-dom";
import { FiPlus, FiTag, FiUser } from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className={styles.page}>
      {/* Welcome */}
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>

          <h1 className={styles.title}>
            Welcome back, {user?.name || "User"}!
          </h1>

          <p className={styles.subtitle}>
            Manage your ads and account from one place.
          </p>
        </div>

        <Link to="/create-ad" className={styles.primaryButton}>
          <FiPlus />
          <span>Create Ad</span>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick actions</h2>

        <div className={styles.actionsGrid}>
          <Link to="/create-ad" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiPlus />
            </div>

            <div>
              <h3>Create an ad</h3>

              <p>List an item for sale and reach local buyers.</p>
            </div>
          </Link>

          <Link to="/my-ads" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiTag />
            </div>

            <div>
              <h3>My ads</h3>

              <p>View and manage your existing advertisements.</p>
            </div>
          </Link>

          <Link to="/profile" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiUser />
            </div>

            <div>
              <h3>My profile</h3>

              <p>View and update your account information.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Account */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account</h2>

        <div className={styles.accountCard}>
          <div>
            <span className={styles.accountLabel}>Name</span>
            <p>{user?.name || "—"}</p>
          </div>

          <div>
            <span className={styles.accountLabel}>Email</span>
            <p>{user?.email || "—"}</p>
          </div>

          <div>
            <span className={styles.accountLabel}>Email status</span>

            <p className={styles.verified}>
              {user?.emailVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
