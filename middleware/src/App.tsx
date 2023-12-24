import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./redux/actions";
import { RootState } from "./redux/reducers";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;
