import React, { useState, useEffect, useCallback, useRef } from "react";
import Search from "./components/search";
import List from "./components/list";
import { ListElement } from "./types";

const apiKey =
  "c78b4630db5ebfbcda84fa9e18836b91e05ff430e0fbf0c878aed5283bae5988";

const apiUrl = "https://min-api.cryptocompare.com/data/price?";

function App() {
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<ListElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const latestListRef = useRef<ListElement[]>([]);
  latestListRef.current = list;

  const addElement = useCallback((name: string, cost: number) => {
    setList((prevList) => [...prevList, { name, cost, trend: "secondary" }]);
  }, []);

  const removeElement = useCallback((name: string) => {
    setList((prevList) => prevList.filter((item) => item.name !== name));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const updateList = (search: string, cost: number) => {
    setList((prevList) =>
      prevList.map((el) =>
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
      )
    );
  };

  const searchData = (name?: string) => {
    const searchQuery = name ? name : search;
    const url = `${apiUrl}fsym=${searchQuery}&tsyms=USD&api_key=${apiKey}`;

    setIsLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.USD) {
          addElement(searchQuery, data.USD);
        }

        setIsLoading(false);
      });
  };

  const updateData = () => {
    latestListRef.current.forEach((el) => {
      const url = `${apiUrl}fsym=${el.name}&tsyms=USD&api_key=${apiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          updateList(el.name, data.USD);
        });
    });
  };

  const handleSearch = () => {
    const isElementExist = latestListRef.current.some(
      (item) => item.name === search
    );
    if (!isElementExist) {
      searchData();
    }
  };

  useEffect(() => {
    searchData("DOGE");

    const intervalId = setInterval(() => {
      updateData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        search={search}
      />

      <List isLoading={isLoading} list={list} removeElement={removeElement} />
    </div>
  );
}

export default App;
