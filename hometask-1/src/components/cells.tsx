import React from "react";
import { CellsProps, CellsState } from "../types";
import { Cell } from "./cell";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { MyButton } from "./button";

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export class Cells extends React.Component<CellsProps, CellsState> {
  constructor(props: CellsProps) {
    super(props);

    this.state = { ...this.initialState };

    this.handleClick = this.handleClick.bind(this);
    this.handleHelpClick = this.handleHelpClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.updateCellValue = this.updateCellValue.bind(this);
  }

  initialState: CellsState = {
    currentPlayer: 1,
    player1: [],
    player2: [],
    cells: {},
    message: "",
    showMessage: false,
  };

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const cell = Number((e.target as HTMLButtonElement).id);

    this.updateStateAfterClick(cell);
  }

  updateCellValue(id: number) {
    const value = this.state.currentPlayer === 1 ? "X" : "O";

    this.setState((prevState) => ({
      cells: {
        ...prevState.cells,
        [id]: value,
      },
    }));
  }

  updateStateAfterClick(cell: number) {
    if (!this.state.showMessage) {
      const currentPlayer = this.state.currentPlayer;
      const nextPlayer = currentPlayer === 1 ? 2 : 1;

      if (
        !this.state.player1.includes(cell) &&
        !this.state.player2.includes(cell)
      ) {
        this.updateCellValue(cell);
        this.setState({ currentPlayer: nextPlayer });

        if (nextPlayer === 2) {
          this.setState((prevState) => ({
            player1: [...prevState.player1, cell],
          }));
        } else {
          this.setState((prevState) => ({
            player2: [...prevState.player2, cell],
          }));
        }
      }
    }
  }

  handleHelpClick() {
    const cell = this.help();
    this.updateStateAfterClick(cell);
  }

  help() {
    const defaultCells = [...nums];
    const tookenCells = [...this.state.player1, ...this.state.player2];
    const freeCells = defaultCells.filter(
      (item) => !tookenCells.includes(item)
    );

    return freeCells[Math.floor(Math.random() * freeCells.length)];
  }

  checkWinner() {
    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningMoves.length; i++) {
      if (winningMoves[i].every((item) => this.state.player1.includes(item))) {
        this.setState({ showMessage: true, message: "Player 1 Won 🎉!" });
      }
      if (winningMoves[i].every((item) => this.state.player2.includes(item))) {
        this.setState({ showMessage: true, message: "Player 2 Won 🎉!" });
      }
    }
    if (
      this.state.player1.length + this.state.player2.length == 9 &&
      !this.state.showMessage
    ) {
      this.setState({ showMessage: true, message: "Draw" });
    }
  }

  restartGame() {
    this.setState({ ...this.initialState });
    this.props.handleRestart();
  }

  componentDidUpdate() {
    if (!this.state.showMessage) this.checkWinner();
  }

  render() {
    const currentSign = this.state.currentPlayer === 1 ? "X" : "O";

    return (
      <Box>
        {this.state.showMessage ? (
          <Heading size="lg">{this.state.message}</Heading>
        ) : (
          <Heading size="md">
            Move: Player {`${this.state.currentPlayer}( ${currentSign} )`}
          </Heading>
        )}
        <SimpleGrid columns={3} spacing="15px" marginY="15px">
          {nums.map((el) => (
            <Cell
              el={el}
              handleClick={this.handleClick}
              key={el}
              value={this.state.cells[el] || null}
            />
          ))}
        </SimpleGrid>
        <Box display="flex" justifyContent="space-between">
          <MyButton value="Help" onClick={this.handleHelpClick} />
          {this.state.player1.length + this.state.player2.length !== 0 && (
            <MyButton value="Restart" onClick={this.restartGame} />
          )}
        </Box>
      </Box>
    );
  }
}
