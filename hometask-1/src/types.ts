export interface DefaultProps {}

export enum Values {
  X = "X",
  O = "O",
}

export enum Players {
  One = 1,
  Two = 2,
}

export interface CellsState {
  currentPlayer: Players;
  player1: number[];
  player2: number[];
  cells: {
    [key: number]: Values;
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
  value: Values;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MyButtonProps {
  text: string;
  onClick: () => void;
}
