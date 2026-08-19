import { NavLink } from "react-router-dom";
import { FiLogIn, FiLogOut, FiSettings } from "react-icons/fi";

import styles from "./Sidebar.module.css";

function SidebarFooter({ isAuthenticated, onClose, onLogout }) {
  return (
    <div className={styles.footer}>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/profile"
            className={styles.utilityLink}
            onClick={onClose}
          >
            <FiSettings />
            <span>Profile settings</span>
          </NavLink>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={onLogout}
          >
            <FiLogOut />
            <span>Log out</span>
          </button>
        </>
      ) : (
        <NavLink to="/login" className={styles.utilityLink} onClick={onClose}>
          <FiLogIn />
          <span>Sign in</span>
        </NavLink>
      )}
    </div>
  );
}

export default SidebarFooter;
