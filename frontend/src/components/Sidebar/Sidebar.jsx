import { useEffect } from "react";
import { FiBarChart2 } from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarIdentity from "./SidebarIdentity";
import SidebarNavigation from "./SidebarNavigation";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-label="Close navigation"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        aria-label="Main navigation"
      >
        <SidebarHeader onClose={onClose} />
        <SidebarIdentity
          user={user}
          isAuthenticated={isAuthenticated}
          onClose={onClose}
        />
        <SidebarNavigation onClose={onClose} />

        <div className={styles.insight}>
          <FiBarChart2 />
          <div>
            <strong>Keep listings fresh</strong>
            <span>Clear photos and details help your ads stand out.</span>
          </div>
        </div>

        <SidebarFooter
          isAuthenticated={isAuthenticated}
          onClose={onClose}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}

export default Sidebar;
