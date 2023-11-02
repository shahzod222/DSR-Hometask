import React from "react";
import { ListProps } from "../types";

export class List extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  render() {
    return (
      <div className="container d-flex flex-column justify-content-center">
        {!this.props.isLoading ? (
          this.props.list.map((el, i) => {
            return (
              <div key={i} className="card my-2">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h3>{el.name.toUpperCase()}</h3>
                  <h4>
                    {el.cost} {el.trend}
                  </h4>
                  <button
                    onClick={() => this.props.removeElement(el.name)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    );
  }
}
