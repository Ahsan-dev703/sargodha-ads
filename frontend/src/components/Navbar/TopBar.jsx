import { NavLink } from "react-router-dom";
import {
  FiBell,
  FiLogIn,
  FiMenu,
  FiMessageCircle,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Navbar.module.css";

function TopBar({ onMenuClick, onSearchClick }) {
  const { user, isAuthenticated } = useAuth();
  const unreadMessages = 2;
  const cartItems = 0;
  const unreadNotifications = 3;

  return (
    <div className={styles.topRow}>
      <div className={styles.brandGroup}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open navigation"
          title="Open navigation"
        >
          <FiMenu />
        </button>

        <NavLink
          to={isAuthenticated ? "/dashboard" : "/"}
          className={styles.logo}
        >
          <span className={styles.logoMark}>S</span>
          <span>Sargodha Ads</span>
        </NavLink>
      </div>

      <button
        type="button"
        className={styles.mobileSearchButton}
        onClick={onSearchClick}
        aria-label="Open search"
        title="Search"
      >
        <FiSearch />
      </button>

      <div className={styles.desktopActions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Chat${unreadMessages ? `, ${unreadMessages} unread` : ""}`}
          title="Chat"
        >
          <FiMessageCircle />
          {unreadMessages > 0 && (
            <span className={styles.badge}>{unreadMessages}</span>
          )}
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Shopping bag${cartItems ? `, ${cartItems} items` : ""}`}
          title="Shopping bag"
        >
          <FiShoppingBag />
          {cartItems > 0 && <span className={styles.badge}>{cartItems}</span>}
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ""}`}
          title="Notifications"
        >
          <FiBell />
          {unreadNotifications > 0 && (
            <span className={styles.badge}>{unreadNotifications}</span>
          )}
        </button>
        <NavLink to="/create-ad" className={styles.createAd}>
          <FiPlus />
          <span>Sell an item</span>
        </NavLink>
      </div>

      <div className={styles.userSection}>
        {isAuthenticated ? (
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
        ) : (
          <NavLink to="/login" className={styles.signInButton}>
            <FiLogIn />
            <span>Sign in</span>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default TopBar;
