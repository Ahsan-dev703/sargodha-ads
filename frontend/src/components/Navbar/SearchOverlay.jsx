import { FiSearch, FiX } from "react-icons/fi";

import styles from "./Navbar.module.css";

function SearchOverlay({ open, inputRef, value, onChange, onSubmit, onClose }) {
  return (
    <div
      className={`${styles.searchOverlay} ${open ? styles.searchOverlayOpen : ""}`}
    >
      <form className={styles.mobileSearchForm} onSubmit={onSubmit}>
        <FiSearch aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search ads in Sargodha"
          aria-label="Search ads in Sargodha"
        />
        <button type="button" onClick={onClose} aria-label="Close search">
          <FiX />
        </button>
      </form>
    </div>
  );
}

export default SearchOverlay;
