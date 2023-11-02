import React from "react";
import { AppState, DefaultProps } from "./types";
import { Search } from "./components/search";
import { List } from "./components/list";

export class App extends React.Component<DefaultProps, AppState> {
  interval: number | undefined;

  constructor(props: DefaultProps) {
    super(props);

    this.state = {
      search: "",
      list: [],
      isLoading: false,
    };
  }

  fetchData = (
    search: string = this.state.search,
    purpose: string = "search"
  ) => {
    const apiKey =
      "c78b4630db5ebfbcda84fa9e18836b91e05ff430e0fbf0c878aed5283bae5988";
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${search}&tsyms=USD&api_key=${apiKey}&gt`;

    if (purpose === "search") this.setState({ isLoading: true });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (purpose === "search") {
          this.addElement(search, data.USD);
          this.setState({ isLoading: false, search: "" });
        } else if (purpose === "update") {
          this.updateList(search, data.USD);
        }
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
      this.fetchData();
    }
  };

  addElement = (name: string, cost: number) => {
    this.setState({
      list: [...this.state.list, { name, cost }],
    });
  };

  removeElement = (name: string) => {
    this.setState((prevState) => {
      const updatedList = prevState.list.filter((item) => item.name !== name);
      return { list: updatedList };
    });
  };

  updateList = (search: string, cost: number) => {
    this.setState((prevState) => {
      const updatedList = prevState.list.map((el) => {
        if (el.name === search) {
          const trend = el.cost > cost ? "↗️" : el.cost < cost ? "↙️" : "➡️";
          return { name: el.name, cost, trend };
        }
        return el;
      });
      return { list: updatedList };
    });
  };

  updateElements = () => {
    const names = this.state.list.map((item) => item.name);
    names.forEach((el) => this.fetchData(el, "update"));
  };

  componentDidMount() {
    this.fetchData("DOGE");

    this.interval = setInterval(() => {
      this.updateElements();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
