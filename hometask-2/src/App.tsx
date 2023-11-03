import React from "react";
import { ListElement } from "./types";
import { Search } from "./components/search";
import { List } from "./components/list";

interface AppProps {}

interface AppState {
  search: string;
  list: ListElement[];
  isLoading: boolean;
}

const apiKey =
  "c78b4630db5ebfbcda84fa9e18836b91e05ff430e0fbf0c878aed5283bae5988";

const apiUrl = "https://min-api.cryptocompare.com/data/price";

export class App extends React.Component<AppProps, AppState> {
  interval: number | undefined;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      search: "",
      list: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.searchData("DOGE");

    this.interval = setInterval(() => {
      this.updateData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addElement = (name: string, cost: number) => {
    this.setState({
      list: [...this.state.list, { name, cost, trend: "secondary" }],
    });
  };

  removeElement = (name: string) => {
    this.setState((prevState) => {
      const updatedList = prevState.list.filter((item) => item.name !== name);
      return { list: updatedList };
    });
  };

  handleSearchChange = (e: { target: { value: string } }) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = () => {
    const isElementExist = this.state.list.some(
      (item) => item.name === this.state.search
    );
    if (!isElementExist) {
      this.searchData();
    }
  };

  searchData = (name?: string) => {
    const search = name ? name : this.state.search;
    const url = `${apiUrl}fsym=${search}&tsyms=USD&api_key=${apiKey}&gt`;

    this.setState({ isLoading: true });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.USD) {
          this.addElement(search, data.USD);
        }

        this.setState({ isLoading: false });
      });
  };

  updateData = () => {
    const names = this.state.list.map((item) => item.name);
    names.forEach((el) => {
      const url = `${apiUrl}fsym=${el}&tsyms=USD&api_key=${apiKey}&gt`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.updateList(el, data.USD);
        });
    });
  };

  updateList = (search: string, cost: number) => {
    this.setState((prevState) => ({
      list: prevState.list.map((el) =>
        el.name === search
          ? {
              ...el,
              cost,
              trend:
                el.cost > cost
                  ? "success"
                  : el.cost < cost
                  ? "danger"
                  : "secondary",
            }
          : el
      ),
    }));
  };

  render() {
    return (
      <div>
        <Search
          handleSearch={this.handleSearch}
          handleSearchChange={this.handleSearchChange}
          search={this.state.search}
        />

        <List
          isLoading={this.state.isLoading}
          list={this.state.list}
          removeElement={this.removeElement}
        />
      </div>
    );
  }
}
