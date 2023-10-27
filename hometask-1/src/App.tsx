import React from "react";
import { DefaultProps, AppState } from "./types";
import { Cells } from "./components/cells";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { MyButton } from "./components/button";

export class App extends React.Component<DefaultProps, AppState> {
  constructor(props: DefaultProps) {
    super(props);
    this.state = {
      isStarted: false,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleStart() {
    this.setState({ isStarted: true });
  }

  handleRestart() {
    this.setState({ isStarted: false });
  }

  render() {
    return (
      <ChakraProvider>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {this.state.isStarted ? (
            <Cells handleRestart={this.handleRestart} />
          ) : (
            <MyButton text="Start" onClick={this.handleStart} />
          )}
        </Box>
      </ChakraProvider>
    );
  }
}
