import { NavLink } from "react-router-dom";
import { FiHome, FiMessageCircle, FiPlus, FiTag, FiUser } from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Navbar.module.css";

function BottomNav() {
  const { isAuthenticated } = useAuth();
  const unreadMessages = 2;

  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      <NavLink to="/" className={styles.mobileNavItem} aria-label="Home">
        <FiHome />
        <span>Home</span>
      </NavLink>
      <button type="button" className={styles.mobileNavItem} aria-label="Chat">
        <FiMessageCircle />
        <span>Chat</span>
        {unreadMessages > 0 && (
          <span className={styles.badge}>{unreadMessages}</span>
        )}
      </button>
      <NavLink
        to="/create-ad"
        className={`${styles.mobileNavItem} ${styles.floatingAction}`}
        aria-label="Create ad"
      >
        <FiPlus />
        <span>Create</span>
      </NavLink>
      <NavLink
        to="/my-ads"
        className={styles.mobileNavItem}
        aria-label="My ads"
      >
        <FiTag />
        <span>My Ads</span>
      </NavLink>
      <NavLink
        to={isAuthenticated ? "/profile" : "/login"}
        className={styles.mobileNavItem}
        aria-label={isAuthenticated ? "Profile" : "Sign in"}
      >
        <FiUser />
        <span>{isAuthenticated ? "Profile" : "Sign in"}</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
