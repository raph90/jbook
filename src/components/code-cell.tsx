import React, { useState, useEffect, useRef } from "react";
import bundler from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

function CodeCell() {
  //input
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  // output

  //handler
  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  // ${code}
  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
