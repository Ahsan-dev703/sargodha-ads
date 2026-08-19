import { NavLink } from "react-router-dom";
import { FiChevronRight, FiGrid, FiPlus, FiTag } from "react-icons/fi";

import styles from "./Sidebar.module.css";

const navigationItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/my-ads", label: "My ads", icon: FiTag },
  { to: "/create-ad", label: "Create an ad", icon: FiPlus },
];

function SidebarNavigation({ onClose }) {
  const getNavLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.navigation}>
      <span className={styles.sectionLabel}>Menu</span>
      {navigationItems.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={getNavLinkClass} onClick={onClose}>
          <Icon />
          <span>{label}</span>
          <FiChevronRight className={styles.chevron} />
        </NavLink>
      ))}
    </nav>
  );
}

export default SidebarNavigation;
