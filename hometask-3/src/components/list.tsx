import { ListElement } from "../types";

interface ListProps {
  isLoading: boolean;
  list: ListElement[];
  removeElement: (name: string) => void;
}

function List({ isLoading, list, removeElement }: ListProps) {
  return (
    <div className="container d-flex flex-column justify-content-center">
      {!isLoading ? (
        list.map((el, i) => (
          <div key={i} className="card my-2">
            <div className="card-body d-flex align-items-center justify-content-between">
              <h3>{el.name.toUpperCase()}</h3>
              <div className={`badge bg-${el.trend} text-wrap fs-5`}>
                ${el.cost}
              </div>
              <button
                onClick={() => removeElement(el.name)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default List;
