import React from "react";

interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (e: { target: { value: string } }) => void;
  search: string;
}

export class Search extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: SearchProps) {
    return nextProps.search !== this.props.search;
  }

  render() {
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
                onChange={this.props.handleSearchChange}
                value={this.props.search}
              />
              <button
                className="btn btn-outline-dark mx-3"
                onClick={this.props.handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
