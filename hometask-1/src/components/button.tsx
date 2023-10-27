import React from "react";
import { MyButtonProps } from "../types";
import { Button } from "@chakra-ui/react";

export class MyButton extends React.Component<MyButtonProps> {
  constructor(props: MyButtonProps) {
    super(props);
  }

  render() {
    return (
      <Button
        variant="solid"
        size="lg"
        colorScheme="teal"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Button>
    );
  }
}
