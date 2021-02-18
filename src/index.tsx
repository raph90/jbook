import React from "react";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

function App() {
  // ${code}
  return (
    <div>
      <TextEditor />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
