import React from "react";

interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

function Search({ handleSearch, handleSearchChange, search }: SearchProps) {
  return (
    <header>
      <nav className="my-4 navbar">
        <div className="container-fluid">
          <div className="d-flex w-100 justify-content-center" role="search">
            <input
              className="form-control w-75"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={handleSearchChange}
              value={search}
            />
            <button
              className="btn btn-outline-dark mx-3"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Search;
