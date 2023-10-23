import React from "react";
import { CellProps } from "../types";
import { Button } from "@chakra-ui/react";

export class Cell extends React.Component<CellProps> {
  constructor(props: CellProps) {
    super(props);
  }

  render() {
    return (
      <Button
        height="100px"
        width="100px"
        id={`${this.props.el}`}
        onClick={this.props.handleClick}
        colorScheme="teal"
        variant="outline"
      >
        {this.props.value}
      </Button>
    );
  }
}
