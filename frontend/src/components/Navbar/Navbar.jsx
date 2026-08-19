import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiSearch } from "react-icons/fi";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import SearchOverlay from "./SearchOverlay";
import styles from "./Navbar.module.css";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSearchOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <TopBar
            onMenuClick={onMenuClick}
            onSearchClick={() => setIsSearchOpen(true)}
          />
          <div className={styles.searchRow}>
            <form className={styles.searchBar} onSubmit={handleSearch}>
              <label className={styles.searchField}>
                <FiSearch aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search in Sargodha"
                  aria-label="Search ads in Sargodha"
                />
              </label>
              <button type="button" className={styles.categoryButton}>
                All categories
                <FiChevronDown aria-hidden="true" />
              </button>
              <button
                type="submit"
                className={styles.searchButton}
                aria-label="Search"
              >
                <FiSearch />
              </button>
            </form>
          </div>
        </div>
      </header>
      <SearchOverlay
        open={isSearchOpen}
        inputRef={searchInputRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onSubmit={handleSearch}
        onClose={() => setIsSearchOpen(false)}
      />
      <BottomNav />
    </>
  );
}

export default Navbar;
