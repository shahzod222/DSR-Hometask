export interface DefaultProps {}

export interface CellsState {
  currentPlayer: 1 | 2;
  player1: number[];
  player2: number[];
  cells: {
    [key: number]: "X" | "O";
  };
  message: string;
  showMessage: boolean;
}

export interface CellsProps {
  handleRestart: () => void;
}

export interface AppState {
  isStarted: boolean;
}

export interface CellProps {
  el: number;
  value: "X" | "O";
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MyButtonProps {
  value: string;
  onClick: () => void;
}
