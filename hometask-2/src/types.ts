export interface DefaultProps {}

type List = {
  name: string;
  cost: number;
  trend?: string;
};

export interface AppState {
  search: string;
  list: List[];
  isLoading: boolean;
}

export interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (e: { target: { value: string } }) => void;
  search: string;
}

export interface ListProps {
  isLoading: boolean;
  list: List[];
  removeElement: (name: string) => void;
}
