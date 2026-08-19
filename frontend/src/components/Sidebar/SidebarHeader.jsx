import { FiX } from "react-icons/fi";

import styles from "./Sidebar.module.css";

function SidebarHeader({ onClose }) {
  return (
    <div className={styles.sidebarHeader}>
      <div>
        <span className={styles.kicker}>Your workspace</span>
        <h2 className={styles.heading}>Navigate</h2>
      </div>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close navigation"
      >
        <FiX />
      </button>
    </div>
  );
}

export default SidebarHeader;
