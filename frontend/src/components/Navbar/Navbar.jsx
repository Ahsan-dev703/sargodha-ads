import { NavLink } from "react-router-dom";
import { FiGrid, FiPlus, FiTag, FiUser, FiLogOut } from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();

  const getNavLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.active : ""}`;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/dashboard" className={styles.logo}>
          Sargodha Ads
        </NavLink>

        {/* Main Navigation */}
        <nav className={styles.navigation}>
          <NavLink to="/dashboard" className={getNavLinkClass}>
            <FiGrid />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/my-ads" className={getNavLinkClass}>
            <FiTag />
            <span>My Ads</span>
          </NavLink>

          <NavLink
            to="/create-ad"
            className={`${styles.createAd} ${styles.navLink}`}
          >
            <FiPlus />
            <span>Create Ad</span>
          </NavLink>
        </nav>

        {/* User Section */}
        <div className={styles.userSection}>
          <NavLink to="/profile" className={styles.profileLink}>
            <div className={styles.avatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || "Profile"} />
              ) : (
                <FiUser />
              )}
            </div>

            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || "User"}</span>

              <span className={styles.userEmail}>{user?.email || ""}</span>
            </div>
          </NavLink>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
