export interface DefaultProps {}

export enum Values {
  value1 = "X",
  value2 = "O",
}

export enum Players {
  one = 1,
  two = 2,
}

type CellValue = Values.value1 | Values.value2;
type PlayersNum = Players.one | Players.two;

export interface CellsState {
  currentPlayer: PlayersNum;
  player1: number[];
  player2: number[];
  cells: {
    [key: number]: CellValue;
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
  value: CellValue;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MyButtonProps {
  text: string;
  onClick: () => void;
}
