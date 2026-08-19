import { NavLink } from "react-router-dom";
import { FiChevronRight, FiLogIn, FiUser } from "react-icons/fi";

import styles from "./Sidebar.module.css";

function SidebarIdentity({ user, isAuthenticated, onClose }) {
  if (!isAuthenticated) {
    return (
      <NavLink to="/login" className={styles.signInCard} onClick={onClose}>
        <FiLogIn />
        <span>
          <strong>Sign in to your account</strong>
          <small>Manage your listings and profile</small>
        </span>
        <FiChevronRight className={styles.chevron} />
      </NavLink>
    );
  }

  return (
    <div className={styles.identity}>
      <div className={styles.avatar}>
        {user?.avatar ? <img src={user.avatar} alt="" /> : <FiUser />}
      </div>
      <div className={styles.identityText}>
        <strong>{user?.name || "User"}</strong>
        <span>{user?.email || "Manage your account"}</span>
      </div>
    </div>
  );
}

export default SidebarIdentity;
