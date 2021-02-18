import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import { store } from "./state";

function App() {
  // ${code}
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
